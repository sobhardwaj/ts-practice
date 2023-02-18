type Fetch = number;

type Refinement<T> = [
  success: (value: T, options?: { fetch?: Fetch }) => Promise<boolean> | boolean,
   message: ((value: T) => string) | ((value: T) => string[]),
];


let v1: Refinement<string> = [
  (value) => true,
  (value) => 'hello'
];
let v2: Refinement<string> = [
  (value) => Promise.resolve(true),
  (value) => 'hello'
];
let v3: Refinement<string> = [
  (value, options) => true,
  (value) => 'hello'
];
let v4: Refinement<string> = [
  (value, options) => Promise.resolve(true),
  (value) => 'hello'
];

