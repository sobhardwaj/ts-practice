type ClassDefinition<T> = {
  initialValue: T;
};

interface ValueTypeA {
  value: string;
}

const defintionOne: ClassDefinition<ValueTypeA> = {
  initialValue: { value: "abc" },
};

interface ValueTypeB {
  value: number;
}

const definitionTwo: ClassDefinition<ValueTypeB> = {
  initialValue: { value: 123 },
};

function classFromDefinition<T>(definition: ClassDefinition<T>) {
  return class GeneratedClass {
    value: T = definition.initialValue;
  };
}

const definitions = [defintionOne, definitionTwo];

const GeneratedClasses = definitions.map((definition) =>
  classFromDefinition<typeof definition.initialValue>(definition)
  );

const instanceOne = new GeneratedClasses[0]();
console.log(instanceOne.value);

const instanceTwo = new GeneratedClasses[1]();
console.log(instanceTwo.value);


//export class InfluencerFilters implements Indexable {
//  [key: string]: any;
//  hashtags: any = {};
//}