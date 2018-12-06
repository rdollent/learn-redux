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

function changeProp(obj) {
    // instead of obj.name = 'Jen';
    // return obj
    // that is impure.
    // objects and arrays are passed by reference, thus changing the value of original data
    // we want immutability
    return {
        ...obj,
        name: 'Jen'
    };
}



var startingValue = {
     name: 'Jun',
     age: 29
};

var res = changeProp(startingValue);

console.log(startingValue, res);


//////////////////////////////////////////////////////
// redux!!!!
/////////////////////////////////////////

// pass previous state and action
// reducer will do something with it
// return the new state
let reducer = (state = {name: 'Anonymous'}, action) => {
    // need default if there is no state
    // syntax above is equivalent to this:
    // state = state || {name: 'Anonymous'};
    // meaning if no state was passed, use default value
    
    return state;
};


let store = redux.createStore(reducer);

// fetch the state
let currentState = store.getState();
console.log('currentState', currentState);