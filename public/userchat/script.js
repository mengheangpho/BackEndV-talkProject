const IP= "192.168.88.26";
const PORT = 3000;
// const URL = "http://" + IP + ":" + PORT ;
const URL = "https://v-talk-application.herokuapp.com/"

//============================ ALL AVARIABLE ============================//
let containChat = document.querySelector('.container');
let textChat = document.querySelector("#text-area");
let sendBtn = document.querySelector("#send-btn");
let editBtn = document.querySelector("#edit-btn");
let partnername = document.querySelector('#partnername')
let status = document.querySelector('#status')
let backbtn = document.querySelector('#back')
let containchatarea = document.querySelector('.containchat-area');
let messagearea = document.querySelector('.message-area');
let quaotarea = document.querySelector('.quaotarea')
let textquaot = document.querySelector('#textforquaot')
let bold = document.querySelector('#bold');
let italic = document.querySelector('#italic');
let stylebold = 'normal';
let styleitalic = 'normal';
let userquote = ""
let qouteobject = {}

//=============================== ALL FUNTION ================================//

//================= funtion back a page to acount and profile =====================//

function backtoprofile(event){
  window.location.href = "../profile/index.html";
}

//============ funtion to hsow partner profile =======================//

function displayUserPartner(){
  let userpartner =localStorage.getItem('partner');
  console.log(userpartner);
  axios.post('/userdata',{userpartner : userpartner}).then(response =>{
  partnername.textContent= response.data.name;
  status.textContent = response.data.status;
})
}

//======= funtion to send new message to store in datausers.json ==============//

function sendMessage(){
  displayUserPartner()
    let currentUser = JSON.parse(localStorage.getItem('username'));
    let userText = {};
    let text = textChat.value;
    let qtext = textquaot.textContent;
    userText.user = currentUser;
    userText.bold = stylebold;
    userText.italic = styleitalic;
    if(qtext!==""){
      userText.text ={user:userquote,quaot:qtext,text:text};
    }
    else{
      userText.text = text;
    }
    if (textChat.value !== ""){
      axios.post('/sendmessage',userText).then(response=>{
        mess = response.data;
        displayMessages(response.data);
      });
    }
    textChat.value = "";
    stylebold = 'normal';
    styleitalic = 'normal';
    quaotarea.style.display="none";
    containchatarea.style.height="84%"
    messagearea.style.height="10%"

}

