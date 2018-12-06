const redux = require('redux');

const stateDefault = {
    searchText: '', 
    showCompleted: false, 
    todos: [] 
};

const reducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'CHANGE_SEARCH_TEXT':
            return {
                ...state,
                searchText: action.searchText
            };
        default:
            return state;
    }
};

const store = redux.createStore(reducer);

let currentState = store.getState();

console.log('currentState', currentState);

let action = {
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'search everything!'
};

store.dispatch(action);

console.log(store.getState());