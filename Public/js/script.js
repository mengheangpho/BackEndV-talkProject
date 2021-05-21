
const IP= "192.168.88.14";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;



// all variables...
let message = document.querySelector('.message')
let loguser = document.querySelector('#userlog');
let logpass = document.querySelector('#paslog');
let profilePicture = document.querySelector('#picture')
let profileName = document.querySelector('#name')

// signin variable
let signuser = document.querySelector('#usersign');
let signeemail = document.querySelector('#emailsign');
let signpass = document.querySelector('#passsign');
let signconfirm = document.querySelector('#conpasssign');
let messpass = document.querySelector('#messpass')
let signstatus = document.querySelector('#statusign');
let signradio = document.querySelectorAll('input[type="radio"]');
let user = {};
let users=[]

// login variable
let loguser = document.querySelector('#userlog');
let logpassword = document.querySelector('#passlog');


// container...
let startContainer = document.querySelector('.container-start');
let loginContainer = document.querySelector('.container-login');
let signinContainer = document.querySelector('.container-signup');
let profileContainer = document.querySelector('.profileContainer')
let profileButoom = document.querySelector('.profileButtom');


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
    user.password = signconfirm.value;
    for(radio of signradio){
        if(radio.checked){
            user.gender = radio.value
        }
    }
    if((user.name!=="" && user.email !=="" && user.status !=="" && user.password !="" )&&(signpass.value === signconfirm.value)){
        signinContainer.style.display="none";
        message.textContent="Sign In sucessfully ";
        message.style.display="block"
        // settimeout ....
        setTimeout(function(){ 
        message.textContent="";
        message.display="none";
        displayprofile(user);}
        , 1000);
    }
    else if(signpass.value !== signconfirm.value){
        signconfirm.style.marginBottom ='0px';
        messpass.style.display='block'
        messpass.textContent="In valid Password"

    }
    else{
        alert("please fill in your info.")

    }
    // console.log(user)
}
function displayprofile(user){
    // console.log(users)
    profileContainer.style.display="block"
    let gender = user.gender;
    profilePicture.src="image/"+gender+".png";
    profileName.textContent = user.name;
    for(user of users){
        displayusers(user)
    }

}
function displayusers(user){
    let div = document.createElement('div');
    div.className= "oneuser";
    let img = document.createElement('img');
    img.id="userpicture";
    img.src="image/"+user.gender+".png";
    let span = document.createElement('span');
    span.id = "username";
    span.textContent = user.name;
    div.appendChild(img);
    div.appendChild(span)
    profileButoom.appendChild(div)

}
btn_login.addEventListener('click',login);
btn_signup.addEventListener('click',signin);
loginbtn.addEventListener('click',bylogin)
signinbtn.addEventListener('click',bysignin)
for(back of backbtn){
    back.addEventListener('click',backtostart);
};
