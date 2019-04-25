'use strict';

// Handles command line input
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function findUVT(data) {
  // Total View Time
  let TVT = 0; 
  
  // Find Total View Time
  for (let i=0; i < data.length; i++) {
    let time = data[i].end - data[i].start;
    TVT += time;
  }

  let UVT = TVT;

  // Find duplicate times and subtract them from total
  for (let i=0; i < data.length; i++) {
    for (let j=0; j < data.length; j++) {
      // check for duplicate watch time mark with duplicate: true so that this set can be ignored in the next loop
      if (!data[i].duplicate && data[i] !== data[j] && data[i].start >= data[j].start && data[i].end <= data[j].end) {
        let time = data[i].end - data[i].start;
        UVT -= time;
        // mark with duplicate: true so that this set can be ignored in the next loop
        data[i].duplicate = true;  
      }
    } 
  }

  // Find overlaping times that aren't duplicates and subtract overlap from total
  for (let i = 0; i < data.length; i++) {
    for (let j=0; j < data.length; j++) {
      // check for overlaping watch time
      if (!data[i].duplicate && data[i] !== data[j] && data[i].start < data[j].start && data[i].end > data[j].start && data[i].end < data[j].end) {
        let time = data[i].end - data[j].start;
        UVT -= time;     
      }
    }
  }
  return UVT;
}

function msToTime(duration) {
  let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

rl.question('Input view data: ', (answer) => {
  let input = JSON.parse(answer);
  let uniqueViewTimeMS = findUVT(input);
  let uniqueViewTime = msToTime(uniqueViewTimeMS);

  console.log('The Unique View Time is: ', uniqueViewTime);

  rl.close();
});
