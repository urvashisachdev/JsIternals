/*-----------------------------------------------------------------------------*
 * Project: SentinelDoubleLinkedList
 * File: homework.js
 * Author: Urvashi Sachdev (urvashi.sachdev@algorisys.com)
 *
 * Description:
 *
 * Revision History:
 * 2018-Aug-28: Initial Creation
 *
 * Copyright (c) free to use
 *----------------------------------------------------------------------------*/

 /**
 * Represents node of Linked List
 * Contains prev and next references and the value
 */
function Node(val){
    this.next=null;
    this.value = val;
    this.prev =null;
}

/**
 * define the DoubleList class using ES5 syntax of function
 * It contains
 * head - dummy head of the list
 * tail - dummy tail of the list
 *
 * and a set of prototype methods
 * addToBack
 * addToFront
 * insertBefore
 * insertAfter
 * remove
 * removeOccurance
 * removeAllOccurances
 * removeAll
 * removeFront
 * removeBack
 * printForward
 * printBackward
 */
function DoubleList(){
    /**
     * This is a sentinel list
     * Hence, the head and tail are dummy links.
     * The reason for this is that even if the list is empty, it has head/tail
     *
     * Due to head and tail always being preset, most of our operations become
     * simpler as we do not have to check for end condition like
     * head == null
     * tail == null
     * head == tail
     * etc.
     */
    this.head = new Node(null); //dummy head
    this.tail = new Node(null); //dummy tail

    //Initialise the list. Head is pointing to tail and tail is pointing to head.
    this.head.next = this.tail;
    this.tail.prev = this.head;    

    //This method is used to read the arguments and convert it into an array for further processing.
    //Arguments can be a signle element or elements comma separated or array of elements
    function getValuesFromArguments(args, skipFirst =false){
        let inputValues =[];
        var count = 0;
        for(let arg in args){
            if(skipFirst && count == 0){count++; continue;}
            var currArgument = args[arg];            
            if(Array.isArray(currArgument)){
                inputValues = inputValues.concat(currArgument);
            } else {
                inputValues.push(currArgument);
            }    
            count++;        
        }        
        return inputValues;
    }

    //This method adds the value/values at end of list.
    DoubleList.prototype.addToBack = function () {        
        let inputValues = getValuesFromArguments(arguments);
        for (const val of inputValues) {
             var newNode = new Node(val);
            newNode.next = this.tail;
            newNode.prev = this.tail.prev;
            this.tail.prev = newNode;
            newNode.prev.next = newNode;
        }       
    }

    //This method adds the value/values at front of list.
    DoubleList.prototype.addToFront = function () {
        let inputValues = getValuesFromArguments(arguments);
        for (const val of inputValues) {
            var newNode = new Node(val);
            newNode.next = this.head.next;
            newNode.prev = this.head;
            this.head.next = newNode;
            newNode.next.prev = newNode;
        }
    }

    //This method inserts elements after a particular value. 
    DoubleList.prototype.insertAfter = function (afterVal, insValues) {
        let inputValues = getValuesFromArguments(insValues);
        for (let current = this.head.next; current != this.tail; current=current.next) {
            if(current.value == afterVal){
                for (let index = inputValues.length -1; index >= 0; index--) {
                    let val =  inputValues[index];
                    var newNode = new Node(val);
                    newNode.prev = current;
                    newNode.next = current.next;
                    current.next = newNode;
                    newNode.next.prev = newNode;
                }
            }
        }
    }

    //This method inserts elements before a particular value. 
    DoubleList.prototype.insertBefore = function (afterVal, insValues) {
        let inputValues = getValuesFromArguments(insValues);
        for (let current = this.head.next; current != this.tail; current=current.next) {
            if(current.value == afterVal){               
                for (let index = inputValues.length -1; index >= 0; index--) {
                    let val =  inputValues[index];
                    var newNode = new Node(val);
                    newNode.next = current;
                    newNode.prev = current.prev;
                    current.prev = newNode;
                    newNode.prev.next = newNode;
                }                    
            }
        }
    }
    
    //This method removes elements mentioned in arguments. 
    DoubleList.prototype.remove = function () {
        let inputValues = getValuesFromArguments(arguments);       
            for (let current = this.head.next; current != this.tail; current=current.next) {
                if(inputValues.includes(current.value)){
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
            }     
    }

    //This method remove the element (1st parameter) from the occurances mentioned after it.
    //e.g.removeOccurance(5,1,2) --> Delete 5 which is at 1st and 2nd occurrance.
    DoubleList.prototype.removeOccurance = function () {
        let allOccurancesToBeDeleted = getValuesFromArguments(arguments,true);  
        var val =  arguments[0];
        let occuranceCount = 0;    
            for (let current = this.head.next; current != this.tail; current=current.next) {
                if(current.value == val){
                    occuranceCount++;
                    if(allOccurancesToBeDeleted.includes(occuranceCount)){
                        current.prev.next = current.next;
                        current.next.prev = current.prev;
                    }                    
                }
            }     
    }

    //This method remove all the occurances of elements (input parameter).
    DoubleList.prototype.removeAllOccurances = function () {
        let allOccurancesToBeDeleted = getValuesFromArguments(arguments,false);         
        for (let current = this.head.next; current != this.tail; current=current.next) {           
            if(allOccurancesToBeDeleted.includes(current.value)){
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }                               
        }     
    }

    //This is used to remoove all elements. Empty the list. Only dummy head and tail will be present in this case.
    DoubleList.prototype.removeAll = function () {
        this.head.next = this.tail;
        this.tail.prev = this.head;   
    }

    //This method is used to remove an element from front.
    DoubleList.prototype.removeFront = function () {
         this.head.next = this.head.next.next;
         this.head.next.next.prev = this.head;
    }

    //This method is used to remove an element from back.
    DoubleList.prototype.removeBack = function () {
        this.tail.prev.prev.next = this.tail;
        this.tail.prev = this.tail.prev.prev;
   }

   //This is used to print the elements from head to tail (in forward sequence).
   DoubleList.prototype.printForward = function () {
        for (let current = this.head.next; current != this.tail; current=current.next) {
            console.log(current.value);
        }
    }

    //This is used to print the elements from tail to head (in backward sequence).
    DoubleList.prototype.printBackward = function () {
        for (let current = this.tail.prev; current != this.head; current=current.prev) {
            console.log(current.value);
        }
    }


}

var list = new DoubleList();
console.log("**************************** Test addToBack and addToFront and printForward");
list.addToBack(1);
list.addToBack(2,3,4);
list.addToBack([5,6,7,2]);
list.addToFront(0);
list.addToFront([-1,-2]);
list.printForward();
console.log("**************************** Test print backward");
list.printBackward();
console.log("**************************** Test insertAfter list.insertAfter(5,[10,20,2])");
list.insertAfter(5,[10,20,2]);
list.printForward();
console.log("**************************** Test insertBefore list.insertBefore(10,[11,12]");
list.insertBefore(10,[11,12]);
list.printForward();
console.log("**************************** Test remove remove([11,12]");
list.remove([11,12]);
list.printForward();
console.log("**************************** Test removeOccurance list.removeOccurance(2,1,2)");
list.removeOccurance(2,1,2)
list.printForward();
console.log("**************************** Test removeBack");
list.removeBack();
list.printForward();
console.log("**************************** Test removeFront");
list.removeFront();
list.printForward();
console.log("**************************** Test removeAllOccurances list.removeAllOccurances(2,11,10)");
list.removeOccurance(2,1,2)
list.printForward();
console.log("**************************** Test removeAll");
list.removeAll()
list.printForward();