### Unique View Parser

I built this program using Javascript, and Node's Readline module to create the command line interface.
I left my scratch files that I developed my algorith in so you could see my process and some other approaches 
to the problem I tried.

## To Run

Requirements: 
Node.js installed on your machine.
Access to a command line or terminal.

Clone this repository, cd into the cloned directory and run $ node main.js

You will be prompted to enter your view data. The data needs to be input as an array of objects as JSON.
Provided is a template for inputing custom data through the CLI. Replace the number values with your unique data values.

Data template:
[{"start": 0, "end": 600}, {"start": 750, "end": 10000}, {"start": 800, "end": 10200}, {"start": 20000, "end": 50000}, {"start": 0, "end": 40000}, {"start": 60000, "end": 60100}]

## How it Works

The program takes data as an array of objects, finds the total view time of all the inputed view fragments, and then subtracts
the duplicate view times from the total view time to arrive at the unique view time total. 

Currently the program has a runtime complexity of 0(n^2 * 2)
This is a really high complexity. My next steps would be to refactor my code to be more efficient. I believe that 
with the use of a hash map data structure this algorithm could be rewritten to have a linear runtime complexity, though I am 
not yet sure how to go about that.

## Test Plan

Test input: <br>
Because the input data set has be in a particular format, I would want to write tests to check the input data.

Should fail if input = "[{start: num, end: num}]" or "start: num, end: num" or [{start: num, end: num}]
Ideally there would be a nice error message to tell the user what went wrong and explain the correct data format. I would 
want to test that this fires correctly on fail.

Should pass if input = [{"start": num, "end": num}]


Test findUVT() function output: <br>
I would want to write tests to verify that the findUVT() function is outputting the correct data type, in this case 
a number.
Should pass if typeof UVT === number
Should fail if typeof UVT !== number

I would also write a test that runs the program with a hardcoded data set of view times with a known UVT to verify 
that the correct UVT is being output.
Should pass if returned UVT matches expected UVT
Should fail if returned UVT is < || > expected UVT
