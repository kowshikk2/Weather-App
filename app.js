const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.get("/",(req,response)=>{
   response.sendFile(__dirname+"/index.html") 
}) 

app.post("/",(req,response)=>{ 
    var query = req.body.cityName
    var key = "c13da50bf278c20c708ebfacd05c63c8"
    var units = "metric"
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ key +"&units=" + units
    https.get(url,(res)=>{
    console.log(res.statusCode)
    res.on("data",(data)=>{
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const icon =  "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
        response.write("<h1>The temperature in "+ query +" is "+temp+" celsius</h1>")
        response.write("<img src='"+ icon +"' />")
        response.send()
    })
})
})



app.listen(3000,()=>{
    console.log("Server is listening at port 3000")
})