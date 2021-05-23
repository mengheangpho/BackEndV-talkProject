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
let username = "";
// send data users to front end 

app.get("/users",(req,res)=>{
    res.send(users)
})

app.post('/locolname',(req,res)=>{
    username = req.body;
    console.log(username+"yes")
})

app.post('/user',(req,res)=>{
        let user = req.body
        res.send(user);
        let username = user.name;
        fs.writeFileSync(username+".json",JSON.stringify(user));
        console.log(users != [])
        if (users != []){
            for(oneuser of users){
                if (oneuser.name != user.name){
                    users.push(user)
                    fs.writeFileSync('users.json',JSON.stringify(users))
                }
            }
        }
        else{
            users.push(user)
            fs.writeFileSync('users.json',JSON.stringify(users))
        }
        


})
app.get('/user',(req,res)=>{
    console.log(username)
    // let userpro = JSON.parse(fs.readFileSync(username+'.json'));
    // console.log(userpro)
    // res.send(userpro)
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