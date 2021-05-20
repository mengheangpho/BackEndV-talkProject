// all variables...
let message = document.querySelector('.message')
let loguser = document.querySelector('#userlog');
let logpass = document.querySelector('#paslog');
let signuser = document.querySelector('#usersign');
let signeemail = document.querySelector('#emailsign');


// container...
let startContainer = document.querySelector('.container-start');
let loginContainer = document.querySelector('.container-login');
let signinContainer = document.querySelector('.container-signup');


// variable of button...
const backbtn = document.querySelectorAll('.backtostart')
const btn_login = document.querySelector('.login-btn');
const btn_signup = document.querySelector('.singup-btn');
const loginbtn = document.querySelector('.log-submit');
const signinbtn = document.querySelector('.sign-submit');

// function...
function login(event){
    startContainer.style.display="none";
    loginContainer.style.display="block";
}
function signin(event){
    startContainer.style.display="none";
    signinContainer.style.display="block";

}

function backtostart(event){
    signinContainer.style.display="none";
    loginContainer.style.display="none";
    startContainer.style.display="block";
}
function bylogin(event){
    loginContainer.style.display="none";
}
function bysignin(event){
    event.preventDefault()
    message.style.display="block"
    signinContainer.style.display="none";
    message.textContent="Sign In sucessfully ";
    // settimeout ....
    setTimeout(function(){ 
    message.textContent="";
    message.display="none";
    console.log('yes')
    }
    , 2000);
    

}
btn_login.addEventListener('click',login);
btn_signup.addEventListener('click',signin);
loginbtn.addEventListener('click',bylogin)
signinbtn.addEventListener('click',bysignin)
for(back of backbtn){
    back.addEventListener('click',backtostart);
};
