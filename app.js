let fs = require('fs');
let express = require('express');
let axios = require('axios')
let app=express();
let PORT = 3000;
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
app.listen((process.env.PORT) || PORT,()=>{
    console.log("Server is running on port "+PORT)
})
// read file users.json

let users = JSON.parse(fs.readFileSync('users.json'));

// send data users to front end 

app.get("/users",(req,res)=>{
    res.send(users)
})


