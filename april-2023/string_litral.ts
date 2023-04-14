const KeyboardEventKeys = {
  Escape: 'Escape',
  Enter: 'Enter',
  Tab: 'Tab'
}

type KeyboardEventKeys = keyof (typeof KeyboardEventKeys);
type KeyboardEventKeys_1 = keyof typeof KeyboardEventKeys;


function doSomething(key: KeyboardEventKeys) { }

// doSomething(KeyboardEventKeys.Enter);

// abaove doSomething fn code giving error 
// put as const in line 5 and see error gone  force the compiler to preserve literal types

function createEnum<T extends { [P in keyof T]: P }>(arg: T) {
  return arg
}

const KeyboardEventKeys2 = createEnum({
  Escape: 'Escape',
  Enter: 'Enter',
  Tab: 'Tab',
  CMD: 'CMD',
})

type KeyboardEventKeys2 = keyof (typeof KeyboardEventKeys2)
function doPress(key: KeyboardEventKeys) { }
doPress("Enter")
// doPress("") //err 

// [const] enum KeyboardEventKeys { ... }

// [const] enum KeyboardEventKeys {
//   Escape: 'Escape',
//   Enter: 'Enter',
//   Tab: 'Tab',
//   CMD: 'CMD',
// } 

type FormStateObjectType = {
  name: string,
  age: number
}
type FormDataArray = [keyof FormStateObjectType, string];
// const entries = Object.entries(state.formData) as FormDataArray[];
// entries.forEach(([fieldName, fieldValue]) => {
  // Process code here
// });