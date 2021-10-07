// Write a function that takes a string as argument and returns the number of vowels contained in that string.
const findVowels = str => {
  let count = 0
  const vowels = ['a', 'e', 'i', 'o', 'u']
  for(let char of str.toLowerCase()) {
    if(vowels.includes(char)) {
      count++
    }
  }
  return count
}

// console.log(findVowels('flower')); //returns 2

function fizzBuzz(num) {
  for (var i = 1; i <= num; i++) {
    if (i % 15 === 0) console.log("FizzBuzz");
    else if (i % 3 === 0) console.log("Fizz");
    else if (i % 5 === 0) console.log("Buzz");
    else console.log(i);
  }
}

// fizzBuzz(20);

function checkArrays() {
  const dogs = ["Fido", "Odie", "Oscar"];

  dogs.length = 1;

  console.log(dogs);
}

// checkArrays(); //array returns fido

// big O notation O(n^2)
function addAndLog(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      console.log(array[i] + array[j]);
    }
  }
}

// addAndLog(['A', 'B', 'C', 'D']);

// harmless ransom note
function harmlessRansomeNote(noteText, magazineText) {
  // change both noteText string and magazineText string into an array of words
  var noteArray = noteText.split(" ");
  var magazineArray = magazineText.split(" ");
  var magazineObj = {};

  // find out what word exists in the magazineArray and how many of them there are
  // use a hash table
  magazineArray.forEach((word) => {
    // check if a word is present, if not present give it a value of 0
    if (!magazineObj[word]) magazineObj[word] = 0;
    magazineObj[word]++;
  });

  // we are now going to check if we have the necessary words in our magazine to write our note
  // if the word is not present, we cannot use that word to write our note
  // if the word is present in our magazineObj, decrements the words value by 1 because we have used up one of the words in our note.

  // set a boolean value to check whether or not we can make up our note with words in the magazineObj
  var noteIsPossible = true;
  noteArray.forEach((word) => {
    if (magazineObj[word]) {
      magazineObj[word]--;

      if (magazineObj[word] < 0) noteIsPossible = false;
    } else noteIsPossible = false;
  });

  //   console.log(noteIsPossible);
  return noteIsPossible;
}

// big O notation of O(n) which is a linear complexity, no issue on performance  since there are two loops and they are not nested
// it can also be referred to as O(n) + O(m) => O(n + m)
harmlessRansomeNote(
  "this is all magazine",
  "this is all the magazine text in the magazine"
);




// ANAGRAM - functions almost like the Harmless Note but this works with letters of the Character not the word
// helper function that builds the
// object to store the data
const buildCharObject = str => {
  const charObj = {}
  for(let char of str.replace(/[^\w]/g).toLowerCase()) {
    // if the object has already a key value pair
    // equal to the value being looped over,
    // increase the value by 1, otherwise add
    // the letter being looped over as key and 1 as its value
    charObj[char] = charObj[char] + 1 || 1
  }
  return charObj
}

// main function
const anagram = (strA, strB) => {
  // build the object that holds strA data
  const aCharObject = buildCharObject(strA)
  // build the object that holds strB data
  const bCharObject = buildCharObject(strB)

  // compare number of keys in the two objects
  // (anagrams must have the same number of letters)
  if(Object.keys(aCharObject).length !== Object.keys(bCharObject).length) {
    return false
  }
  // if both objects have the same number of keys
  // we can be sure that at least both strings
  // have the same number of characters
  // Now we can compare the two objects to see if both
  // have the same letters in the same amount
  for(let char in aCharObject) {
    if(aCharObject[char] !== bCharObject[char]) {
      return false
    }
  }
  // if both the above checks succeed,
  // you have an anagram: return true
  return true
}

function validAnagram(first, second){
  if(first.length !== second.length) {
    return false;
  }

  const lookup = {};

  for(let i = 0; i < first.length; i++) {
    let letter = first[i];
    //if letter exists, increment, otherwise set to 1
    lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
  }

  for(let i = 0; i < second.length; i++){
    let letter = second[i];
    //if !letter or letter == 0; cannot be anagram
    if(!lookup[letter]) {
      return false;
    }else {
      lookup[letter] -= 1;
    }
  }

  return true;
}



// Is Palindrome => word or phrase that is spelled the same both forward and backwards e.g race car or madam, I'm Adam
// takes a string as an argument and returns true if the string is a palindrome or returns false if a string is not a palindrome
// To determine if a phrase is a palindrome, we disregard any punctuations in it

function isPalindrome(string) {
  string = string.toLowerCase();
  var charArr = string.split("");
  var validCharacters = "abcdefghijklmnopqrstuvwxyz".split("");

  // strip out any char in our string that is not a letter i.e stripped of all characters and punctuations
  var lettersArr = [];
  charArr.forEach((char) => {
    if (validCharacters.indexOf(char) > -1) lettersArr.push(char);
  });

  // check for palindrome tendencies
  // var isPossibleIsPalindrome = true
  if (lettersArr.join("") === lettersArr.reverse().join("")) return true;
  return false;
}

