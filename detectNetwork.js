// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var cardProperties = [
  { name: 'Diner\'s Club', prefix: [38, 39], length: [14] },
  { name: 'American Express', prefix: [34, 37], length: [15] },
  { name: 'Switch', prefix: [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759], length: [16, 18, 19] },
  { name: 'Visa', prefix: [4], length: [13,16,19] },
  { name: 'MasterCard', prefix: [51, 52, 53, 54, 55], length: [16] },
  { name: 'Discover', prefix: [6011, 644, 645, 646, 647, 648, 649, 65], length: [16, 19] },
  { name: 'Maestro', prefix: [5018, 5020, 5038, 6304], length: [12, 13, 14, 15, 16, 17, 18, 19] },
  { name: 'China UnionPay', prefix: [624, 625, 626, 6282, 6283, 6284, 6285, 6286, 6287, 6288].concat(function(start, end) {
      var arr = [];
      for(var i = start; i < end; i++)
        arr.push(i);
      return arr;
    }(622126, 622926)) , length: [16, 17, 18, 19] }
];


var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  // Visa always has a prefix of 4 and a length of 13, 16, or 19.
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
  // Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.
  // Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.
  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.
  // Once you've read this, go ahead and try to implement this function, then return to the console.
  for(var i = 0; i < cardProperties.length; i++) {
    for(var j = 0; j < cardProperties[i].prefix.length; j++) {
      var prefixMatch = true;
      for(var k = 0; k < cardProperties[i].prefix[j].toString().length; k++) {
//        console.log('matching prefix value: ' + cardProperties[i].prefix[j].toString()[k] + ' to cardNumberValue: ' + cardNumber[k]);
        if(cardNumber[k] !== cardProperties[i].prefix[j].toString()[k]) {
          prefixMatch = false;
          break; // move on to next prefix set
        }
      }
      if(prefixMatch && (cardProperties[i].length.includes(cardNumber.length))) {
        return cardProperties[i].name;
      }
    }
  }
  return 'card not found';

}
var testCards = function() {
//  "Diner's Club"
  console.log(detectNetwork('38345678901234'));
  console.log(detectNetwork('39345678901234'));
//  "American Express"
  console.log(detectNetwork('343456789012345'));
  console.log(detectNetwork('373456789012345'));
//  "Visa"
  console.log(detectNetwork('4123456789012'));
  console.log(detectNetwork('4123456789012345'));
  console.log(detectNetwork('4123456789012345678'));
//  "MasterCard"
  console.log(detectNetwork('5112345678901234'));
  console.log(detectNetwork('5212345678901234'));
  console.log(detectNetwork('5312345678901234'));
  console.log(detectNetwork('5412345678901234'));
  console.log(detectNetwork('5512345678901234'));
//  "Discover"
  console.log(detectNetwork('6011567890123456'));
//  "Maestro"
  console.log(detectNetwork('503800000000'));
// China UnionPay
  console.log(detectNetwork('6229257890123456'))
//  "Switch"
  console.log(detectNetwork('6331107890123456'));
//  "card not found"
  console.log(detectNetwork('50380000000011231234'));

}
