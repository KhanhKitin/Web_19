"use strict";

function generate(testLengthArray) {
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
  var m = [];
  var mang = [];
  var k = [];

  for (let i = 0; i < testLengthArray.length; i++) {
    mang = Array.from({ length: testLengthArray[i] }, (v, i) => i);
    m.push(mang);
  }
  k = m.map(item => ({
    input: item,
    target: item[Math.floor(Math.random() * item.length)]
  }));
  k[0].target = 0;
  k[1].target = -1;
  for (let i = 0; i < k.length; i++) {
    let h;
    let kitin = 0;
    for (let j = 0; j < k[i].input.length; j++) {
      if (k[i].input[j] === k[i].target) {
        // console.log(k[i].input[j]);
        if (j === 0) {
          k[i].output = 0;
          break;
        } else if (j === k[i].input.length - 1) {
          k[i].output = k[i].input.length - 1;
          break;
        } else {
          k[i].output = j;
          break;
        }
      } else {
        kitin = 1;
      }
      if (kitin === 1) {
        k[i].output = -1;
      }
    }
  }
  return k;
}

module.exports = generate;
