/* eslint-disable max-len */
import { Deployment } from '@org/cdk-packages';
import { NestedStack, NestedStackProps } from 'aws-cdk-lib';
import {
  BuildEnvironmentVariableType,
  BuildSpec,
  ComputeType,
  LinuxBuildImage,
  PipelineProject,
} from 'aws-cdk-lib/aws-codebuild';
import { Artifact, IAction, Pipeline } from 'aws-cdk-lib/aws-codepipeline';
import { CodeBuildAction, CodeStarConnectionsSourceAction } from 'aws-cdk-lib/aws-codepipeline-actions';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

// eslint-disable-next-line max-len
function createDeployProject({
  scope,
  name,
  app,
  stackName,
}: {
  scope: Construct;
  name: string;
  app: string;
  stackName: string;
}): PipelineProject {
  const project = new PipelineProject(scope, `Project-${name}-${app}-Deploy`, {
    environment: {
      buildImage: LinuxBuildImage.STANDARD_6_0,
      computeType: ComputeType.LARGE,
    },
    environmentVariables: {
      GITHUB_ACCESS_TOKEN: {
        value: 'github/read_registry:GITHUB_ACCESS_TOKEN',
        type: BuildEnvironmentVariableType.SECRETS_MANAGER,
      },
    },
    buildSpec: BuildSpec.fromObject({
      version: '0.2',
      phases: {
        install: {
          commands: ['npm install -g aws-cdk@2'],
        },
        build: {
          commands: [`cdk -a . deploy ${stackName} --require-approval=never --verbose`],
        },
      },
    }),
  });

  project.addToRolePolicy(
    new PolicyStatement({
      actions: ['cloudformation:DescribeStacks'],
      resources: ['*'],
    }),
  );
  project.addToRolePolicy(
    new PolicyStatement({
      actions: ['s3:ListBucket'],
      resources: ['*'],
    }),
  );
  project.addToRolePolicy(
    new PolicyStatement({
      actions: ['sts:AssumeRole'],
      resources: ['arn:*:iam::*:role/*'],
      // resources: [`arn:*:iam::${Stack.of(scope).account}:role/*`],
      conditions: {
        'ForAnyValue:StringEquals': {
          'iam:ResourceTag/aws-cdk:bootstrap-role': ['image-publishing', 'file-publishing', 'deploy'],
        },
      },
    }),
  );
  return project;
}

// eslint-disable-next-line max-len
function createSynthProject({ scope, name, app }: { scope: Construct; name: string; app: string }): PipelineProject {
  return new PipelineProject(scope, `Project-${name}-${app}-Synth`, {
    environment: {
      buildImage: LinuxBuildImage.STANDARD_6_0,
      computeType: ComputeType.LARGE,
    },
    environmentVariables: {
      GITHUB_ACCESS_TOKEN: {
        value: 'github/read_registry:GITHUB_ACCESS_TOKEN',
        type: BuildEnvironmentVariableType.SECRETS_MANAGER,
      },
    },
    buildSpec: BuildSpec.fromObject({
      version: '0.2',
      phases: {
        build: {
          commands: ['mv -f .npmrc_ci .npmrc 2>/dev/null; true', 'npm ci', 'npm run build', 'npx cdk synth'],
        },
      },
      artifacts: {
        'base-directory': 'cdk.out',
        files: '**/*',
      },
    }),
  });
}

function createCodeBuildAction({
  project,
  input,
  outputs,
  name,
}: {
  project: PipelineProject;
  input: Artifact;
  outputs?: Artifact[];
  name: string;
}): CodeBuildAction {
  return new CodeBuildAction({
    project,
    actionName: name,
    input,
    environmentVariables: {},
    outputs,
  });
}

interface NewProps extends NestedStackProps {
  readonly deployments: Deployment;
}