//FIXME: OR - this does not strip out any punctuations...
const palindrome = str => {
  // turn the string to lowercase
  str = str.toLowerCase()
  // reverse input string and return the result of the
  // comparisong
  if( str === str.split('').reverse().join('')) return true;
  return false;
}

// console.log(palindrome("I'm Adam")); // return false

// FOR LESS THAN 160 LINES
function isArgPalindrome(str){
  str = str.replace(/\W/g, '').toLowerCase();
  return (str == str.split('').reverse().join(''));
}

// console.log(isArgPalindrome("A car, a man, a maraca")); // return true (look at the '===' operator)


// console.log(isPalindrome("race car"));

// CAESAR CIPHER => shift every letter in the string by the value of the number that is passed in
// if shifting a letter and we wind up at the end of the alphabet, we must loop again and continue shifting the letter from there

function caesarCipher(str, num) {
  // what if we pass a number into our algorithm that is greater than 26 or less than -26
  num = num % 26;
  var toLowerCaseString = str.toLowerCase();
  var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

  //   Add a newly shifted letter to the new string
  var newString = "";

  for (var i = 0; i < toLowerCaseString.length; i++) {
    var currentLetter = toLowerCaseString[i];
    // if we have a special space character, we still want to add it so the string we be the same
    if (currentLetter === " ") {
      newString += currentLetter;
      continue; //move onto the next iteration of the for loop
    }

    // determine where our current letter is in the alphabet array
    var currentIndex = alphabet.indexOf(currentLetter);

    // determine the new index of our letter after it has been shifted
    var newIndex = currentIndex + num;
    if (newIndex > 25) newIndex = newIndex - 26; //loops our line to the begginning of the alphabet
    if (newIndex < 0) newIndex = 26 + newIndex;

    // what of one or more of our letters in our original string is uppercase, then we want the new shifted letter to be uppercase as well
    if (str[i] === str[i].toUpperCase()) {
      newString += alphabet[newIndex].toUpperCase();
    } else newString += alphabet[newIndex];
  }

  console.log(newString);
  return newString;
}

// here, z shifted forward, so we have reading the alphabet from z = z a b(is the answer)
// for o = o p q(is the answer)
// for k = k m n(is the answer)
// caesarCipher("Zoo Keeper", 2); // output is Bqq Mggrgt
// caesarCipher("Big Car", -16); // output is Lsq Mkb
// caesarCipher("Javascript", -900); // output is Tkfkcmbszd

// REVERSE WORDS => reverse every word in the string and returns a new string
function reverseWords(string) {
  // create an array of all the words in our string
  var wordsArr = string.split(" ");

  // define an empty array to pushed our reverse words into
  var reversedWordsArr = [];

  // loop through every word, reverse the word and push it into our words array
  wordsArr.forEach((word) => {
    var reversedWord = "";

    // we use for loop to go in the backward direction
    for (var i = word.length - 1; i >= 0; i--) {
      reversedWord += word[i];
    }
    reversedWordsArr.push(reversedWord);
  });

  // console.log(reversedWordsArr.join(' '));
  return reversedWordsArr.join(" ");
}

reverseWords("this is a string of words");
reverseWords("Coding Javascript");

// REVERSE ARRAY IN PLACE
function reverseArrayInPlace(arr) {
  // revere arr
  // return reversed arr

  // TODO - Be sure to manipulate the array passed in - Do not push elements into a new array and return that array - Do not use the reverse array method
  for (let i = 0; i < arr.length / 2; i++) {
    // switch the first element of the array with the last element of the array and switch the second element of the array with the second-to-last element of the array and so on...
    var tempVar = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = tempVar;
  }
//   console.log(arr);
  return arr;
}

reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7]);

// MEAN MEDIAN MODE => takes a number as an array and return three objects that has three properties
// {mean: 'the mean value', median: 'the median value', mode: 'the mode value'}

function meanMedianMode(array) {
  return {
    mean: getMean(array),
    median: getMedian(array),
    mode: getMode(array),
  };
}

function getMean(array) {
  var sum = 0;

  array.forEach((num) => {
    sum += num;
  });

  var mean = sum / array.length;
  return mean;
}

function getMedian(array) {
  // get middle of an array after it is been sorted
  array.sort(function (a, b) {
    return a - b;
  }); //sorts numbers in ascending order

  var median;

  //   odd number of element in arr or even number of elements in an array
  if (array.length % 2 !== 0) {
    median = array[Math.floor(array.length / 2)];
  } else {
    var mid1 = array[array.length / 2 - 1];
    var mid2 = array[array.length / 2];

    median = (mid1 + mid2) / 2;
  }

  return median;
}

