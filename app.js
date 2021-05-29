let fs = require('fs');
let express = require('express');
let axios = require('axios');
let app=express();
let port = 3000;

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static("public"));
app.listen((process.env.PORT) || port,()=>{
    console.log("Server is running on port "+port)
})

//============== ALL A VARIABLE ==================//

let users = JSON.parse(fs.readFileSync('users.json'));
let usersempty=(users=="")
let username = " "

//============= send data users to front end ==============//

app.get("/users",(req,res)=>{
    res.send(users)
})

//============ send the current user information to front end =================/

app.post('/localname',(req,res)=>{
    let localname = req.body.name;
    let userpro = JSON.parse(fs.readFileSync(localname+'.json'));
    res.send(userpro)
})

//================== create new users and add to list of users in users.json ==================//

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

//============= Login ( compare informatin that user input with users in users.json if have rend true else flase ) =================//

app.put('/login',(req,res)=>{
    let username=req.body.username;
    let password = req.body.password;
    isFound = false;
    for(user of users){
        if(user.name == username && user.password == password){
            isFound = true
        }
    }
    res.send(isFound)
})

//============== resspone the information for user ===============//

app.post('/userdata',(req,res)=>{
    let username =req.body.userpartner;
    let userdata = JSON.parse(fs.readFileSync(username+".json"));
    res.send(userdata)
} );


//================= Send and receive data from user input and add ot file datausers.json =====================//

let userTexted = JSON.parse(fs.readFileSync('datausers.json'));
app.post('/sendmessage',(req,res)=>{
  let onemessage = req.body;
  userTexted.push(onemessage);
  res.send(userTexted);
  fs.writeFileSync('datausers.json',JSON.stringify(userTexted));
})

//============= LOAD ALL SENT DATA BACK TO FORNT END ==================//

app.get('/receivemessages',(req,res)=>{
  let allmessages = JSON.parse(fs.readFileSync('datausers.json'));
  res.send(allmessages);
})

//============= EDIT DATA AND SEND BACK TO FORNT END ==================//

app.put("/editmessage",(req,res)=>{
    let index = req.body.index;
    let text = req.body.text;
    userTexted[index].text = text;
    res.send(userTexted);
    fs.writeFileSync('datausers.json',JSON.stringify(userTexted));
})

app.delete("/message/:index",(req,res)=>{
    let deleteIndex = req.params.index;
    userTexted.splice(deleteIndex,1);
    res.send(userTexted);
    fs.writeFileSync('datausers.json',JSON.stringify(userTexted));
})