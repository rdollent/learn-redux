var React = require("react");
var ReactDOM = require("react-dom");

// object destructuring
var {Route, Router, IndexRoute, hashHistory} = require("react-router");



// load foundation
// old css versionW--- require("style!css!foundation-sites/dist/foundation.min.css");

// require does not know how to load css. use css! loader
$(document).foundation();


// app css
// comment this out for webpack to work
require("style!css!sass!applicationStyles");
// require('applicationStyles');

// ReactDOM.render(
//     <p>Boilerplate3</p>,
//     document.querySelector("#app")
// );

require('./redux-example.jsx');
// require('./redux-todo-example.jsx');