function getMode(array) {
  // will return which number appears the most in the array
  // answer is returned in array

  // using a hash table
  var modeObj = {};

  array.forEach((num) => {
    // if num does not exist as a property in the modeObj
    if (!modeObj[num]) modeObj[num] = 0;
    modeObj[num]++; //increment the value of that property by if it already exists
  });

  var maxFrequency = 0; // lets us know how often the current variable shows up
  var modes = []; // an array to put all of modes in
  for (var num in modeObj) {
    // gives access to all the number of properties in modeObj
    if (modeObj[num] > maxFrequency) {
      modes = [num];
      maxFrequency = modeObj[num];
    } else if (modeObj[num] === maxFrequency) modes.push(num);
  }

  // what if every number appears the same number of times or at the same frequency
  if (modes.length === Object.keys(modeObj).length) modes = [];

  return modes;
}

// console.log(meanMedianMode([9, 10, 23, 10 , 23, 9]));

// TWO SUM => returns an array filled with every pair of number from the 'numArray' that adds up to the 'sum'
// if numArray = [1,6,4,5,3,3] and sum = 7 then result = [[6,1], [3, 4], [3, 4]];
function twoSum(numArray, sum) {
  var pairs = [];
  var hashtable = []; //we will use an array as a hashtable

  for (let i = 0; i < numArray.length; i++) {
    var currNum = numArray[i];
    var counterpart = sum - currNum; // counterpart is num the currNum has to add to, to give the sum, it is in the same array pair with the currNum

    // check hashTable to see if counterpart exists in it
    if (hashtable.indexOf(counterpart) !== -1) {
      pairs.push([currNum, counterpart]);
    }

    // push the currNum into the hashtable no matter what
    hashtable.push(currNum);
  }

  return pairs;
}

// console.log(twoSum([40, 11, 19, 17, -12], 28));

// LESSON ON RECURSION - a function that calls itself
// All Recursive functions have two cases: A base case that does not return or invoke the function but returns a value
// A recursive case, that returns or invokes the function
// function func() {
//     if(/*base case*/) {
//         return
//     }else { //recursive case
//         func()
//     }
// }

// Writting a recursive func that returns a factorial
function factorial(num) {
  if (num < 0) return;
  if (num === 0) {
    //base case
    return 1;
  } else {
    // recursive case
    return num * factorial(num - 1);
  }

  // OR WITH FOR LOOP
  // let total = i;
  // for(let i = num; i > 1; i--){
  //   total *= i
  // }
  // return total
}
// console.log(factorial(4));

//OR another example
function countDown(num) {
  if(num <= 0) {
    console.log('All done');
    return;
  }
  console.log(num);
  num--;
  countDown(num)

  // THIS IS SAME AS
  // for (let i = num; i > 0; i--) {
  //   console.log(i);
  // }
  // console.log("All done!");
}

// countDown(5); //return 5, 4, 3, 2, 1, 'All done'

// OR the third example
function sumRange(num){
  if(num === 1) return 1;
  return num + sumRange(num - 1);
}

console.log(sumRange(5)); //returns 14

// BINARY SEARCH - search for a given value (key) inside of a list (numArray)
// runs in O(log n) run time - very performant
// can be written as a recursive function

// uses the DIVIDE AND CONQUER method - involves diving a data set into smaller chunks and then repeating a process with a subset of data. it can tremendously decrease time complexity

function binarySearch(numArray, key) {
  var middleIdx = Math.floor(numArray.length / 2);
  var middleElem = numArray[middleIdx];

  if (middleElem === key) return true;
  else if (middleElem < key && numArray.length > 1) {
    return binarySearch(numArray.splice(middleIdx, numArray.length), key);
  } else if (middleElem > key && numArray.length > 1) {
    return binarySearch(numArray.splice(0, middleIdx), key);
  } else return false;
}

// console.log(binarySearch([5, 7, 12, 16, 36, 39, 42, 56, 71], 15));

// FIBONACCI - a special sequence of numbers called the fibonacci sequence - every number after a that number is the sum of the two previous figures...
// e.g 1,1,2,3,5,8,13,21,34
// the first two numbers in the fibonacci sequence are always 1, 1

// this present function has a very bad complexity with O(n^2) resulting to a slow runtime
function fibonacci(position) {
  //position of the number in the sequence
  if (position < 3) return 1;
  else return fibonacci(position - 1) + fibonacci(position - 2);
}

// console.log(fibonacci(20));

// WE WILL NOW USE MEMOIZATION TO INCREASE PERFORMANCE
// MEMOIZED FIBONACCI - takes two parameters: index - index of number in fibonacci sequence we want to retrieve and cache: an array used as memory
// exponential = O(n) runtime

// We use memoization to:
// - Check to see if number already exists in cache
// - if number is in cacher, use that number
// - if number is not in cache, calculate it and put it in cache so it can be used multiple times in the future
function fibMemo(index, cache) {
  cache = cache || [];
  // base case in the recursive function
  if (cache[index]) return cache[index];
  else {
    if (index < 3) return 1;
    else {
      cache[index] = fibMemo(index - 1, cache) + fibMemo(index - 2, cache);
    }
  }
  return cache[index];
}

// console.log(fibMemo(6)); //we can initialize cache as an array in the function or initialize it when the function is called fibMemo(20, []);

