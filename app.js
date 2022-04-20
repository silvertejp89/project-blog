//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

//Content for Home, About and Contact
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


//blog-post saved as variable? -yes. 
const posts = [];


const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Routes for the views
app.get("/", function (req, res) {
  res.render("home", {
    startingContent : homeStartingContent
    //startingContent: The variable name that is going to be passed over.
    //homeStartingContent: The data that is going to be passed over. 
  });
  console.log(posts);
})

//Node and express formatting: Same name for key and value (aboutContent)
app.get("/about", function(req, res) {
  res.render("about", {aboutContent:aboutContent})
})

app.get("/contact", function(req, res) {
  res.render("contact", {contactContent:contactContent})
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

//specifies what happens when a post-request is made to /compose
app.post("/compose", function(req, res) {
//Saving the form-inputs in an object. 
  const newPost = {
    title:req.body.postTitle, 
    content: req.body.postBody
  };
//Adding new post to global varable array "posts"
  posts.push(newPost);
  
  return res.redirect("/");
  
  // console.log(req.body.postTitle);
  //req.body to use body-parser to tap into the body, specifying the value "postTitle".
})

//specifies the port on which I want my app to listen.
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

//global variable "posts", an empty array. 
//Add new posts to array and redirect to home route, and then log the array with the posts