require('dotenv').config()
//express
const express = require('express')
//https
const https = require('https');
//body-parser
const bodyParser = require("body-parser");

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
})); //body parser
app.use(express.static("public"))


//Get route and https get request route
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")


});


app.post("/", function (req, res) {
    const NameCity = req.body.cityName;

    const query = req.body.cityName;
    const apiKey = process.env.SECRET_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=metric";
    https.get(url, function (results) {
        results.on("data", function (data) {
            const seenData = JSON.parse(data);
            const temperature = seenData.main.temp;
            const longitude = seenData.coord.lon;
            const latitude = seenData.coord.lat;
            const weatherDescription = seenData.weather[0].description;
            const Icon = seenData.weather[0].icon;
            const imageUrl = " http://openweathermap.org/img/wn/" + Icon + "@2x.png";


            res.setHeader("Content-Type", "text/html");
            res.write("<h4>The weather description of " + NameCity + " is " + weatherDescription + " and the temperature is " + temperature + " degree celcius. </h4>");
            res.write("<h4>The longitude of " + NameCity + " is " + longitude + " and the latitude is " + latitude + "</h4>");

            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
    })
})

app.listen(3000, function () {
    console.log("server is listening to port 3000")
})