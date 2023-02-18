// Type aliases and interfaces are very similar, and in many cases you can choose between them freely.Almost all features of an interface are available in type, the key distinction is that a type cannot be re - opened to add new properties vs an interface which is always extendable.

//Interface is extenable
// type not

type ID = number | string;

interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}


type Animal2 = {
  name: string
}

type Bear2 = Animal2 & {
  honey: boolean
}

//Type aliases may not participate in declaration merging, but interfaces can.



// interface Window {
//   title: string
// }

// interface Window {
//   ts: TypeScriptAPI
// }