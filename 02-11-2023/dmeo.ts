//Return the sentence with maximum number of words in it. Also, print index and the sentence in reverse order and capitalize all the words.
// OUTPUT: MUCH VERY THANKS, GREAT IS THIS
const sentences = ["alice and bob love Globant", "I think so too", "This is great, thanks very much"]



function reverseCapital() {
  let wordLength = 0
  let foundIndex;
  for (let i = 0; i < sentences.length; i++) {
    if (sentences[i].length > wordLength) {
      wordLength = sentences[i].length

      foundIndex = i
    }
  }
  let ar = sentences[foundIndex].split('')
  for (let i = 0; i < ar.length; i++) {

  }
}
// problem solving ends here

// Data types in JavaScript
String
Symbol
Array
Object
Date
Boolean
Number




// let d = new Date()

function addNumbers(num1, num2) {
  return num1 + num2;
}

console.log(addNumbers(1 + 2)) '1 + 2undefined'

console.log(3 + undefined) '3underiend'

// OOPS
//

// Inheritance
// Polymorphism 
// encapsulation
// 

//
// strauctal design pattern
// behaviour design pattern
// 

// abstact pattern
// factory pattern
// observer pattern
// builder pattern
// singlaton pattern


const person = {
  firstName: 'John',
  lastName: 'Doe',
  getFullName: () => {
    return this.firstName + ' ' + this.lastName;
  },
};

const anotherPerson = {
  firstName: 'Jane',
  lastName: 'Doe'
}

console.log(person.getFullName().call(anotherPerson))

// OUTPUT: 'Jane Doe'

//
const Employee = {
  company: 'xyz'
}

const emp1 = Object.create(Employee)
delete emp1.company
console.log(emp1.company)

//
function createClosure() {
  const data = new Array(1000000).fill('Some data');

  return function () {
    console.log(data);
  };
}

const create = createClosure()

setInterval(create, 1000)
//

var b = 20;

function fun() {
  b = 30
}
fun()

console.log(b)

// hoisting
fun()

var fun = function () {
  console.log('Will this be hoisted')
}

function sun() {
  var val = 29;
}

// 

const obj = {
  user: {
    address: {
      street: 'Road',
      pin: 2323
    },
    name: 'ABC'
  }
}

const obj2 = obj;
obj2.user = {
  name: 'PQR',
  address: null
}

console.log(obj1.user)
//

console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 0);

setTimeout(() => {
  console.log('Timeout 2');
}, 100);

process.nextTick(() => { console.log('tick') })

Promise.resolve().then(() => console.log('Promise 1'));

Promise.resolve().then(() => console.log('Promise 2'));

console.log('End');

//start
// tick
// Promise 1
// Promise 1
// End
// timeout 1
// timeout 2


"test": "~1.2.3"
"test": "^1.2.3" 


imoprt Express from epress


const app = expres()
app.useMiddleware()
app.useMiddleware(cors())


app.listen(() => {

})
app.get('/health', (req, res) => {
  // 
  if ()
})

let reqList = [{

}];
const req = (req, res) => {

  next()
}

//
const promise = new Promise(res => res(2));
await promise.then(v => v * 1).then(v => v * 2).then(v => v * 3).finally(v => v * 4)

2 * 1 = 2, 2 * 2= 4, 12 * 4 =48
//

console.log(2 + 1);

await sleep();

// async sleep = () => {

//         setTimeOut((
//         ) => { }, 2000)
//     }
// }

console.log('Slept for 2000 ms')
//

Query

// employee sort // limit 4th // skip 3