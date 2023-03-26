// type AllRoute = Routes[keyof Routes]

function identity<Type>(arg: Type): Type {
  return arg;
}
let output = identity<string>("myString");
let output2 = identity("myString")

let myIdentity: <Type>(arg: Type) => Type = identity;
let myIdentity2: <Input>(arg: Input) => Input = identity;
let myIdentity3: { <Type>(arg: Type): Type } = identity;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}
let myIdentity4: GenericIdentityFn = identity;

interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}
let myIdentity5: GenericIdentityFn2<number> = identity;

// In addition to generic interfaces, we can also create generic classes.Note that it is not possible to create generic enums and namespaces.


// a class has two sides to its type: the static side and the instance side.Generic classes are only generic over their instance side rather than their static side, so when working with classes, static members can not use the class’s type parameter.


function loggingIdentity<Type>(arg: Type): Type {
  // console.log(arg.length);
  // Property 'length' does not exist on type 'Type'.
  //     Property 'length' does not exist on type 'Type'.
  return arg;
}

interface Lengthwise {
  length: number;
}

function loggingIdentity2<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}
loggingIdentity(3);
loggingIdentity({ length: 10, value: 3 });

//get object property 
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key]
}
let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, 'a')
getProperty(x, 'm') // giving error 

//creating factories classes
function create<Type>(c : {new(): Type}): Type {
  return new c()
}

let work =() => void
create(work())

// if (text.indexOf('@') === -1) {
//   send('Please enter valid text')
// }

