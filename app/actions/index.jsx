



// action generator to change name
export const changeName = (name) => {
    return {
        type: 'CHANGE_NAME',
        name
        //the same as name: name
        
    };
};



// action generator to add hobby and for use with dispatch
export const addHobby = (hobby) => {
    return {
        type: 'ADD_HOBBY',
        hobby
    };
};

// action generator to remove hobby
export const removeHobby = (id) => {
    return {
        type: 'REMOVE_HOBBY',
        id
    };
};


/// 
// action generator for ADD_MOVIE
export const addMovie = (title, genre) => {
    return {
        type: 'ADD_MOVIE',
        title,
        // equivalent to title: title
        genre
    };
};

// action generator to remove hobby
export const removeMovie = (id) => {
    return {
        type: 'REMOVE_MOVIE',
        id
    };
};




export const startLocationFetch = () => {
    return {
        type: 'START_LOCATION_FETCH'
    };
};

export const completeLocationFetch = (url) => {
    return {
        type: 'COMPLETE_LOCATION_FETCH',
        url
    };
};


// reducer for fetching location
export const fetchLocation = () => {
  store.dispatch(startLocationFetch());
  
  // use axios for xmlhttprequests
  axios.get('https://ipinfo.io').then((res) => {
      // json response in data. we need loc property
      let loc = res.data.loc;
      let baseUrl = 'https://maps.google.com?q=';
      
      store.dispatch(completeLocationFetch(baseUrl + loc));
      
  });
};
