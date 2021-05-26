const IP= "192.168.88.30";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
const backbtn = document.querySelector('.backtostart')
const signinbtn = document.querySelector('.sign-submit');
let signinContainer = document.querySelector('.container-signup');
let signuser = document.querySelector('#usersign');
let signeemail = document.querySelector('#emailsign');
let signpass = document.querySelector('#passsign');
let signconfirm = document.querySelector('#conpasssign');
let messpass = document.querySelector('#messpass')
let message = document.querySelector('.message')
let signstatus = document.querySelector('#statusign');
let signradio = document.querySelectorAll('input[type="radio"]');
let user={};
// function
function backtostart(event){
    window.location.href = "../index.html";
}
function bysignin(event){
    event.preventDefault()
    localStorage.setItem('username',JSON.stringify(signuser.value));
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
        message.textContent="Sign In Sucessfully ";
        message.style.display="block"
        // settimeout ....
        setTimeout(function(){ 
        message.textContent="";
        message.display="none";
        window.location.href = "../profile/index.html";
        axios.post(URL+"/user",user)
    }
        , 1000);
    }
    else if(signpass.value !== signconfirm.value){
        signconfirm.style.marginBottom ='0px';
        messpass.style.display='block'
        messpass.textContent="In valid Password"
    }
    else{
        alert("please fill  in your info.")
    }
    // fs.writeFileSync('user.json',user)
    // let username= localStorage.getItem('username')
}


// addEventListener
backbtn.addEventListener('click',backtostart);
signinbtn.addEventListener('click',bysignin)


// axios