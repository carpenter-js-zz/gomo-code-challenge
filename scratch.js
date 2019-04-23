'use strict';

// Your objective is to write code that accepts a collection 
// of viewed fragments as input and outputs the UVT (Unique View Time) 
// Viewed Fragments will consist of the start and ending time in ms 
// of a given watched fragment of video.

// sample input
const video1 = [
  {
    start: 0,
    end: 600
  },
  {
    start: 750,
    end: 10000 
  },
  {
    start: 800,
    end: 10200 
  },
  {
    start: 20000,
    end: 50000 
  },
  {
    start: 0,
    end: 40000 
  },
  {
    start: 60000,
    end: 60100
  },
];

const video2 = [{'start': 0, 'end': 600}, {'start': 750, 'end': 10000}, {'start': 800, 'end': 10200}];

// [{"start": "0", "end": "600"}, {"start": "750", "end": "10000"}, {"start": "800", "end": "10200"}, {start: 20000, end: 50000 }, {start: 0, end: 40000 }, {start: 60000, end: 60100},];


// expected output --> 50100ms UVT

// === possible approach ===
// First sort the data set by start least to greatest

// Find the total watch time (TWT)
// 	let TWT, UVT
// 	for loop
// 		time = end - start
// 		TWT += time
	
// 	for loop
// 		if duplicate -> start[i+1] < end[i] > end[i+1]
// 			time = end[i] - start[i]
// 			UVT = TWT - time
// 		if overlap -> start[i] < start[i+1] && end[1] < end[2]
// 			time = start[i+1] - end[i]
// 			UVT = TWT - time
// 	return UVT

function findUVT(data) {
  // Total View Time
  let TVT = 0; 
  
  // Find Total View Time
  for (let i=0; i < data.length; i++) {
    let time = data[i].end - data[i].start;
    TVT += time;
  }

  let UVT = TVT;
  console.log('before nested loop', UVT, TVT);

  // Find duplicate times and subtract them from total
  for (let i=0; i < data.length; i++) {
    for (let j=0; j < data.length; j++) {
      // console.log(data[i], data[j]);
      // check for duplicate watch time
      if (!data[i].duplicate && data[i] !== data[j] && data[i].start >= data[j].start && data[i].end <= data[j].end) {
        console.log('in duplicate loop', data[i], data[j]);
        let time = data[i].end - data[i].start;
        UVT -= time;
        data[i].duplicate = true;
        console.log('in duplicate loop', time, UVT);
      }
    } 
  }

  // Find overlaping times that aren't duplicates and subtract overlap from total
  for (let i = 0; i < data.length; i++) {
    for (let j=0; j < data.length; j++) {
      // check for overlaping watch time
      if (!data[i].duplicate && data[i] !== data[j] && data[i].start < data[j].start && data[i].end > data[j].start && data[i].end < data[j].end) {
        console.log('in overlap loop', data[i], data[j]);
        let time = data[i].end - data[j].start;
        UVT -= time;
        // data[i].mark = true;
        console.log('in overlap loop', time, UVT);
      }
    }
  }
  return UVT;
}
		
let uniqueViewTime = findUVT(video2);

console.log('uvt is: ', uniqueViewTime);
// === possible approach ===
// nested for loop to compare each element i=0 and j=0

// if duplicate ->  arr[i].start > arr[j].start && arr[i].end > arr[j].end
// push into duplicate array

// if theres is overlap -->  arr[i].start < arr[j].end && arr[j].start < arr[i].end
// create new object, if arr[i].start < arr[j.start] set new obj start: arr[i].start, else start: arr[j].start
// if arr[i].end > arr[j].end set new obj end: arr[i].end else end: arr[j].end
// push new obj into overlap array

// else its unique --> push into unique array

// now do the above to the overlap array because it may still have duplicate ranges
// if totally unique push into unique array
// if tottally not unique remove, push into duplicate array, or maybe just slice whichever is more efficient
// if overlap combine again
// keep looping until overlap array is empty


// function findUVT(data) {
//   let unique = [];
//   let duplicate = [];
//   let overlap = [];

//   for (let i=0; i < data.length; i++) {
//     for (let j=0; j < data.length; j++) {
//       // check if duplicate range
//       if (data[i] !== data[j] && data[i].start >= data[j].start && data[i].end < data[j].end) {
//         duplicate.push(data[i]);
//         data.splice(i, 1); // this is messing up arr.length so items are getting skipped
//       }
//       // check for overlap
//       else if (data[i].start < data[j].end && data[j].start < data[i].end) {
//         let obj = {};
//         // set start
//         if (data[i].start < data[j].start) {
//           obj.start = data[i].start;
//         } else {
//           obj.start = data[j].start;
//         }
//         // set end
//         if (data[i].end > data[j].end) {
//           obj.end = data[i].end;
//         } else {
//           obj.end = data[j].end;
//           overlap.push(obj);
//         }
        
//       }
//     }
//   }
//   console.log('duplicates: ', duplicate);
//   console.log(data);
//   console.log('overlaps', overlap);
//   return unique;
// }



// DECENT
// function findUVT(viewedFragments) {
//   let uniqueFragments = [];
  
//   for (let i = 0; i < viewedFragments.length; i++) {
//     console.log('i: ', viewedFragments[i]);
    
//     for (let j = i+1 ; j < viewedFragments.length; j++) {
//       console.log('j :', viewedFragments[j]);

//       if (viewedFragments[i].end < viewedFragments[j].start || viewedFragments[i].start > viewedFragments[j].end) {
//         uniqueFragments.push(viewedFragments[i]);
//       }
//     }
    
//   }

//   return uniqueFragments;
// }

// find duration -> end - start
// function findUVT(viewedFragments) {
//   let uniqueFragments = [];
  
//   for (let i = 0; i < viewedFragments.length; i++) {
//     console.log('i: ', viewedFragments[i]);
    
//     for (let j = i+1 ; j < viewedFragments.length; j++) {
//       console.log('j :', viewedFragments[j]);
//       // this is still wrong but getting better
//       if (viewedFragments[i].start >= viewedFragments[j].end || viewedFragments[j].start >= viewedFragments[i].end) {
//         break;
//       }
//       uniqueFragments.push(viewedFragments[i]);
//     }
    
//   }

//   return uniqueFragments;
// }




// ====== One possible approach ======
// sort by start least to greatest.

// let pre = last range that starts before r starts

// let post = earliest range that starts before r ends

// now iterate from pre to post: split ranges that overlap, remove ranges that are covered, then add r