// OR
const fibonacciV = num => {
  // store the Fibonacci sequence you're going
  // to generate inside an array and
  // initialize the array with the first two
  // numbers of the sequence
  const result = [0, 1]

  for(let i = 2; i <= num; i++) {
    // push the sum of the two numbers
    // preceding the position of i in the result array
    // at the end of the result array
    const prevNum1 = result[i - 1]
    const prevNum2 = result[i - 2]
    result.push(prevNum1 + prevNum2)
  }
  // return the last value in the result array
  return result[num]
}

// Step-by-step solution for step counting using recursion  

// Problem
// Suppose you want climb a staircase of N steps, and on each step you can take either 1 or 2 steps. How many distinct ways are there to climb the staircase? For example, if you wanted to climb 4 steps, you can take the following distinct number of steps:
// 1) 1, 1, 1, 1
// 2) 1, 1, 2
// 3) 1, 2, 1
// 4) 2, 1, 1
// 5) 2, 2
// So there are 5 distinct ways to climb 4 steps. We want to write a function, using recursion, that will produce the answer for any number of steps.
// Answer
// The solution to this problem requires recursion, which means to solve for a particular N, we need the solutions for previous N's. The solution for N steps is equal to the solutions for N - 1 steps plus N - 2 steps.

function countSteps(N) {
  
  // just as in our solution explanation above, we know that to climb 1 step
  // there is only 1 solution, and for 2 steps there are 2 solutions
  if (N === 1) { return 1; }
  if (N === 2) { return 2; }
  
  // for all N > 2, we add the previous (N - 1) + (N - 2) steps to get
  // an answer recursively
  return countSteps(N - 1) + countSteps(N - 2);
  
}

// the solution for N = 6 will recursively be solved by calculating
// the solution for N = 5, N = 4, N = 3, and N = 2 which we know is 2
countSteps(6); 








// SIEVE OF ERATOSTHENES - return all primer numbers up to 'num' in array

function sieveOfErasthosthenes(num) {
    // make an array that goes from 0 to num and make each value of that array to be true
    var primes = [];
    for (let i = 0; i <= num; i++) {
        primes[i] = true;
    }

    // mark 0 and 1 as false because they are not prime numbers
    primes[0] = false;
    primes[1] = false;

    // mark the multiples of each index as false as we loop through the primes array
    // we used Math.sqrt for optimization sake - we can stop our loop at the sqrt of "num" because all non-prime numbers or multiples of each number after the sqrt of 'num' 
    // will be marked as false before we get to the sqrt of 'num' so there is not point continuing our loop, remember the numbers were converted to values of true in line 367
    // So, all prime numbers will remain as true then we simply return the numbers in an array

    // FIXME: we started from 2 because we've already marked 0 and 1 as false...
    for (let i = 2; i < Math.sqrt(num); i++) {
        // the inner loop handles the marking of the multiples of each number we pass as false
        for(var j = 2; j * i <= num; j++) {// j * i = multiples
            primes[i * j] = false;
        }
    }

    // define array to place our prime numbers in
    var result = [];
    // return the numbers that are prime and still marked as true
    for (var i = 0; i < primes.length; i++) {
        if(primes[i]) result.push(i);
    }

    return result;
}

// console.log(sieveOfErasthosthenes(20));



// BUBBLE SORT - takes an array of numbers as a parameter and will return that array sorted from least to greatest
// if array = [1,2,3,5,4,6] it takes array.length - 1 passes to loop throught the array to bubble sort it
function bubbleSort(array) {
    for (let i = array.length; i > 0; i--) {
        // comparing each number to its neighbour
        for(var j = 0; j < i; j++) {
            if (array[j] > array[j + 1]) {
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    return array;
}

// console.log(bubbleSort([5, 3, 8, 2, 1, 4]));



// OR 

function swap(arr, i1, i2) {
  var temp = arr[i1];
  arr[i1] = arr[i2];
  arr[i2] = temp;
}

function bubblesort(arr) {
  
  var swapped = true;
  
  // keep going unless no elements can be swapped anymore
  while (swapped) {
    
    // set swapped to false so that the loop stops
    // unless two element are actually swapped
    swapped = false;

    // loop through the whole array swapping adjacent elements
    for (var i = 1; i < arr.length; i++) {
      if (arr[i-1] > arr[i]) {
        swap(arr, i-1, i);
        swapped = true;
      }
    }
    
  }
  
  return arr;
         
}

bubblesort([103, 45, 2, 1, 97, -4, 67]); 


function selectionSort(arr) {
  const swap = (arr, idx1, idx2) => ([arr[idx1], arr[idx2] = [arr[idx2], arr[idx1]]]);

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if(arr[lowest] > arr[j]) {
        lowest = j;
      }
    }
    if (i !== lowest) swap(arr, i, lowest);
  }

  return arr;
}

function insertionSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var currentVal = arr[i];
    for (var j = i - 1; j >= 0 && arr[j > currentVal]; j--) {
      arr[j + i] = arr[j];
    }
    arr[j+1] = currentVal;
    console.log(arr);
  }
}


