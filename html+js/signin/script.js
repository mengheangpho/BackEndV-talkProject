const IP= "192.168.88.14";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
const signinbtn = document.querySelector('.sign-submit');
let signinContainer = document.querySelector('.container-signup');
let signuser = document.querySelector('#usersign');
let signeemail = document.querySelector('#emailsign');
let signpass = document.querySelector('#passsign');
let signconfirm = document.querySelector('#conpasssign');
let messpass = document.querySelector('#messpass')
let signstatus = document.querySelector('#statusign');
let signradio = document.querySelectorAll('input[type="radio"]');
let user = {};
let users=[];

// function
function backtostart(event){
    signinContainer.style.display="none";
    loginContainer.style.display="none";
    startContainer.style.display="block";
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
}


// addEventListener
backbtn.addEventListener('click',backtostart);
signinbtn.addEventListener('click',bysignin)


// axios