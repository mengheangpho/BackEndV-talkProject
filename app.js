let fs = require('fs');
let express = require('express');
let axios = require('axios');
// const { json } = require('express');
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

app.post('/user',(req,res)=>{
        let user = req.body
        res.send(user);
        fs.writeFileSync("user.json",JSON.stringify(user));
        users.push(user)
        fs.writeFileSync('users.json',JSON.stringify(users))


})
app.get('/user',(req,res)=>{
    let userpro = JSON.parse(fs.readFileSync('user.json'));
    console.log(userpro)
    res.send(userpro)
})

// login part 

app.put('/login',(req,res)=>{
    let username=req.body.username;
    let password = req.body.password;
    isFound = false;
    for(user of users){
        if(user.name == username && user.password == password){
            isFound = true
            fs.writeFileSync("user.json",JSON.stringify(user))
        }
    }
    res.send(isFound)
})