// MERGE SORT - combine two randomly orderd arrays to get one fully sorted array
// Has the highest scale
function mergeSort(arr) {
    // take in a single, unsorted array as a parameter
    // split the array into two halves
    if(arr.length < 2) return arr; //Base line of this recursive function

    var middleIndex = Math.floor(arr.length/2);
    var firstHalf = arr.slice(0, middleIndex)
    var secondHalf = arr.slice(middleIndex); //middleIndex all the arr to the end of the array

    return merge(mergeSort(firstHalf), mergeSort(secondHalf)); //recursive case
}

// Compare the values of each array and move the element of lesser value into a final array each time until all of the elements...
//...from both arrays are in the final resulting array
function merge(array1, array2) {
    //takes in two sorted arrays as parameters
    // merges those sorted arrays into one sorted array
    // returns one sorted array

    // final array 
    var result = [];
    while(array1.length && array2.length){
        var minElement;
        if(array1[0] < array2[0]) minElement = array1.shift();
        else minElement = array2.shift();

        result.push(minElement);
    }

    // if there are remaining elements in any array
    if(array1.length) result = result.concat(array1);
    else result = result.concat(array2);

    return result;
}

// console.log(mergeSort([6000, 34, 203, 3, 746, 200, 984, -20, 198, 764, -40, 1, 9, 1, -101]));

// QUICK SORT
function pivot(arr, start=0, end=arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  }

  //Assuming pivot is first element
  let pivot = arr[start];
  let swapidx = start;

  for (let i = start + 1; i <= end; i++) {
    if(pivot > arr[i]) {
      swapidx++;
      swap(arr, swapidx, i);
    }
  }

  //swap the pivot from start - swapPoint
  swap(arr, start, swapidx);
  return swapidx;
}

function quickSort(arr, left = 0, right = arr.length-1){
  if(left < right){
    let pivotIndex = pivot(arr, left, right);
    // left
    quickSort(arr,left,pivotIndex-1);
    // right
    quickSort(arr, pivotIndex+1, right);
  }
  return arr;
}

quickSort([4,6,9,1,2,5]);


// Max Stock Profit - takes an array of prices as a parameter and returns the max possible profit of the day
// if no profit is possible, return -1
function maxStockProfit(pricesArr) {
    // takes in array of prices as parameter
    // returns the max possible profit of the day

    // maxProfit is set at -1 on default as it shows no profit gained
    var maxProfit = -1;
    var buyPrice = 0;
    var sellPrice = 0;

    var changeBuyPrice = true;

    // to determine the optimal buy price and the optimal sell price
    for (let i = 0; i < pricesArr.length; i++) {
        //set buyPrice variable === to current price of our prices array
        // Note if changeBuyPrice is true, then we want to buy
        if(changeBuyPrice) buyPrice = pricesArr[i];

        //set sellPrice to the next element in the array
        sellPrice = pricesArr[i + 1];

        if(sellPrice < buyPrice) {
            changeBuyPrice = true;
        }
        else {
            var tempProfit = sellPrice - buyPrice;
            if(tempProfit > maxProfit) maxProfit = tempProfit;

            // since our sell price is higher than our buy price, we do not want to buy rather we may want to sell
            // if we sell, then our maxProfit is calculated above;
            changeBuyPrice = false;
        }
    }

    // console.log(maxProfit);
    return maxProfit;
}

maxStockProfit([32, 46, 26, 38, 40, 48, 42]) //optimal buy price is 26 and sell price is 48, also our maxProfit is 22

// Note even though 56 comes before 26, our optimal sell price is still 48 since we started buying at 26
// Unless 56 comes after 26, then the optimal sell price will be 56 and our maxProfilt will be 30


// function reduced() {
//   var arr = [1, 2, 4, 6, 7]

//   return arr.reduce((a,b) => a + b, 0);
// }

// console.log(reduced());


// HOW TO WRITE FOR LOOP FOR OBJECTS

const data = {
  class: "syntax",
  dubbed: true,
  indexed: 23
}

// console.log(data["indexed"]); //remember this keys in the objects are strings...

for (element in data) {
  // console.log(element, data[element]);
}

function luckySeven(arr) {
  if(arr.length < 3) return 'not possible';
  for (var i = 0; i<= arr.length; i++){
    if((arr[i] + arr[i-1] + arr[i-2]) === 7){ 
      return true
    }
  }
  return false;
}

// console.log(luckySeven([1,2,0,5,1,5]))


// Simple Clock Angle
function simpleClockAngle(num) {

  // we got 6 because 360/60 = 6
  // 360 represents the full number of a degrees in a circle and
  // 60 is the number of minutes on a clock, so dividing these two numbers
  // gives us the number of degrees for one minute
  return 6 * num;

}

simpleClockAngle(15);


// SUM OF SEVERAL ARRAYS
function sum_array(arr) {
  // store our final answer
  var sum = 0;
  // loop through entire array
  for (var i = 0; i < arr.length; i++) {
    // loop through each inner array
    for (var j = 0; j < arr[i].length; j++) {
      // add this number to the current final sum
      sum += arr[i][j];
    }
  }
  
  return sum;
}

