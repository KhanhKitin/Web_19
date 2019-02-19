'use strict'

function search(input, target) {
 //return  input.indexOf(target);  // Remove this line and change to your own algorithm
 /* chat nhi phan
 let l = 0;
  let r = input.length - 1;
  while(l <= r){
    let mid = Math.floor((l+r)/2);
    if(target == input[mid]) return mid;
    else if(target < input[mid]){
      r = mid - 1;
    }
    else if(target > input[mid]){
      l = mid + 1;
    }
  }
  return -1;
  */
  for(let i = 0; i<input.length; i++){
    if(input[i] == target) return i;
  }
  return -1;
}

module.exports = search
