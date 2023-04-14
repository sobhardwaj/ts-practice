// type Streams = 'salary ' | 'sidehustle' | 'bonus' // dont put string with space

type Streams = 'salary' | 'sidehustle' | 'bonus'

type Income = Record<Streams, number | string>


const monthlyIncome: Income = {
  salary: 30000,
  bonus: 500,
  sidehustle: 1000
}

// Type '{ salary: number; }' is not assignable to type 'Income'.


const echo = <T>(arg: T): T => arg

const isObj = <T>(arg: T): boolean => {
  return (typeof arg === 'object' && !Array.isArray(arg) && (arg != null))
}

console.log(isObj(1))
console.log(isObj(false))
console.log(isObj([1, 3]))
console.log(isObj({ name: 'sid' }))

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
  if (Array.isArray(arg) && !arg.length) {
    return { arg: arg, is: false }
  }
  if (isObj(arg) && Object.keys(arg as keyof T)) {
    return { arg: arg, is: false }
  }
  return { arg, is: !!arg }
}

console.log(isTrue(false))
console.log(isTrue(true))
console.log(isTrue('false'))
console.log(isTrue(''))
console.log(isTrue([]))
console.log(isTrue([false]))
console.log(isTrue({ name: false }))

interface BooleanCheck<T> {
  value: T,
  is: boolean
}

const checkBoolean = <T>(arg: T): BooleanCheck<T> => {
  return { value: arg, is: false }
}

interface HasId {
  id: number
}

const processUser = <T extends HasId>(user: T): T => {
  return user
}

// type T is not generic 
// const processUser = <T extends HasId>(user: T): T<T extends HasId> => {
//   return user
// }  
console.log(processUser({ id: 1, user: 'user 1' }))
// console.log(processUser({  user: 'user 1' })) // giving error


const getUserProperty = <T extends HasId, K extends keyof T>(user: T[], key: K): T[K][] => {
  return user.map(u => u[key])
}
console.log(getUserProperty([{ id: 1, name: 'user 1' }, { id: 2, name: 'user 2' }], 'id'))
console.log(getUserProperty([{ id: 1, name: 'user 1' }, { id: 2, name: 'user 2' }], 'name'))
