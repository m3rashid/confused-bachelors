const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res) {

var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

var data = {
  members:[
    {
      email_address: email,
      status:"subscribed",
      merge_fields: {
        FNAME:firstName,
        LNAME:lastName
      }
    }
  ]
};

var jsonData = JSON.stringify(data);

var options = {
  url:"https://us6.api.mailchimp.com/3.0/lists/6db1a9952f",
  method: "POST",
  headers: {
    "Authorization": "saquibali7 ee5b582973b1589c99791770757d5a18-us6"
  },
  body: jsonData
};

request(options, function(error, response, body) {
  if (error) {
    res.sendFile(__dirname + "/failure.html");
  } if(response.statusCode == 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
});


});

app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function() {
  console.log("server os running at port 3000");
});

// ee5b582973b1589c99791770757d5a18-us6
// 6db1a9952f
