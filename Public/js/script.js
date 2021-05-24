const IP= "192.168.88.21";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
let startContainer = document.querySelector('.container-start');
const btn_login = document.querySelector('.login-btn');
const btn_signup = document.querySelector('.singup-btn');



// function
function login(event){
    window.location.href = "login/index.html";
}
function signin(event){
    window.location.href = "signin/index.html";

}


// addEventListener
btn_login.addEventListener('click',login);
btn_signup.addEventListener('click',signin);


// axios