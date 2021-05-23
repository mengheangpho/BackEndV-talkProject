const IP= "192.168.88.14";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
let loginContainer = document.querySelector('.container-login');
const backbtn = document.querySelectorAll('.backtostart')
const loginbtn = document.querySelector('.log-submit');
let loguser = document.querySelector('#userlog');
let logpassword = document.querySelector('#passlog');



// function
function backtostart(event){
    signinContainer.style.display="none";
    loginContainer.style.display="none";
    startContainer.style.display="block";
}

function bylogin(event){
    loginContainer.style.display="none";

    
}

// addEventListener
loginbtn.addEventListener('click',bylogin)
backbtn.addEventListener('click',backtostart);


// axios