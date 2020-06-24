let openbutton = document.querySelector('.profile__edit-button');
let closebutton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let InputName = document.querySelector('.popup__input-name');
let InputDiscription = document.querySelector('.popup__input-discription');
let profileName = document.querySelector('.profile__name');
let profileDiscription = document.querySelector('.profile__discription');

function open(){
  popup.classList.add('popup_opened');
  InputName.value = profileName.textContent;
  InputDiscription.value = profileDiscription.textContent;
}

function close(){
  popup.classList.remove('popup_opened');
  
}

openbutton.addEventListener('click', open);
closebutton.addEventListener('click', close);

let formElement=document.querySelector('.popup__form');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    let name=InputName.value;
    let discription = InputDiscription.value;
    let profileName = document.querySelector('.profile__name');
    let profileDiscription = document.querySelector('.profile__discription');
    profileName.textContent = name;
    profileDiscription.textContent = discription;
    close();
}  

formElement.addEventListener('submit', formSubmitHandler);

console.log(InputName.value);
