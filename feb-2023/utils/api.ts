type Input = unknown;
type Output = unknown;

type ApiResponse<T> =
  | {
  type: "success";
  data: T;
}
  | {
  type: "error";
  error: Error;
}

abstract class Repository {
  [key: string]: { (input: Input): ApiResponse<Output> };
}

abstract class SpecificRepository extends Repository {
  getSpecificData(input: Input): ApiResponse<Output> {
    throw new Error("not implemented");
  }
}
const output : ApiResponse<[]> = {
  type: "success",
  data: []
}

abstract class SuccessRepository extends Repository {
  getSpecificData(input: Input): ApiResponse<Output> {
    return output
  }
}


declare const array: (string | null )[];
const filtered = array.filter((x): x is string => x !== null);