// const { default: axios } = require("axios");
// const { response } = require("express");

const IP= "192.168.88.14";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;
// let fs = require('fs')

// variable
let profilePicture = document.querySelector('#picture')
let profileName = document.querySelector('#name')
let profileContainer = document.querySelector('.profileContainer');
let profileButoom = document.querySelector('.profileButtom');

// axios
axios.get(URL+"/users").then(response =>{
    let users = response.data;
    for(user of users){
        displayusers(user)
    }
})
axios.get(URL+"/user").then(response =>{
    // console.log(response.data)
    let user = response.data;
    // console.log(user)
    displayprofile(user)
})

// function
function displayprofile(user){
    // console.log(user)
    profileContainer.style.display="block"
    let gender = user.gender;
    profilePicture.src="../image/"+gender+".png";
    profileName.textContent = user.name;
    
}
function displayusers(user){
    let div = document.createElement('div');
    div.className= "oneuser";
    let img = document.createElement('img');
    img.id="userpicture";
    img.src="../image/"+user.gender+".png";
    let span = document.createElement('span');
    span.id = "username";
    span.textContent = user.name;
    div.appendChild(img);
    div.appendChild(span)
    profileButoom.appendChild(div)
}


// addEventListener