sum_array([[3, 2], [1], [4, 12]]);

// But with reduce

function sumArray(arr) {
  return arr.reduce((t, e) => t.concat(e)).reduce((t, e) => t + e)
}


// TEST DIVISORS OF THREE
// Problem
// You will be given 2 parameters: a low and high number. Your goal is to print all numbers between low and high, and for each of these numbers print whether or not the number is divisible by 3. If the number is divisible by 3, print the word "div3" directly after the number.

function TestDivisorsOfThree(low, high){
  var result = [];
  for (var i = low; i <= high; i++) {
      // store current number (print all numbers);
      result.push(i);

      // check if each now is divisible by 3
      if(i % 3){
        result.push('div3')
      }
  }

  return result;
};

// console.log(TestDivisorsOfThree(2, 19));




// ODDBALL SUM
// Problem
// Write a function called oddball_sum which takes in a list of numbers and returns the sum of all the odd elements. Try to solve with and without reduce function.

function oddball_sum(nums){
  var sum = 0;

  for (var i = 0; i < nums.length; i++){
    if(nums[i] % 2 !== 0) {
      sum+=nums[i]
    }
  }
  return sum;  

  // OR
  // function collectOddValues(arr) {
  //   let result = [];
  //   function helper(helperInput){
  //     if(helperInput.length === 0){
  //       return;
  //     }

  //     if(helperInput[0] % 2 !== 0){
  //       result.push(helperInput[0]);
  //     }
  //     helper(helperInput.slice(1));
  //   }
  //   helper(arr);

  //   return result;
  // }
}

// console.log(oddball_sum([1,3,4,5,7,8,9]));

// With reduce:
function oddball_summation(nums) {
  return nums.reduce(function(total, item){
  	if (item % 2 === 1) {
  		return total += item;
  	}
  	return total;
  });
}


// SUM OF ARRAY PLUS ONE
// Problem
// Write a function that takes an array of integers and returns the sum of the integers after adding 1 to each.

function sumArrayPlusOne(arr) {
  var arrNum = arr.length;
  for(var i = 0; i < arr.length; i++) {
    arrNum+=arr[i];
  }
  return arrNum;
}

// console.log(sumArrayPlusOne([1,2,4,5,7,8,9]))



// STRING ROTATION
// Problem
// Find out if a string is a rotation of another string. E.g. ABCD is a rotation of BCDA but not ACBD.

function stringRotation (a, b) {
  return a.length === b.length && (a + a).indexOf(b) > -1;
};


// REVERSING EACH WORD IN A SENTENCE
// Problem
// For example Welcome to this Javascript Guide! should be become emocleW ot siht tpircsavaJ !ediuG

function reverseEachWord(str){
  let strArr = str.split(" ");

  let reversedWordArr=[];

  
  strArr.forEach(word => {
    let reversedWord = '';
    for(var i = word.length - 1; i >= 0; i-- ){
      reversedWord+=word[i];
    }
    reversedWordArr.push(reversedWord);
  })

  return reversedWordArr.join(' ');
}

// console.log(reverseEachWord("This is an intelligent Scheme"));



// Implement enqueue and dequeue using only two stacks  
// Enqueue means to add an element, dequeue to remove an element.

var inputStack = []; // First stack
var outputStack = []; // Second stack

// For enqueue, just push the item into the first stack
function enqueue(stackInput, item) {
  return stackInput.push(item);
}

function dequeue(stackInput, stackOutput) {
  // Reverse the stack such that the first element of the output stack is the
  // last element of the input stack. After that, pop the top of the output to
  // get the first element that was ever pushed into the input stack
  if (stackOutput.length <= 0) {
    while(stackInput.length > 0) {
      var elementToOutput = stackInput.pop();
      stackOutput.push(elementToOutput);
    }
  }

  return stackOutput.pop();
}


// WRITE A MUL FUNCTION
// given out: console.log(mul(2)(3)(4)); = 24


//=> this refers to currying
function mul(x) {
  return function(y){
    return function(z) {
      return x * y * z;
    } 
  }
}

// console.log(mul(2)(3)(4));


// Example of a call back function
// function modifyArr (arr, callback) {
//   arr.push(10);

//   callback();
// }

// var arr = [1,2,3]
// modifyArr(arr, ()=> {
//   console.log('modified', arr)
// })


// Find the missing number in O(n) time  
// Problem
// Being told that an unsorted array contains (n - 1) of n consecutive numbers (where the bounds are defined), find the missing number in O(n) time
// The output of the function should be 8
var arrayOfIntegers = [2, 5, 1, 4, 9, 6, 3, 7];
var upperBound = 9;
var lowerBound = 1;

findMissingNumber(arrayOfIntegers, upperBound, lowerBound); // 8

