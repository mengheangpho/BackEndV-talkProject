
const IP= "192.168.88.30";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
let loginContainer = document.querySelector('.container-login');
const backbtn = document.querySelector('.backtostart')
const loginbtn = document.querySelector('.log-submit');
let loguser = document.querySelector('#userlog');
let logpassword = document.querySelector('#passlog');
let loginmessange = document.querySelector('.loginmessange')
let message = document.querySelector('.message')

localStorage.setItem('username',loguser.value)

// function
function backtostart(event){
    window.location.href = "../index.html";
}

function bylogin(event){
    event.preventDefault()
    let user={
        "username":loguser.value,
        "password":logpassword.value
    }
    localStorage.setItem('username',JSON.stringify(loguser.value));
    // axios
    axios.put("/login",user).then(response =>{
        let isValid = response.data
        if(isValid){
        loginContainer.style.display="none";
        message.textContent = "Log In Sucessfully"
        message.style.display="block"
        // setTimeout 
        setTimeout(function(){
            event.preventDefault()
            message.textContent = "";
            message.display = "none";
            window.location.href = "../profile/index.html";
        },1000);
        }
        else{
            logpassword.style.marginBottom = "0px";
            loginmessange.style.marginBottom = "22px"
            loginmessange.style.marginLeft = "43px"
            loginmessange.style.display="block";
            loginmessange.textContent = "Username or Password is in valid!!";
            loginmessange.style.color="red";
        }
    })
}

// addEventListener
loginbtn.addEventListener('click',bylogin)
backbtn.addEventListener('click',backtostart);

