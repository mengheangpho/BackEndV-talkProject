// const IP= "192.168.88.19";
// const PORT = 3000;
// const URL = "http://" + IP + ":" + PORT ;
const URL = "https://v-talk-application.herokuapp.com"

//============== ALL A VARIABLE =============//

let startContainer = document.querySelector('.container-start');
const btn_login = document.querySelector('.login-btn');
const btn_signup = document.querySelector('.signup-btn');



//=================== ALL FUNTION ====================//

//=========== FUNTION GO TO LOGIN PAGE ===========//

function login(event){
    window.location.href = "login/index.html";
}

//======== FUNTION GO TO LOGIN PAGE =========//

function signin(event){
    window.location.href = "signin/index.html";

}

//================= ADD EVENTLISTENER ===============//
btn_login.addEventListener('click',login);
btn_signup.addEventListener('click',signin);

