
const IP= "192.168.88.24";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;
// let fs = require('fs')

// variable
let profilePicture = document.querySelector('#picture')
let profileName = document.querySelector('#name')
let profileContainer = document.querySelector('.profileContainer');
let profileButoom = document.querySelector('.profileButtom');
let username = JSON.stringify(localStorage.getItem('username'))
// axios
axios.get(URL+"/users").then(response =>{
    let users = response.data;
    for(user of users){
        displayusers(user)
    }
})
axios.post(URL+"/localname").then(response =>{
    let user = response.data;
    displayprofile(user)
})
// function
function displayprofile(user){
    console.log(user)
    // profileContainer.style.display="block"
    // let gender = user.gender;
    // profilePicture.src="../image/"+gender+".png";
    // profileName.textContent = user.name;
    
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

