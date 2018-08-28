function Node(val){
    this.next=null;
    this.value = val;
    this.prev =null;
}

function DoubleList(){
    this.head = new Node(null);
    this.tail = new Node(null);
    this.head.next = this.tail;
    this.tail.prev = this.head;    

    function getValuesFromArguments(args, skipFirst =false){
        let inputValues =[];
        var count = 0;
        for(let arg in args){
            if(skipFirst && count == 0){count++; continue;}
            var currArgument = args[arg];
            //console.log(cunrrArgument);
            if(Array.isArray(currArgument)){
                inputValues = inputValues.concat(currArgument);
            } else {
                inputValues.push(currArgument);
            }    
            count++;        
        }
        //console.log(inputValues);
        return inputValues;
    }

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

    DoubleList.prototype.insertBefore = function (afterVal, insValues) {
        let inputValues = getValuesFromArguments(insValues);
        for (let current = this.head.next; current != this.tail; current=current.next) {
            if(current.value == afterVal){
                //for (const val of inputValues) {
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
    
    DoubleList.prototype.remove = function () {
        let inputValues = getValuesFromArguments(arguments);       
            for (let current = this.head.next; current != this.tail; current=current.next) {
                if(inputValues.includes(current.value)){
                    current.prev.next = current.next;
                    current.next.prev = current.prev;
                }
            }     
    }

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

    DoubleList.prototype.removeAllOccurances = function () {
        let allOccurancesToBeDeleted = getValuesFromArguments(arguments,false);         
        for (let current = this.head.next; current != this.tail; current=current.next) {           
            if(allOccurancesToBeDeleted.includes(current.value)){
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }                               
        }     
    }

    DoubleList.prototype.removeAll = function () {
        this.head.next = this.tail;
        this.tail.prev = this.head;   
    }

    DoubleList.prototype.printForward = function () {
        for (let current = this.head.next; current != this.tail; current=current.next) {
            console.log(current.value);
        }
    }
    DoubleList.prototype.printBackward = function () {
        for (let current = this.tail.prev; current != this.head; current=current.prev) {
            console.log(current.value);
        }
    }

    DoubleList.prototype.removeFront = function () {
         this.head.next = this.head.next.next;
         this.head.next.next.prev = this.head;
    }

    DoubleList.prototype.removeBack = function () {
        this.tail.prev.prev.next = this.tail;
        this.tail.prev = this.tail.prev.prev;
   }

}

var list = new DoubleList();
list.addToBack(1);
list.addToBack(2,3,4);
list.addToBack([5,6,7]);
list.insertAfter(5,[10,20,2]);
list.insertBefore(10,[11,12,10]);
 //list.addToFront(10,20);
// list.addToBack(4);
// list.addToBack(5);
 list.printForward();
 console.log("****************************");
 //list.remove(10,[11,12]);

//  console.log("**************************** removeAll");
//  list.removeAll();
//  list.printForward();
console.log("**************************** ");
//list.removeAllOccurances(10,11,2);
// list.removeOccurance(10,1,2)
list.removeBack();
 list.printForward();
 //list.printBackward();
 console.log("**************************** ");
//list.removeAllOccurances(10,11,2);
// list.removeOccurance(10,1,2)
//list.removeFront();
list.removeBack();
 list.printForward();