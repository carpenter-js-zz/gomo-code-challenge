'use strict';

const arr = [
  ['a', 10, 12], 
  ['d', 15, 95],
  ['b', 20, 30], 
  ['c', 29, 30], 
  ['e', 195, 196]
];
   

function checkOverlap(arr){
  const overlaps = {};
  // match each item against all others BUT itself
  for( let i=0; i < arr.length; i++ ) {
    console.log('i', arr[i]);
    for( let j=0; j < arr.length; j++ ) {
      console.log('j', arr[j]);
      if( arr[i] !== arr[j] && arr[i][1] < arr[j][2] && arr[j][1] < arr[i][2] ) {
        // overlaps.push({
        //   start: arr[i][1],
        //   end: arr[j][2]
        // });
        overlaps[arr[i][1]] = arr[j][2];
        // overlaps[arr[i][0]] = 1;
      }
    }
  }

  return overlaps;
  // return Object.keys(overlaps);
}

// console.log(checkOverlap(arr));

// example node CL interface
// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// let test;
// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);
//   test = answer;

//   rl.close();
// });

// console.log(test);

let arg = '[{"start": 0, "end": 600}, {"start": 750, "end": 10000}, {"start": 800, "end": 10200}]';
JSON.parse(arg);
console.log('arg', arg);

"[{'start': 0, 'end': 600}, {'start': 750, 'end': 10000}, {'start': 800, 'end': 10200}]"
// [{"start": 0, "end": 600}, {"start": 750, "end": 10000}, {"start": 800, "end": 10200}] --> input to command line in this format