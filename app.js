let fs = require('fs');
let express = require('express');
let axios = require('axios');
let app=express();
let port = 3000;
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("Public"));
app.listen((process.env.PORT) || port,()=>{
    console.log("Server is running on port "+port)
})
// read file users.json
let users = JSON.parse(fs.readFileSync('users.json'));
let usersempty=(users=="")
let username = " "
// send data users to front end 

app.get("/users",(req,res)=>{
    res.send(users)
})

app.post('/localname',(req,res)=>{
    let localname = req.body.name;
    console.log(localname)
    let userpro = JSON.parse(fs.readFileSync(localname+'.json'));
    res.send(userpro)

})
app.post('/user',(req,res)=>{
        let user = req.body
        res.send(user);
         username = user.name;
        fs.writeFileSync(username+".json",JSON.stringify(user));
        let samename=false;
        for(oneuser of users){
            if (oneuser.name == user.name){
                samename = true
            }
        }
        if(usersempty){
            users.push(user)
            fs.writeFileSync('users.json',JSON.stringify(users))
        }
        else{
            if(!samename){
            users.push(user)
            fs.writeFileSync('users.json',JSON.stringify(users))
        }
    }
        
})
// login part 

app.put('/login',(req,res)=>{
    let username=req.body.username;
    let password = req.body.password;
    isFound = false;
    for(user of users){
        if(user.name == username && user.password == password){
            isFound = true
            // fs.writeFileSync("user.json",JSON.stringify(user))
        }
    }
    res.send(isFound)
})
// let userdata = {};
app.post('/userchat',(req,res)=>{
    res.send('received')
    let username = req.body.name
    userdata = JSON.parse(fs.readFileSync(username+".json"))
    console.log(userdata)
    app.get('/userdata',(req,res)=>
    res.send(userdata))
})


// Send and receive data

let userTexted = JSON.parse(fs.readFileSync('datausers.json'));
app.post('/sendmessage',(req,res)=>{
  let amessage = req.body;
  console.log(amessage);
  userTexted.push(amessage);
  res.send(userTexted);
  fs.writeFileSync('datausers.json',JSON.stringify(userTexted));
})

app.get('/receivemessages',(req,res)=>{
  let allmessages = JSON.parse(fs.readFileSync('datausers.json'));
  res.send(allmessages);
})