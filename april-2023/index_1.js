// type Streams = 'salary ' | 'sidehustle' | 'bonus' // dont put string with space
var monthlyIncome = {
    salary: 30000,
    bonus: 500,
    sidehustle: 1000
};
// Type '{ salary: number; }' is not assignable to type 'Income'.
var echo = function (arg) { return arg; };
var isObj = function (arg) {
    return (typeof arg === 'object' && !Array.isArray(arg) && (arg != null));
};
console.log(isObj(1));
console.log(isObj(false));
console.log(isObj([1, 3]));
console.log(isObj({ name: 'sid' }));
var isTrue = function (arg) {
    if (Array.isArray(arg) && !arg.length) {
        return { arg: arg, is: false };
    }
    if (isObj(arg) && Object.keys(arg)) {
        return { arg: arg, is: false };
    }
    return { arg: arg, is: !!arg };
};
console.log(isTrue(false));
console.log(isTrue(true));
console.log(isTrue('false'));
console.log(isTrue(''));
console.log(isTrue([]));
console.log(isTrue([false]));
console.log(isTrue({ name: false }));
var checkBoolean = function (arg) {
    return { value: arg, is: false };
};
var processUser = function (user) {
    return user;
};
// type T is not generic 
// const processUser = <T extends HasId>(user: T): T<T extends HasId> => {
//   return user
// }  
console.log(processUser({ id: 1, user: 'user 1' }));
// console.log(processUser({  user: 'user 1' })) // giving error
var getUserProperty = function (user, key) {
    return user.map(function (u) { return u[key]; });
};
console.log(getUserProperty([{ id: 1, name: 'user 1' }, { id: 2, name: 'user 2' }], 'id'));
console.log(getUserProperty([{ id: 1, name: 'user 1' }, { id: 2, name: 'user 2' }], 'name'));
