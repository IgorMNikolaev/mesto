let openbutton=document.querySelector('.profile__edit-button')
let closebutton=document.querySelector('.popup__close-button')
let popup=document.querySelector('.popup')

function open(){
  popup.classList.add('popup_opened');
  console.log(popup.classList)
}

function close(){
  popup.classList.remove('popup_opened');   
}

openbutton.addEventListener('click', open);
closebutton.addEventListener('click', close);

let formElement=document.querySelector('.popup__form')

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let Input =document.querySelectorAll('.popup__input');
    let name=Input[0].value;
    let discription=Input[1].value;
    let profileName=document.querySelector('.profile__name');
    let profileDiscription=document.querySelector('.profile__discription');
    profileName.textContent=name;
    profileDiscription.textContent=discription;
    close();
}  

formElement.addEventListener('submit', formSubmitHandler);
