// parametri per utilizzare l'API
const API_URL = "https://api.pexels.com/v1/";
const API_KEY = "6XSqTDMTVgXKYcmjdc4RMZ9WJi2mjYY8QBzqWx95ywqGr1zsxAnvRxZd";
let query = "japan";

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
const placeholders = document.getElementsByClassName("bd-placeholder-img");
const cards = document.getElementsByClassName("card");

// creo array vuoto dove salvo le immagini ottenute come risposta dal server
let pictures = [];

const getPictures = async () => {
  try {
    const response = await fetch(API_URL + `search?query=[${query}]`, options);
    const data = await response.json();
    console.log(data);
    pictures = data.photos;
    setPictures();
  } catch (error) {
    console.log(error);
  }
};

const setPictures = () => {
  pictures.forEach((element, i) => {
    console.log(i);
    // placeholders[i].innerHTML = "";
    placeholders[i].outerHTML = `<img src="${pictures[i].src.large}" alt="picture of ${query}">`;
    // let image = document.createElement("img");
    // cards[i].appendChild(image);
  });
};

mainButton.addEventListener("click", () => {
  getPictures();
});
