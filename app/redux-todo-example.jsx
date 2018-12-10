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

const store = redux.createStore(reducer, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

// subscribe to changes
let unsubscribe = store.subscribe(() => {
    // logical thing is to check state whenever state changes
    let state = store.getState();
    
    console.log('new state is', state);
    document.getElementById('app').innerHTML = state.searchText;
});

let currentState = store.getState();

console.log('currentState', currentState);

let action = {
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'search everything!'
};

store.dispatch(action);

store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'change searchText #2!!!!'
});


store.dispatch({
    type: 'CHANGE_SEARCH_TEXT',
    searchText: 'change searchText a 3rd time~~'
});
