//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Apple wants a weekend or expensive dui want to decorate. Which is always the creator nor the duration of her life. Carrots carrots just been running a lot. Product lived in this. Financing yeast rice vegetarian or clinical portal. That they are not members, nor members of the Donec ultrices tincidunt arcu. A lot of television targeted at the undergraduate nutrition. Of life, and the mountains shall be born, ultricies quis, congue in magnis dis parturient. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. The founder of basketball and football propaganda graduated drink at the arc. Performance skirt smile at any hate for hate vulputate. Running a lot of television targeted at the undergraduate nutrition.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// Load the full build.
const _ = require('lodash');


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

let data = [];

app.get("/", (req, res) => {

  res.render(__dirname + '/views/home.ejs', {
    starthome: homeStartingContent,
    posts: data
  });
});


// app.get("/home", (req, res) => {

//   res.render(__dirname + '/views/home.ejs', {
//     starthome: homeStartingContent,
//     posts: data
//   });

//   // console.log(data);
// })



app.get("/about", (req, res) => {

  res.render(__dirname + '/views/about.ejs', {
    startabout: aboutContent
  });
})



app.get("/contact", (req, res) => {

  res.render(__dirname + '/views/contact.ejs', {
    startcontact: contactContent
  });
})




app.get("/compose", (req, res) => {

  res.render(__dirname + '/views/compose.ejs', {

  });
})


app.post("/compose", (req, res) => {
  const collectData = {
  profileData: req.body.titleItem,
  composedData: req.body.postItem
  };
  // console.log("Title: " + profileData);
  // console.log("Post: " + composedData);
  // console.log(collectData.profileData);
  // data = [];
  data.push(collectData);

  res.redirect("/")
});


app.get("/posts/:postName", (req,res)=>{
  const reqTitle = _.lowerCase(req.params.postName);

  data.forEach(function(collectData){
    const storedTitle = _.lowerCase(collectData.profileData);

    if(storedTitle === reqTitle){
      res.render("post", {
        title: collectData.profileData,
        content: collectData.composedData
      });
    }
    
  });
}); 





app.listen(3000, function () {
  console.log("Server started on port 3000");
});