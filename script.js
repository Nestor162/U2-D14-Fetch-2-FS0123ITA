// parametri per utilizzare l'API
const API_URL = "https://api.pexels.com/v1/";
const API_KEY = "6XSqTDMTVgXKYcmjdc4RMZ9WJi2mjYY8QBzqWx95ywqGr1zsxAnvRxZd";

const options = {
  method: "GET",
  headers: {
    Authorization: API_KEY
  }
};

// seleziono i bottoni dal DOM
const mainButton = document.getElementById("load-main");
const secondaryButton = document.getElementById("load-secondary");

// seleziono il secondo bottone ('Edit') da sostituire con 'Hide'
const buttonsEdit = document.querySelectorAll(".btn-group button:nth-of-type(2)");

// seleziono i placeholders
const placeholders = document.querySelectorAll("svg.bd-placeholder-img");
const cards = document.getElementsByClassName("card");

// seleziono il testo '9 mins' da sostituire con id
const textId = document.getElementsByTagName("small");

// creo array vuoto dove salvo le immagini ottenute come risposta dal server
let pictures = [];

const getPictures = async query => {
  try {
    const response = await fetch(API_URL + `search?query=[${query}]`, options);
    const data = await response.json();

    // clono l'array di foto fornito da pexels
    pictures = [...data.photos];

    //prendo solo le prime 9 immagini
    pictures = pictures.slice(0, 9);

    //eseguo la funzione per inserire le immagini nelle card
    setPictures(query);
  } catch (error) {
    console.log(error);
  }
};

const setPictures = query => {
  // se gia esiste un immagine nella card, vengono eliminate prima di inserire nuove
  if (document.querySelector(".custom-image")) {
    const prevPics = document.querySelectorAll(".custom-image");
    prevPics.forEach((element, i) => {
      element.remove();
    });
  }
  pictures.forEach((element, i) => {
    // elimino il placeholder
    placeholders[i].remove();

    // creo l'immagine con i suoi attributi
    let image = document.createElement("img");
    image.src = `${pictures[i].src.large}`;
    image.alt = `picture of ${query}`;
    image.classList.add("card-img-top", "custom-image");
    cards[i].prepend(image);

    // modifico il testo '9 mins'
    textId[i].textContent = `id: ${pictures[i].id}`;

    // sostituisco pulsante edit
    buttonsEdit[i].textContent = "Hide";
  });
};

// ogni bottone al click passa un parametro differente
mainButton.addEventListener("click", () => {
  getPictures("japan");
});

secondaryButton.addEventListener("click", () => {
  getPictures("patagonia");
});

buttonsEdit.forEach((el, i) => {
  el.addEventListener("click", () => {
    cards[i].classList.add("d-none");
  });
});