//========== funtion to display all messages on the chat area ============//
  
  function displayMessages(messages){
    // console.log(messages)
      
//============== Ask for oldchatarea if exist remove =================//

      let oldchatArea = document.querySelector(".chat-area");
      if (oldchatArea !==null){
        oldchatArea.remove();
      };

//======================== Create newchatarea =====================//

      let newchatArea = document.createElement('div');
      newchatArea.className = "chat-area";
      containchatarea.appendChild(newchatArea);

//=============== Create element div contain span and span =================//
      let index = -1;
      for (message of messages){
          index+=1
          let containSpan = document.createElement('div');
          containSpan.className = "containSpan";
          containSpan.id = index;
          let span = document.createElement("span");
          let divquote = document.createElement('div');
          divquote.className="qoutepart"
          let quoteimg = document.createElement('img');
          quoteimg.src="../image/quote.png";
          quoteimg.className="quote-img";
          let quotename = document.createElement('p');
          quotename.className="quotename";
          // quotename.textContent=userquote;
          let quotetop = document.createElement('div');
          quotetop.className="quotetop";
          let textquote = document.createElement("p");
          textquote.id="quotetext";
          quotetop.appendChild(quoteimg);
          quotetop.appendChild(quotename)
          divquote.appendChild(quotetop);
          divquote.appendChild(textquote);
          span.classList.add(message.user,"span");
          let color = "white";
          let float = "left";
          let borderradius= "0px 10px 10px 10px";
          // listoption--------------

          if (message.user === JSON.parse(localStorage.getItem('username'))){
            color = "blue";
            float = "right";
            borderradius = "10px 0px 10px 10px";
            span.textContent = emoji(message.text);
          }else{
            span.id = message.user;
            span.textContent = emoji(message.text);
          };

//===================== create Img edit quot remove and option =========================//
        
          let editicon = document.createElement('img');
          editicon.className="edittext";
          editicon.src="../image/edittext.png";
          let quoteicon = document.createElement('img');
          quoteicon.className="quote";
          quoteicon.src="../image/quote.png";
          let removeicon = document.createElement('img');
          removeicon.className="remove";
          removeicon.src="../image/remove.png";

          let option = document.createElement('img');
          option.className = "option";
          option.src="../image/option.png";

//===================== add mg edit quot remove listoptions=========================//

          let listoption = document.createElement('div');
          listoption.className="listoption";
          span.style.fontWeight = message.bold;
          span.style.fontStyle = message.italic;
          span.style.borderRadius = borderradius;
          span.style.float = float;
          span.style.backgroundColor = color;
          divquote.style.float = float;
          if(message.user === JSON.parse(localStorage.getItem('username'))){
            span.style.paddingBottom="2px"
            containSpan.appendChild(span);
            listoption.appendChild(editicon);
            listoption.appendChild(quoteicon);
            listoption.appendChild(removeicon);
          }
          else{
            option.style.float = float;
            listoption.appendChild(quoteicon);
          }
          span.appendChild(listoption);
          span.appendChild(option)

          // ======== not yet complete
          console.log(message.text)
          if(message.text.text!= undefined && message.user==JSON.parse(localStorage.getItem('username'))){
            containSpan.appendChild(span);
            textquote.textContent = message.text.quaot;
            quotename.textContent=message.text.user;
            containSpan.appendChild(divquote)
          }
          else if(message.text.text!= undefined && message.user!=JSON.parse(localStorage.getItem('username'))){
            textquote.textContent = message.text.quaot;
            quotename.textContent=message.text.user;
            containSpan.appendChild(span);
            containSpan.appendChild(divquote)
          }
          else{
            containSpan.appendChild(span);
          }
          // console.log(message.user)
          // containSpan.appendChild(span);

          newchatArea.appendChild(containSpan);
      }
      let option = document.querySelectorAll('.option');
      for(opt of option){
        
        opt.addEventListener('click',showoption)
        // opt.addEventListener('mouseout',hideoption)

      }
    // })
}

