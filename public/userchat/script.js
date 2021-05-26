
const IP= "192.168.88.30";
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
let messagearea = document.querySelector('.message-area');
let bold = document.querySelector('#bold');
let italic = document.querySelector('#italic');

let stylebold = 'normal';
let styleitalic = 'normal';

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
    userText.bold = stylebold;
    userText.italic = styleitalic;
    if (textChat.value !== ""){
      axios.post('/sendmessage',userText).then(response=>{
        displayMessages(response.data);
      });
    }
    textChat.value = "";
    stylebold = 'normal';
    styleitalic = 'normal';
  }
  
function displayMessages(messages){
      // axios
    // axios.get('/receivemessages').then(response=>{
      // let messages = response.data;
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
          let editicon = document.createElement('img');
          editicon.className="edittext"
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
            span.textContent = emoji(message.text);
          }else{
            span.id = message.user;
            span.textContent = message.user + " : " + emoji(message.text);
          }
          editicon.src="../image/edittext.png";
          span.style.fontWeight = message.bold;
          span.style.fontStyle = message.italic;
          span.style.borderRadius = borderradius;
          span.style.float = float;
          span.style.backgroundColor = color;
          // span.textContent = message.text;
          span.appendChild(editicon)
          containSpan.appendChild(span);
          newchatArea.appendChild(containSpan);
      }
        
    // })
}

  let emojiMap = {
    ";(" : "😌","><":"😆",":p":"😋","<3":"❤️",":o":"😱",":D":"😛",":":"😶",":|":"😐","$$":"🤑",":x":"😘",":(":"☹️",":E":"😁",":#":"🤐",":@":"😵",
    "8)":"🤓","^~^":"😖",";<":"🤧","Q>":"😇",":}":"🤡",":.)":"😭","b-)":"😎",">_<":"😡",":>":"👽",":)":"😊"
  };
  
  function emoji(text){
    let arraytext  = text.split(" ");
    let message ="";
    for (word of arraytext){
      let foundemoji = false;
      for (feel in emojiMap){
        if (word===feel){
          message+= emojiMap[feel];
          foundemoji = true;
        };
      };
      if (!foundemoji){
        message += word;
      };
      message +=" ";
    };
    return message;
  };





  function loadData(){
    axios.get('/receivemessages').then(response=>{
      displayMessages(response.data);
    })
  }


  function setbold() {
    stylebold = 'bold';
  }

  function setitalic() {
    styleitalic = 'italic';
  }

  function enterKeyPressed(event){
    if (event.keyCode === 13) {
        event.preventDefault();
        sendMessage();
    }

  }
  
  // MAIN---------------------------------------------------------------------------------------------
  displayUserPartner();
  loadData();
  // displayMessages();
  // setInterval(displayMessages,500);
  setInterval(loadData,500);


// addEventListener
sendBtn.addEventListener("click",sendMessage);
backbtn.addEventListener('click',backtoprofile);
bold.addEventListener('click',setbold);
italic.addEventListener('click',setitalic);
messagearea.addEventListener('keydown',enterKeyPressed);