function findMissingNumber(arrayOfIntegers, upperBound, lowerBound) {
  // Iterate through array to find the sum of the numbers
  var sumOfIntegers = 0;
  for (var i = 0; i < arrayOfIntegers.length; i++) {
    sumOfIntegers += arrayOfIntegers[i];
  }

  // Find theoretical sum of the consecutive numbers using a variation of Gauss Sum.
  // Formula: [(N * (N + 1)) / 2] - [(M * (M - 1)) / 2];
  // N is the upper bound and M is the lower bound

  upperLimitSum = (upperBound * (upperBound + 1)) / 2;
  lowerLimitSum = (lowerBound * (lowerBound - 1)) / 2;

  theoreticalSum = upperLimitSum - lowerLimitSum;

  return theoreticalSum - sumOfIntegers;
}


// Write a function that would allow you to do this?  

// Problem
// var addSix = createBase(6);
// addSix(10); // returns 16
// addSix(21); // returns 27

function createBase(baseNumber) {
  return function(N) {
    // we are referencing baseNumber here even though it was declared
    // outside of this function. Closures allow us to do this in JavaScript
    return baseNumber + N;
  }
}

var addSix = createBase(6);
addSix(10);
addSix(21);




//  Remove duplicates of an array and return an array of only unique elements  
function uniqueArray(arr) {
  // for ES6 
  Array.from(new Set(arr));


  // OR
  //ES6
  var hashmap = {};
  var unique = [];

  for(var i = 0; i < array.length; i++) {
    // If key returns undefined (unique), it is evaluated as false.
    if(!hashmap.hasOwnProperty(array[i])) {
      hashmap[array[i]] = 1;
      unique.push(array[i]);
    }
  }

  return unique;
}


// Determine overlapping numbers in ranges  

// Problem
// You will be given an array with 5 numbers. The first 2 numbers represent a range, and the next two numbers represent another range. The final number in the array is X. The goal of your program is to determine if both ranges overlap by at least X numbers. For example, in the array [4, 10, 2, 6, 3] the ranges 4 to 10 and 2 to 6 overlap by at least 3 numbers (4, 5, 6), so your program should return true. Solve with and without looping.
// If the array is [10, 20, 4, 14, 4] then the ranges are:
// 10 11 12 13 14 15 16 17 18 19 20
// 4 5 6 7 8 9 10 11 12 13 14
// These ranges overlap by at least 4 numbers, namely: 10, 11, 12, 13, 14 so your program should return true.

// Answer
// With loop:

function OverlappingRanges(arr) {

  // keep a count of how many numbers overlap
  var counter = 0;
  
  // loop through one of the ranges
  for (var i = arr[0]; i < arr[1]; i++) {

    // check if a number within the first range exists
    // in the second range
    if (i >= arr[2] && i <= arr[3]) { 
      counter += 1;
    }

  }
 
  // check if the numbers that overlap is equal to or greater
  // than the last number in the array
  return (counter >= arr[4]) ? true : false;
}

OverlappingRanges([4, 10, 2, 6, 3]); 


// Without loop:

function overlapping(input){
  var nums1 = listOfNums(input[0], input[1]);
  var nums2 = listOfNums(input[2], input[3]);
  var overlappingNum = 0;

  if(nums1[0] >= nums2[0] && nums1[0] <= nums2[1]){
    overlappingNum =  nums2[1] - nums1[0] + 1;
  } else {
    overlappingNum =  nums1[1] - nums2[0] + 1;
  }
  if(overlappingNum >= input[4]){
    return true;
  }
}

function listOfNums(a, b){
  var start = a;
  var end = b;
  if(a > b){
    start = b;
    end = a;
  }

  return [a, b];
}

var a = [4, 10, 2, 6, 3];
overlapping(a)


// TREE LEVEL ORDER PRINT

// Problem
// Given a binary tree of integers, print it in level order. The output will contain space between the numbers in the same level, and new line between different levels.
// Answer
function Root (root) {
// Doing a breadth first search using recursion.
(function walkLevel (children) {
  // Create a new queue for the next level.
  var queue = [],
      output;

  // Use the map function to easily join all the nodes together while pushing
  // it's children into the next level queue.
  output = children.map(function (node) {
    // Assuming the node has children stored in an array.
    queue = queue.concat(node.children || []);
    return node.value;
  }).join(' ');

  // Log the output at each level.
  console.log(output);

  // If the queue has values in it, recurse to the next level and walk
  // along it.
  queue.length && walkLevel(queue);
})([root]);
};


function gridTraveler(m,n, memo={}){
  const key = m + ',' + n;

  if(key in memo) return memo[key];
  if(m === 1 && n === 1) return 1;
  if(m === 0 && n === 0) return 0;

  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n-1, memo);
  return memo[key];
}


// Write a function 'canSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.
// The function should return a boolean indicating whether or not it is possible to generate the targetSum using numbers from the array.
// You may use an element of the array as many times as needed
// You may assume that all input numbers are nonnegative.
function canSum(targetSum, numbers, memo={}) { //almost same as luckySeven
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return true;
  if(targetSum < 0) return false;

  for (let num of numbers) {
    const remainder = targetSum - num;
    if(canSum(remainder, numbers, memo) === true) {
      memo[targetSum] = true;
      return true
    }
  }
  memo[targetSum] = false;
  return false;
}

