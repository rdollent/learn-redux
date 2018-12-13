const redux = require('redux');
const axios = require('axios');

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

// unique hobby identifier
// 1st hobby will be 1
let nextHobbyId = 1;
let nextMovieId = 1;

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



// new reducer for multiple reducers

// reduce function for managing name
// state is now a string, since it only manages one part of the entire state (name, instead of name, hobbies, movies)

// action generators
// action generators take all the parameters you need to generate and action
// and returns the object
///////////////////////////////
const nameReducer = (state = 'Anonymous', action) => {
    switch(action.type) {
      case 'CHANGE_NAME':
        return action.name;
      default:
        return state;
    }
};

// action generator to change name
const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
        //the same as name: name
        
    };
};

/////////////////////////////////////////////////////////////
// default of hobbies state is an empty array
// hobbies reducer and action generators

const hobbiesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_HOBBY':
            return [
                ...state, // state here is just the hobbies array in state object
                {
                    id: nextHobbyId++,
                    hobby: action.hobby   
                }
            ];
        case 'REMOVE_HOBBY':
            return state.filter((hobby) => hobby.id !== action.id);
        default:
            return state;
    }
};

// action generator to add hobby and for use with dispatch
const addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    };
};

// action generator to remove hobby
const removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    };
};


////////////////////////////////////////////////////
// movie reducer and action generator
//

const moviesReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_MOVIE':
            return [
                ...state,
                {
                    id: nextMovieId++,
                    title: action.title,
                    genre: action.genre
                }
            ];
        case 'REMOVE_MOVIE':
            return state.filter((movie) => movie.id !== action.id);
        default:
            return state;
    }
};

/// 
// action generator for ADD_MOVIE
const addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        // equivalent to title: title
        genre
    };
};

// action generator to remove hobby
const removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    };
};



/// map reducer and action generators
// status of fetching location only
const mapReducer = (state = {isFetching: false, url: undefined}, action) => {
    switch(action.type) {
        case 'START_LOCATION_FETCH':
            return {
                isFetching: true,
                url: undefined
            };
        case 'COMPLETE_LOCATION_FETCH':
            return {
                isFetching: false,
                url: action.url
            };
        default:
            return state;
    }
};

const startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    };
};

const completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};


// reducer for fetching location
const fetchLocation = () => {
  store.dispatch(startLocationFetch());
  
  // use axios for xmlhttprequests
  axios.get('https://ipinfo.io').then((res) => {
      // json response in data. we need loc property
      let loc = res.data.loc;
      let baseUrl = 'https://maps.google.com?q=';
      
      store.dispatch(completeLocationFetch(baseUrl + loc));
      
  });
};


// argument is a set of key-value pairs
// represents item and state you want this reducer to manage
// state: reducer function
// e.g. the name state will be managed by nameReducer
const reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: moviesReducer,
    map: mapReducer
});

// 2nd argument lets you configure which store you wanna use
// for middleware functions we wanna run through redux
// used for/by redux dev tools Chrome Extension
// if no extension, it takes the argument and passes it through
// (f) => { return f }

const store = redux.createStore(reducer, redux.compose(
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

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

fetchLocation();

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
store.dispatch(changeName('Jun'));



// add another dispatch just to check if subscribe button works
// store.dispatch({
//     type: 'CHANGE_NAME',
//     name: 'Emilyyyy'
// });

// or use action generator
store.dispatch(changeName('Emilyyyy'));

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
store.dispatch(addHobby('Running'));
store.dispatch(addHobby('Walking'));

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
store.dispatch(addMovie('Perfect Blue', 'Animation'));
store.dispatch(addMovie('Spring, Summer, Fall, Winter...and Spring', 'Drama'));

// remove arrays!
// store.dispatch({
//     type: 'REMOVE_HOBBY',
//     // what id corresponds to the hobby you want removed?
//     id: 2
// });
//
// or use action generator instead to remove hobby
store.dispatch(removeHobby(2));

// store.dispatch({
//     type: 'REMOVE_MOVIE',
//     id: 1
// })

// use action generator to remove movie
store.dispatch(removeMovie(1));