const redux = require('redux');


// actions variable
const actions = require('./actions/index');
const store = require('./store/configureStore').configure();

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


// const oldReducer = (state = stateDefault, action) => {
//     // need default if there is no state
//     // syntax above is equivalent to this:
//     // state = state || {name: 'Anonymous'};
//     // meaning if no state was passed, use default value
    
//     // console.log('new action', action);
    
//     switch (action.type) {
//         case 'CHANGE_NAME':
//             return {
//                 ...state,
//                 name: action.name
//             };
//         case 'ADD_HOBBY':
//             return {
//                 ...state,
//                 // es6 spread operator
//                 hobbies: [
//                     ...state.hobbies, 
//                     {
//                         id: nextHobbyId++,
//                         hobby: action.hobby   
//                     }
//                 ]
//             };
//         case 'ADD_MOVIE':
//             return {
//                 ...state,
//                 movies: [
//                     ...state.movies,
//                     {
//                         id: nextMovieId++,
//                         title: action.title,
//                         genre: action.genre
//                     }
//                 ]
//             };
//         case 'REMOVE_HOBBY':
//             return {
//                 ...state,
//                 hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
//             };
//         case 'REMOVE_MOVIE':
//             return {
//                 ...state,
//                 movies: state.movies.filter((movie) => movie.id !== action.id)
//             };
//         default:
//             return state;
//     }

// };





//subscibe to changes
// takes a callback that runs when the state changes
// use this instead of console logging all the time
// when you call subscribe, it actually returns a function
// this function, when called, will unsusbscribe you

let unsubscribe = store.subscribe(() => {
    // logical thing is to check state whenever state changes
    let state = store.getState();
    
    console.log('new state is', state);
    // document.getElementById('app').innerHTML = state.name;
    if(state.map.isFetching) {
        document.getElementById('app').innerHTML = 'Loading...';
    } else if(state.map.url) {
        document.getElementById('app').innerHTML = `<a href=${state.map.url} target="_blank">View Your Location</a>`;
    }
    
});

// test unsubscribe by calling it after first action dispatch
// unsubscribe();


// fetch the state
let currentState = store.getState();
console.log('currentState', currentState);

store.dispatch(actions.fetchLocation());

// use actions to change state
// no need to have any arguments except 'type'
// type typically is in uppercase, and uses underscore for whitespace
//
// let action = {
//     type: 'CHANGE_NAME',
//     name: 'Jun'
// };
//
// dispatch an action
// this will run the reducer function
//
// store.dispatch(action);

// or use action generator
store.dispatch(actions.changeName('Jun'));



// add another dispatch just to check if subscribe button works
// store.dispatch({
//     type: 'CHANGE_NAME',
//     name: 'Emilyyyy'
// });

// or use action generator
store.dispatch(actions.changeName('Emilyyyy'));

// hobby is an array but while dispatching we pass on a string
// use reducer to add this string to hobby array
// store.dispatch({
//     type: 'ADD_HOBBY',
//     hobby: 'Running'
// });

// store.dispatch({
//     type: 'ADD_HOBBY',
//     hobby: 'Walking'
// });

// use addHobby action generator instead
store.dispatch(actions.addHobby('Running'));
store.dispatch(actions.addHobby('Walking'));

// add movie
// store.dispatch({
//     type: 'ADD_MOVIE',
//     title: 'Perfect Blue',
//     genre: 'Animation'
// });

// // add another movie
// store.dispatch({
//     type: 'ADD_MOVIE',
//     title: 'Spring, Summer, Fall, Winter...and Spring',
//     genre: 'Drama'
// });

// use action generator to add movie instead
store.dispatch(actions.addMovie('Perfect Blue', 'Animation'));
store.dispatch(actions.addMovie('Spring, Summer, Fall, Winter...and Spring', 'Drama'));

// remove arrays!
// store.dispatch({
//     type: 'REMOVE_HOBBY',
//     // what id corresponds to the hobby you want removed?
//     id: 2
// });
//
// or use action generator instead to remove hobby
store.dispatch(actions.removeHobby(2));

// store.dispatch({
//     type: 'REMOVE_MOVIE',
//     id: 1
// })

// use action generator to remove movie
store.dispatch(actions.removeMovie(1));