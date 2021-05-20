// all variables 


// container 
let startContainer = document.querySelector('.container-start');
let loginContainer = document.querySelector('.container-login');
let signinContainer = document.querySelector('.container-signup')

let backbtn = document.querySelectorAll('.backtostart')
// variable of button 
const btn_login = document.querySelector('.login-btn');
const btn_signup = document.querySelector('.singup-btn')
function login(event){
    startContainer.style.display="none";
    loginContainer.style.display="block"
}
function signin(event){
    startContainer.style.display="none";
    signinContainer.style.display="block"
}

function backtostart(event){
    console.log('yes')
    signinContainer.style.display="none"
    loginContainer.style.display="none"
    startContainer.style.display="block"
}

btn_login.addEventListener('click',login)


btn_signup.addEventListener('click',signin)
for(back of backbtn){
    back.addEventListener('click',backtostart);
};
