// // Online Javascript Editor for free
// // Write, Edit and Run your Javascript code using JS Online Compiler

// var a = 10
// var b = 20

// var c = b
// c = 30
// a = 40
// console.log(a,b,c)
// console.log("Welcome to Programiz!");

// const obj = [{
//     name : 'sid',
//     age : 31,
//     address : {
//         name :  { place : 'john' }
//     }
// }]


// const ingredientsList = ["noodles", { list: ["eggs", "flour", "water"] }];

// const ingredientsListCopy = [...ingredientsList]

// ingredientsListCopy[0]= 'cooll'
// ingredientsListCopy[1].list[0] = 'buff'
// console.log(ingredientsList, '\n', ingredientsListCopy)
// const obj2 = [...obj]
// delete obj2[0].address;

// console.log(obj , '\n', obj2)

// console.log('start');

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
// })

// promise1.then(res => {
//   console.log(res)
// })

// console.log('end');

let person = {
  firstName: 'John',
  lastName: 'Doe',
  // address: {
  //     street: 'North 1st street',
  //     city: 'San Jose',
  //     state: 'CA',
  //     country: 'USA'
  // }
};


let copiedPerson = { ...person }

copiedPerson.firstName = 'Jane'; // disconnected

// copiedPerson.address.street = 'Amphitheatre Parkway'; // connected
// copiedPerson.address.city = 'Mountain View'; // connected

// console.log(person, '\n', copiedPerson);



// const ar = [1,2,3,4]
// const lastValue = ar.splice(ar.length - 1)
// console.log(lastValue)



count = 2
function job() {
  return new Promise(function (resolve, reject) {
    resolve(count);
  });
}

// let promise = job();

// promise
// .then(function() {
//     count = count * 2
//     console.log(count)
//     console.log('Success 1');
// })
// .then(function() {
//     count = count *2
//     console.log(count)
//     console.log('Success 2');
// })
// .then(function() {
//     console.log('Success 3');
// })
// .catch(function() {
//     console.log('Error 1');
// })
// .then(function() {
//     console.log('Success 4');
// });


function job(state) {
  return new Promise(function (resolve, reject) {
    if (state) {
      resolve('success');
    } else {
      reject('error');
    }
  });
}

let promise = job(true);

promise
  .then(function (data) {
    console.log(data);
    return job(false);
  })
  .catch(function (error) {
    console.log(error);
    return job(true);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function (data) {
    console.log(data)
  })
  ;


// function job(delay) {
//     return new Promise(function(resolve) {
//         setTimeout(function() {
//             console.log('Resolving', delay);
//             resolve('done ' + delay);
//         }, delay);
//     });
// }

// var promise = Promise.all([job(1000), job(2000), job(500), job(1500)]);

// promise.then(function(data) {
//     console.log('All done');
//     data.forEach(function(text) {
//         console.log(text);
//     });
// });


const fs = require('fs');
(function mainline() {
  process.nextTick(() => {
    console.log('A');
  });
  console.log('B');
  setTimeout(() => {
    console.log('C');
  }, 5000);
  setImmediate(() => {
    console.log('D');
  });
  fs.readdir('./', 'utf8', (err, files) => {
    console.log('E');
    setTimeout(() => {
      console.log('F');
    }, 0);
    setImmediate(() => {
      console.log('G');
    });
    process.nextTick(() => {
      console.log('H');
    });
  });
  console.log('I');
})();












