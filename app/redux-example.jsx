var redux = require('redux');

console.log(redux);

// Pure function
// same output using the same input no matter what
// takes inputs, then returns an output
// does not change the value of the inputs
// no side-effects
function add(a,b) {
    return a + b;
};

// impure functions

var a = 3;
function add(b) {
    return a + b;
}

var result;
function add(a,b) {
    result = a + b;
    return result;
}

function add(a,b) {
    return a + b + new Date().getSeconds();
}

var changeProp(obj) {
    
}

var res = changeProp({
    name: 'Jun'
});