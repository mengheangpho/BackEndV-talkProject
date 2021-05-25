// const { json } = require("express");


const IP= "192.168.88.21";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
let containChat = document.querySelector('.container');
let textChat = document.querySelector("#text-area");
let sendBtn = document.querySelector("#send-btn");
let partnername = document.querySelector('#partnername')
let quaot = document.querySelector('#quaot')
let backbtn = document.querySelector('#back')
let containchatarea = document.querySelector('.containchat-area');

// function
function backtoprofile(event){
  window.location.href = "../profile/index.html"
}
function displayUserPartner(){
axios.get('/userdata').then(response =>{
  partnername.textContent= response.data.name;
  quaot.textContent = response.data.status;
})
}
function sendMessage(){
    let currentUser = JSON.parse(localStorage.getItem('username'));
    let userText = {};
    let text = textChat.value;
    userText.user = currentUser;
    userText.text = text;
    if (textChat.value !== ""){
      axios.post('/sendmessage',userText);
    }
    textChat.value = "";
  }
  
function displayMessages(){
      // axios
    axios.get('/receivemessages').then(response=>{
      let messages = response.data;
      let oldchatArea = document.querySelector(".chat-area");
      if (oldchatArea !==null){
        oldchatArea.remove();
      };
      let newchatArea = document.createElement('div');
      newchatArea.className = "chat-area";
      containchatarea.appendChild(newchatArea);
      for (message of messages){
          let containSpan = document.createElement('div');
          containSpan.className = "containSpan";
          let span = document.createElement("span");
          span.className = "span";
          let color = "white";
          let float = "left";
          let borderradius= "0px 10px 10px 10px";
          // let mymessage = message.user + " : " + message.text;
          if (message.user === JSON.parse(localStorage.getItem('username'))){
            color = "blue";
            float = "right";
            borderradius = "10px 0px 10px 10px"
            // mymessage =  message.text+ " : " + message.user;
          }else{
            span.id = message.user;
          }
          span.style.borderRadius = borderradius;
          span.style.float = float;
          span.style.backgroundColor = color;
          span.textContent = message.text;
          containSpan.appendChild(span);
          newchatArea.appendChild(containSpan);
        }
        
    })
  }
  
  // MAIN---------------------------------------------------------------------------------------------
  displayUserPartner();
  displayMessages();
  setInterval(displayMessages,500);

  
  
  


// addEventListener
sendBtn.addEventListener("click",sendMessage);
backbtn.addEventListener('click',backtoprofile)


