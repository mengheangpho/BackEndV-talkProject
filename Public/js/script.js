
const IP= "192.168.88.14";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;



// all variables...
let message = document.querySelector('.message')
let loguser = document.querySelector('#userlog');
let logpass = document.querySelector('#paslog');
let profilePicture = document.querySelector('#profilepicture')
let profileName = document.querySelector('#name')

// sign variable
let signuser = document.querySelector('#usersign');
let signeemail = document.querySelector('#emailsign');
let signpass = document.querySelector('#passsign');
let signconfirm = document.querySelector('#conpasssign');
let messpass = document.querySelector('#messpass')
let signstatus = document.querySelector('#statusign');
let signradio = document.querySelectorAll('input[type="radio"]');
let user = {};
let users=[]


// container...
let startContainer = document.querySelector('.container-start');
let loginContainer = document.querySelector('.container-login');
let signinContainer = document.querySelector('.container-signup');
let profileContainer = document.querySelector('.profileContainer')


// variable of button...
const backbtn = document.querySelectorAll('.backtostart')
const btn_login = document.querySelector('.login-btn');
const btn_signup = document.querySelector('.singup-btn');
const loginbtn = document.querySelector('.log-submit');
const signinbtn = document.querySelector('.sign-submit');

axios.get(URL+"/users").then(response =>{
    users = response.data;
})

















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
    user.name = signuser.value;
    user.email = signeemail.value;
    user.status = signstatus.value;
    for(radio of signradio){
        if(radio.checked){
            user.gender = radio.value
        }
    }
    if(signpass.value !== signconfirm.value ){
        signconfirm.style.marginBottom ='0px';
        messpass.style.display='block'
        messpass.textContent="In valid Password"
    }
    else{
        user.password = signconfirm.value;
        signinContainer.style.display="none";
        message.textContent="Sign In sucessfully ";
        message.style.display="block"
        // settimeout ....
        setTimeout(function(){ 
        message.textContent="";
        message.display="none";
        displayuser(user);}
        , 1000);
    };
    // console.log(user)
}
function displayuser(user){
    // console.log(users)
    profileContainer.style.display="block"
    let gender = user.gender;
    profilePicture.src="image/"+gender+".png";
    profileName.textContent = user.name;
    console.log(users)

}
btn_login.addEventListener('click',login);
btn_signup.addEventListener('click',signin);
loginbtn.addEventListener('click',bylogin)
signinbtn.addEventListener('click',bysignin)
for(back of backbtn){
    back.addEventListener('click',backtostart);
};