//=========================== funtion to change from feeling sign to emoji =================//

  let emojiMap = {
    ";(" : "😌","><":"😆",":p":"😋","<3":"❤️",":o":"😱",":D":"😛",":":"😶",":|":"😐","$$":"🤑",":x":"😘",":(":"☹️",":E":"😁",":#":"🤐",":@":"😵",
    "8)":"🤓","^~^":"😖",";<":"🤧","Q>":"😇",":}":"🤡",":.)":"😭","b-)":"😎",">_<":"😡","8>":"👽",":)":"😊"
  };
  
  function emoji(text){
    let arraytext="";
    if(text.text!= undefined){
       arraytext  = text.text.split(" ");
    }
    else{
       arraytext  = text.split(" ");
    }
    
// let arraytext  = text.split(" ");
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

//========= funtion to show the option of edit quote and remove =========//
let countoption = 0;
let myoption ="";
let myindex = -1;
function findoption(event){
  countoption +=1
  myoption  = event.target.className;
  console.log(myoption);
  let hideoptions = document.querySelectorAll(".listoption");
  for (hideoption of hideoptions){
    if (hideoption.style.display === "block"){
      hideoption.style.display = "none";
    };
  };
  if (myoption === "edittext"){
    eidtion();
  }else if (myoption === "quote"){
    quaotation();
  }else if (myoption === "remove"){
    removal();
  };
  
}




function showoption(event) {
  countoption += 1;
  console.log(countoption)
  let option = "";
  let mess="";
  let eventar = event.target;
  myindex = eventar.parentNode.parentNode.id;
  console.log("myindex"+myindex);
  // console.log(myindex);
  // let onclick = event.target.className;
  if(eventar.className == "option"){
    mess = eventar.parentElement;
    option = mess.querySelector('.listoption');
    if(countoption%2 ==1){
    option.style.display="block"
    }
    else{
    option.style.display="none"
    }
    }
  let alloptions = option.childNodes;
  for (chooseoption of alloptions) {
      chooseoption.addEventListener('click',findoption);
  }

}



function eidtion(params) {
  sendBtn.style.display = "none";
  editBtn.style.display = "block";
  axios.get("/receivemessages").then(response =>{
    allmessages = response.data;
    if(allmessages[myindex].text.text!==undefined){
      textChat.value = allmessages[myindex].text.text;
      qouteobject = allmessages[myindex].text

    }
    else{
      textChat.value = allmessages[myindex].text;
    }
    console.log()
  })
}

function editmessage(params) {
  
  let toedit = {};

  toedit.index = myindex;
  qouteobject.text = textChat.value;
  toedit.text = qouteobject;
  axios.put("/editmessage",toedit).then(response=>{
    displayMessages(response.data);
  })
  textChat.value = "";
  sendBtn.style.display = "block";
  editBtn.style.display = "none";
}


function quaotation(params) {
  containchatarea.style.height = "78%"
  quaotarea.style.display="flex"
  axios.get("/receivemessages").then(response =>{
    allmessages = response.data;
    if(allmessages[myindex].text.text!==undefined){
      textquaot.textContent= allmessages[myindex].text.text;
    }else{
      textquaot.textContent= allmessages[myindex].text
    }
    userquote=allmessages[myindex].user;


  })
}

function removal(params) {
  if (confirm("Are you sure to delete this message?")){
    axios.delete( URL+"/message/"+myindex).then(response=>{
      displayMessages(response.data);

    });
  }
}



//============ funtion to hide the option of edit quote and remove =========//

// function hideoption() {
//   // console.log('yes')
//   let alloption = document.querySelectorAll('.listoption')
//   for(option of alloption){
//     option.style.display = "none"
//   }
// };

//============= funtion to play style to bold or italic ========================//
let countClickOfbold = 0;
let countClickOfitalic = 0;
function setbold() {
  countClickOfbold += 1;
  console.log('bold')
  stylebold = 'bold';
  textChat.style.fontWeight = stylebold;
  if (countClickOfbold %2 === 0){
    stylebold = 'normal';
    textChat.style.fontWeight = stylebold;
  }
  
};

function setitalic() {
  countClickOfitalic += 1;
  console.log('italic')
  styleitalic = 'italic';
  textChat.style.fontStyle = styleitalic;
  if (countClickOfitalic %2 === 0){
    styleitalic = 'normal';
    textChat.style.fontStyle = styleitalic;
  };
};

//================ funtion to use enter key to send messages ====================//
let isediting = false;
function entersend(event){
  if (event.keyCode === 13 && ! isediting) {
    event.preventDefault();
    sendMessage();
  };

};

//================ funtion to use enter key to edit messages ====================//

function enteredit(event){
  if (event.keyCode === 13 && isediting){
    event.preventDefault();
    editmessage();
  };
  isediting = false;

};


function loadData(){
  axios.get('/receivemessages').then(response=>{
    displayMessages(response.data);
  });
};
  
//===================================== ADD EVENTLISTENER===============================//

sendBtn.addEventListener("click",sendMessage);
editBtn.addEventListener('click',editmessage)
backbtn.addEventListener('click',backtoprofile);
bold.addEventListener('click',setbold);
italic.addEventListener('click',setitalic);
messagearea.addEventListener('keydown',(event)=>{
  enteredit(event);
  if (editBtn.style.display === "block"){
    isediting = true;
  }
  
});
messagearea.addEventListener('keydown',entersend);


//====================================== LOAD DATA AND ===============================//

displayUserPartner();
loadData();
// displayMessages();
// setInterval(displayMessages,500);
// setInterval(loadData,3000);