export default class DeploymentsStack extends NestedStack {
  constructor(scope: Construct, id: string, props: NewProps) {
    super(scope, id, props);

    const { deployments } = props;

    // Create pipeline
    const pipeline = new Pipeline(this, `Pipeline-${deployments.name}`, {
      pipelineName: `${deployments.name}-Pipelines`,
      crossAccountKeys: false,
    });

    const sourceOutput = new Artifact(`Source-${deployments.name}`);
    const deploymentActions: IAction[] = [];
    interface IPipelineOutputs {
      app: string;
      output: Artifact;
    }
    const pipelineOutputs: IPipelineOutputs[] = [];

    // Source
    deployments.applications.forEach((app) => {
      const appOutput = new Artifact(`Source-${app.name}`);
      pipelineOutputs.push({
        app: app.name,
        output: appOutput,
      });

      deploymentActions.push(
        new CodeStarConnectionsSourceAction({
          actionName: `${deployments.name}-${app.name}-Source`,
          owner: 'myOrg',
          repo: app.repositoryName,
          branch: 'main',
          connectionArn:
            'arn:aws:codestar-connections:eu-north-1:1234567890:connection/xyz',
          output: appOutput,
          triggerOnPush: false,
        }),
      );
    });

    deploymentActions.push(
      new CodeStarConnectionsSourceAction({
        actionName: 'CdkApplicationsSource',
        owner: 'myOrg',
        repo: 'cdk-applications',
        branch: 'main',
        connectionArn:
          'arn:aws:codestar-connections:eu-north-1:1234567890:connection/xyz',
        output: sourceOutput,
        triggerOnPush: true,
      }),
    );

    pipeline.addStage({
      stageName: 'Deploy-Pipelines',
      actions: deploymentActions,
    });

    // Build - synth
    const project = createSynthProject({ scope: this, name: 'CdkApplications', app: 'Pipeline' });
    const synthOutputs = new Artifact(`Synth-${deployments.name}`);
    pipeline.addStage({
      stageName: 'Build',
      actions: [
        createCodeBuildAction({
          project,
          input: sourceOutput,
          outputs: [synthOutputs],
          name: 'CdkApplications',
        }),
      ],
    });

    // Update pipeline
    const projectUpdatePipeline = createDeployProject({
      scope: this,
      name: 'CdkApplications',
      app: 'Pipeline',
      stackName: 'PipelinesSetup',
    });

    pipeline.addStage({
      stageName: 'UpdatePipeline',
      actions: [
        new CodeBuildAction({
          project: projectUpdatePipeline,
          actionName: 'SelfMutate',
          input: synthOutputs,
          environmentVariables: {},
        }),
      ],
    });

    interface IPipelineFlow {
      appName: string;
      synthOutput: Artifact;
    }
    const appOutputs: IPipelineFlow[] = [];

    // Synth
    const actionsSynth: (IAction | undefined)[] = deployments.applications.map((app): CodeBuildAction | undefined => {
      const appProject = createSynthProject({
        scope: this,
        name: deployments.name,
        app: app.name,
      });
      const output = new Artifact(`Synth-${app.name}`);

      appOutputs.push({
        appName: app.name,
        synthOutput: output,
      });

      const input = pipelineOutputs.find((o) => o.app === app.name);
      if (!input) {
        return undefined;
      }

      return createCodeBuildAction({
        project: appProject,
        input: input.output,
        outputs: [output],
        name: `${app.name}`,
      });
    });

    const actionsSynthFiltered: IAction[] = actionsSynth.filter((action): action is IAction => action !== undefined);

    pipeline.addStage({
      stageName: `Synth-${deployments.name}`,
      actions: actionsSynthFiltered,
    });

    // Deploy
    const actionsDeploy: (IAction | undefined)[] = deployments.applications.map((app): CodeBuildAction | undefined => {
      const appProject = createDeployProject({
        scope: this,
        name: deployments.name,
        app: app.name,
        stackName: app.stackName,
      });

      const input = appOutputs.find((item) => item.appName === app.name);
      if (!input) {
        return undefined;
      }

      return createCodeBuildAction({
        project: appProject,
        input: input.synthOutput,
        name: `${app.name}`,
      });
    });

    const actions: IAction[] = actionsDeploy.filter((action): action is IAction => action !== undefined);

    pipeline.addStage({
      stageName: `Deploy-${deployments.name}`,
      actions,
    });
  }
}