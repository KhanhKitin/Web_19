'use strict'

function sort(input) {
  //return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm

  for(let i=0;i<input.length;i++){
      for(let j=input.length-1; j>i ; j--){
        if(input[j-1]>input[j]){
          let t = input[j-1];
          input[j-1] = input[j];
          input[j] = t;
        }
      }
  }

 
   return input;
}

module.exports = sort
