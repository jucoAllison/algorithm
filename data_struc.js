// LINKED LIST
// indexes are not worked with
// unique values are not needed
// every element knows about the next element

class LinkedList {
  constructor() {
    this.head = null; //first element of the list
    this.tail = null; //last element of the list
  }

  // adding a value at the end of the list
  append(value) {
    const newNode = { value: value, next: null };

    if (this.tail) {
      this.tail.next = newNode; // update the old tail or add element to the list and move the old tail inside
    }
    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }
  }

  // adding a value at the beginning of the list
  prepend(value) {
    const newNode = { value: value, next: this.head };

    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }
  }

  //insert value and specify which value it is inserted after
  insertAfter(value, afterValue) {
      const existingNode = this.find(afterValue);

      if(existingNode) {
        const newNode = { value: value, next: existingNode.next };
        existingNode.next = newNode;
      }
  }

  // find a value = first occurence
  find(value) {
    if (!this.head) {
      return null;
    }

    let curNode = this.head;

    while (curNode) {
        if(curNode.value === value) {
            return curNode;
        }
        curNode = curNode.next;
    }

    return null;
  }

  // delete an element
  delete(value) {
    if (!this.head) {
      return;
    }

    // if it is the first value to delete
    while (this.head && this.head.value === value) {
      this.head = this.head.next;
    }

    let curNode = this.head;

    while (curNode.next) {
      if (curNode.next.value === value) {
        curNode.next = curNode.next.next;
      } else {
        curNode = curNode.next;
      }
    }

    // if it is the last value that we want to delete
    if (this.tail.value === value) {
      this.tail = curNode;
    }
  }

  // convert the list to an array
  toArray() {
    const elements = [];

    let curNode = this.head;
    while (curNode) {
      elements.push(curNode);
      curNode = curNode.next;
    }

    return elements;
  }
}

const linkedList1 = new LinkedList();
linkedList1.append(1);
linkedList1.append("uncle");
linkedList1.append("truthy");
linkedList1.append(16.34);
linkedList1.append(true);

linkedList1.prepend("First value");
linkedList1.prepend("First value");

console.log(linkedList1.toArray());

linkedList1.delete("truthy");
linkedList1.delete("First value");
linkedList1.delete(true);

console.log(linkedList1.toArray());
console.log(linkedList1.find('uncle'))

linkedList1.insertAfter('new value - 1', 1);
linkedList1.insertAfter('new value - 2', 'uncle');


// Academind algorithm

function sumNumbers(array) {
    let result = 0; //1

    for(var i = 0; i < array.length; i++) { //1
        console.log(i); //3 => n
        result+=array[i];// 3 => n
    }
    return result; // 1

    // OR

    // for(const number in array) {
    //     return result += number
    // }

    // OR

    // return array.reduce((sum, curNum)=> sum + curNum, 0);
}

// BIG O - Notation

//T = 1 + 1 + 1 + n + n = 3 + 2n => 3 + 2*n

//find fastest growing number = n * 2

// removed the constants, 3 and 2

//T = n => O(n) => Linear time complexity

// console.log(sumNumbers([1,3,10]));



// HAS NOTHING TO DO WITH THE DATA STRUCTURE WORKS ABOVE

// function areTheNumbersAlmostEqual(num1, num2) {
// 	return Math.abs( num1 - num2 ) < Number.EPSILON;
// }
// console.log(areTheNumbersAlmostEqual(0.1 + 0.2, 0.3));


// Write a sum method which will work properly when invoked using either syntax below.

// console.log(sum(2,3));   // Outputs 5
// console.log(sum(2)(3));  // Outputs 5
function addSum(x) {
    if (arguments.length == 2) { //in javascript, functions provide access to the argument object
      return arguments[0] + arguments[1];
    } else {
      return function(y) { return x + y; };
    }
  }


//   OR

function sum(x, y){
    if (y !== undefined) {
        return x + y;
    }else {
        return function(y) {return x + y; };
    }
}

// console.log(addSum(2)(3)); //or addSum(2, 3) still returns 5
// console.log(sum(2,3)); //or sum(2)(3) still returns 5


// var globalVar = 5;

// function curry (x) {
//     return function(y) {// A CLOSURE
//         return x + y + globalVar;
//     }
// }

// console.log(curry(2)(3));


// Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

// The arguments to the function should be:

// a DOM element
// a callback function (that takes a DOM element as its argument)
// Hide answer
// Visiting all elements in a tree (DOM) is a classic Depth-First-Search algorithm application. Here’s an example solution:

function Traverse(p_element,p_callback) {
   p_callback(p_element);
   var list = p_element.children;
   for (var i = 0; i < list.length; i++) {
       Traverse(list[i],p_callback);  // recursive call
   }
}

var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl (); // returns undefined because on norms, any var called locally is hoisted to its function/global scope, here Javascript initialization is not hoisted. The reason is that when the function is executed, it checks that there’s a local x variable present but doesn’t yet declare it, so it won’t look for global one.


(function () {
    // var x, y; hoisted outside the try/catch block...
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2; //var is declared in a function so it is hoisted outside the try/catch block in the global scope or function they are called in...
        console.log(x);
    }
    console.log(x);// x is declared but undefined after hoisting... so x is undefined
    console.log(y);// since y is declared in the func after hoisting... y = 2
})(); // returns 1, undefined, 2



// for (let i = 0; i < 5; i++) {
//     setTimeout(function() { console.log(i); }, i * 1000 );
//   } //prints 0,1,2,3,4  but if we use var the for loop finishes running and set this to 5 at intervals





// console.log(1 < 2 < 3);  // this reads... 1 is less than 2 = true, now true becomes 1 and is 1 < 3? YES... so it returns true
// console.log(3 > 2 > 1); // this reads... 3 is greater than 2... so it returns true, now true becomes 1, is 1 > 1? NO, 1 == 1, so it returns false


var b = 1;
function outer(){
   	var b = 4
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer(); //returns 3... since it is a closure... variable instances are checked from local to global scope.


// IN integer(x), DETERMINE IF AN INTEGER IS A NUMBER WITHOUT USING EC6 SYNTAX (I.E. Number.isInteger(x))
function isInteger(x) { return (x ^ 0) === x; } 
// isInteger(5)


//HOW TO CLONE AN OBJECT
// var obj = {a: 1 ,b: 2, c: {age: 30}}
// var objclone = Object.assign({},obj);

// obj.c.age = 45 //immediately objclone.c.age will also become 45 since it is a clone

let obj = {
    a: 1,
    b: 2,
    c: {
        age: 30
    }
};

var objclone = Object.assign({},obj);
console.log('objclone: ', objclone);

obj.c.age = 45;
// console.log('After Change - obj: ', obj);           // 45 - This also changes
// console.log('After Change - objclone: ', objclone); // 45