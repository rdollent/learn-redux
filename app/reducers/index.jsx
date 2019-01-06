

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
export const nameReducer = (state = 'Anonymous', action) => {
    switch(action.type) {
      case 'CHANGE_NAME':
        return action.name;
      default:
        return state;
    }
};

/////////////////////////////////////////////////////////////
// default of hobbies state is an empty array
// hobbies reducer and action generators

export const hobbiesReducer = (state = [], action) => {
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

////////////////////////////////////////////////////
// movie reducer and action generator
//

export const moviesReducer = (state = [], action) => {
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


// map reducer

export const mapReducer = (state = { isFetching: false, url: undefined }, action) => {
    switch(action.type) {
        case 'START_LOCATION_FETCH':
         return {
            isFetching: true,
            url: undefined
         }
        case 'COMPLETE_LOCATION_FETCH':
         return {
            isFetching: false,
            url: action.url
         }
        default:
         return state;
    };

};