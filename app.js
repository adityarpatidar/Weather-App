const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req,res){
  console.log(req.body.cityName);
  const city = req.body.cityName;
  const apiKey = "59b6afb835526e89516d07562b6fa128";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +city + "&appid=" + apiKey + "&units=metric";
  https.get(url , function(response){

   response.on("data" , function(data){
     const weatherData = JSON.parse(data);
     const temp = weatherData.main.temp;
     const weatherDescription = weatherData.weather[0].description;
     const icon = weatherData.weather[0].icon;
     const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
     res.write("<h1>Current Temprature is " + temp + "  degree Celcius</p>");
     res.write("<p><em>The weather is currently </em>" + weatherDescription + " </p>");
     res.write("<img src="+ imageURL +">");
     res.end();
   });
  });
  //res.end();
});



app.listen(3000,function(){
  console.log("server has started");
})