// canSum(7, [5, 3, 4, 7]);


// Write a function 'howSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.
// The function should return an array containing any combination of elements that add up exactly the targetSum. if there is no combination that adds up to the targetSum, then return null.
// if there are multiple combinations possible, you may return any single one.

const howSum = (targetSum, numbers, memo={}) => {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers, memo);
    if(remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num];
      return memo[targetSum];
    }
  }
  memo[targetSum] = null;
  return null;
}

// console.log(howSum(7, [5, 3, 4, 7]));


// Write a function 'bestSum(targetSum, numbers)' that takes in a targetSum and an array of numbers as arguments.
// The function should return an array containing the shortest combination of numbers that add up to exactly the targetSum.
// if there is a tie for the shortest combination, you may return any one of the shortest.
const bestSum = (targetSum, numbers, memo={}) => {
  if(targetSum in memo) return memo[targetSum];
  if(targetSum === 0) return [];
  if(targetSum < 0) return null;

  let shortestCombination = null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderCombination = bestSum(remainder, numbers, memo);
    if(remainderCombination !== null) {
      const combination = [...remainderCombination, num];
      if(shortestCombination === null || combination.length < shortestCombination.length) {
        shortestCombination = combination
      }
    }
  }
  memo[targetSum] = shortestCombination;
  return shortestCombination;
}

// Write a function 'canConstruct(target, wordBank)' that accepts a target string and an array of strings.
// The function should return a boolean indicating whether or not the 'target' can be constructed by concatenating elements of the 'wordBank' array.
// You may reuse elements of 'wordBank' as many times as needed.

function canConstruct(target, wordBank, memo={}) {
  if(target in memo) return memo[target];
  if(target === '') return true;

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);
      if(canConstruct(suffix, wordBank, memo) === true) {
        memo[target] = true;
        return true;
      }
    }
  }

  memo[target] = false;
  return false;
}

// console.log(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // returns true
// console.log(canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // returns false



// Write a function 'countConstruct(target, wordBank)' that accepts a target string and an array of strings.
// The function should return the number of ways that the 'target' can be constructed by concatenating elements of the 'wordBank' array.
// You may reuse elements of 'wordBank' as many times as needed.

function countConstruct(target, wordBank, memo={}) {
  if(target in memo) return memo[target];
  if(target === '') return 1;

  let totalCount = 0;

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      const numWaysForRest = countConstruct(target.slice(word.length), wordBank, memo);
      totalCount += numWaysForRest;
    }
  }

  memo[target] = totalCount;
  return totalCount;
}

console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // returns 2
// console.log(countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])); // returns 1
// console.log(countConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])); // returns 0



// Write a function 'countConstruct(target, wordBank)' that accepts a target string and an array of strings.
// The function should return a 2D array containing "all the ways" that the 'target' can be constructed by concatenating elements of the 'wordBank' array.
// You may reuse elements of 'wordBank' as many times as needed.

function allConstruct(target, wordBank, memo={}) {
  if(target in memo) return memo[target];
  if(target === '') return [[]];

  let result = [];

  for(let word of wordBank) {
    if(target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);
      const suffixWays = allConstruct(suffix, wordBank, memo);
      const targetWays = suffixWays.map(way => [word, ...way]);
      result.push(...targetWays);
    }
  }

  memo[target] = result;
  return result;
}

console.log(countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])); // returns 2


// FREQUENCY ARRAY - every number in the first array is a double of another set of numbers in the second part of the array... 
// ORDER is not taken into account

function same(arr1, arr2) {
  if(arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for(let val of arr1) {
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
  }
  for(let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
  }
  for(let key in frequencyCounter1){
    if(!(key ** 2 in frequencyCounter2)){
      return false;
    }
    if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]){
      return false;
    }
  }
  return true;
}

// SUMZERO 
// Write a function called sumZero which accepts a sorted array of integers.
// The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.
function sumZero(arr) {
  let left = 0;
  let right = arr.length - 1;
  while(left < right) {
    let sum = arr[left] + arr[right];
    if(sum === 0){
      return [arr[left], arr[right]];
    }else if(sum > 0){
      right--;
    }else {
      left++;
    }
  }
}

console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 5]));


// COUNTING UNIQUE VALUES 
function countUniqueValues(arr) {
  if(arr.length === 0) return 0;
  var i = 0;
  for(var j = 1; j < arr.length; j++){
    if(arr[i] !== arr[j]){
      i++;
      arr[i] = arr[j]
    }
  }
  return i + 1;
}

countUniqueValues([1,2,2,5,7,7,99]);



// EXAMPLE USING SLIDING WINDOW
// Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array.
function maxSubarraySum(arr, num){
  let maxSum = 0;
  let tempSum = 0;
  if(arr.length < num) return null;
  for(let i = 0; i < num; i++){
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for(let i = num; i < arr.length; i++ ) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

maxSubarraySum([2,6,9,2,1,8,5,6,3], 3);