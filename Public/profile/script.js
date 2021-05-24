
const IP= "192.168.88.21";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;
// let fs = require('fs')

// variable
let profilePicture = document.querySelector('#picture')
let profileName = document.querySelector('#name')
let profileContainer = document.querySelector('.profileContainer');
let profileButoom = document.querySelector('.profileButtom');
let backtologin = document.querySelector('.logout');
let username = JSON.parse(localStorage.getItem('username'))
let object = {name:username};
let users=[]
// axios
axios.get(URL+"/users").then(response =>{
    users = response.data;
    for(user of users){
        if(user.name!= username){
            displayusers(user)
        }
    }
})
axios.post(URL+"/localname",object).then(response =>{
    displayprofile(response.data)
})
// function
function displayprofile(user){
    profileContainer.style.display="block"
    let gender = user.gender;
    profilePicture.src="../image/"+gender+".png";
    profileName.textContent = user.name;
    
}
function displayusers(user){
    let div = document.createElement('div');
    div.id= "oneuser";
    div.className=user.name;
    let img = document.createElement('img');
    img.id="userpicture";
    img.className=user.name;
    img.src="../image/"+user.gender+".png";
    let span = document.createElement('span');
    span.id = "username";
    span.textContent = user.name;
    div.appendChild(img);
    div.appendChild(span)
    profileButoom.appendChild(div)
}
function logout(event){
    window.location.href = "../index.html";
}
function tochat(event){
    let click = event.target.className;
    object = {
        name:click
    }
    axios.post('/userchat',object).then(response =>{
        console.log(response.data)
    })
    window.location.href = "../userchat/index.html";
}
// addEventListener
backtologin.addEventListener('click',logout)
profileButoom.addEventListener("click",tochat)

