const IP= "192.168.88.14";
const PORT = 3000;
const URL = "http://" + IP + ":" + PORT ;

// variable
let profileContainer = document.querySelector('.profileContainer');
const backbtn = document.querySelectorAll('.backtostart');
let user = {};
let users=[];


// function
function displayprofile(user){
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


// addEventListener
backbtn.addEventListener('click',backtostart);


// axios