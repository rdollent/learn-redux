const redux = require('redux');

const stateDefault = {
    searchText: '', 
    showCompleted: false, 
    todos: [] 
}

const reducer = (state = stateDefault, action) => {
    return state
}

const store = redux.createStore(reducer);

let currentState = store.getState();

console.log('currentState', currentState);