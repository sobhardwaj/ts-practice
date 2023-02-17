type Entity = Record<string, any>
type ExtraEntity = Record<string, any> | undefined

type Fields<T extends Entity> = {
  [K in keyof T]-?: string
}

type ExtraFields<T extends Entity, P extends ExtraEntity | undefined> = {

}

type FieldsDef<T extends Entity, P extends ExtraEntity = undefined> = P extends undefined ? Fields<T> : {
  fields: Fields<T>;
  extraFields?: ExtraFields<T, P>
};

//type MyType = {
//  id: number
//  name: string
//  [k: string]: string
//}

const entity1: FieldsDef<{}> = {}

const entity2: FieldsDef<{foo?: string}> = {
  foo: "aaa"
}

const entity3: FieldsDef<{foo?: string}, {extra?: string}> = {
  fields: {
    foo: "aaa"
  },
  extraFields: {
    extra: "bbb"
  }
}


//''''================================//
type Entity = Record<string, any>;

type Fields<T extends Entity> = {
  [K in keyof T]-?: {
    label: string;
    formatter: (value: T[K], entity: T) => string;
  };
};

type ExtraFields<T extends Entity, P extends Record<string, any>> = {
  [K in keyof P]-?: {
    label: string;
    formatter: (entity: T) => string;
  }
};

type FieldsDef<T extends Entity, P extends Record<string, any> = {}> = P[keyof P] extends never
  ? Fields<T>
  : {
  fields: Fields<T>;
  extraFields?: ExtraFields<T, P>;
};

const entity1: FieldsDef<{}> = {};

const entity2: FieldsDef<{ foo?: string }> = {
  foo: { label: "Foo", formatter: () => "foo formatted value" },
};

const entity3: FieldsDef<{ foo?: string }, { extra?: string }> = {
  fields: {
    foo: { label: "Foo", formatter: () => "foo formatted value" },
  },
  extraFields: {
    extra: { label: "Extra", formatter: () => "extra formatted value" },
  },
};


//add more types of field values  - objects, arrays of scalars, arrays of objects, arrays of arrays