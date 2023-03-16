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

// seleziono i placeholders
const placeholders = document.querySelectorAll("svg.bd-placeholder-img");
const cards = document.getElementsByClassName("card");

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
  pictures.forEach((element, i) => {
    placeholders[i].remove();
    let image = document.createElement("img");
    image.src = `${pictures[i].src.large}`;
    image.alt = `picture of ${query}`;
    cards[i].prepend(image);
  });
};

// ogni bottone al click passa un parametro differente
mainButton.addEventListener("click", () => {
  getPictures("japan");
});

secondaryButton.addEventListener("click", () => {
  getPictures("patagonia");
});
