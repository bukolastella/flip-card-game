"use strict";
const cards = [
  '<i class="far fa-grin-tongue-squint fa-10x"></i>',
  '<i class="far fa-grin-hearts fa-10x"></i>',
  '<i class="fas fa-grin-squint-tears fa-10x"></i>',
  '<i class="far fa-dizzy fa-10x"></i>',
  '<i class="fas fa-meh-blank fa-10x"></i>',
  '<i class="fas fa-meh-rolling-eyes fa-10x"></i>',
  '<i class="fas fa-surprise fa-10x"></i>',
  '<i class="fas fa-grin-beam fa-10x"></i>',
  //
  '<i class="far fa-grin-tongue-squint fa-10x"></i>',
  '<i class="far fa-grin-hearts fa-10x"></i>',
  '<i class="fas fa-grin-squint-tears fa-10x"></i>',
  '<i class="far fa-dizzy fa-10x"></i>',
  '<i class="fas fa-meh-blank fa-10x"></i>',
  '<i class="fas fa-meh-rolling-eyes fa-10x"></i>',
  '<i class="fas fa-surprise fa-10x"></i>',
  '<i class="fas fa-grin-beam fa-10x"></i>',
];
const cardContainer = document.querySelector(".card_container");
const html = cards
  .map(
    (ev) => `<div class="card">
    <div class="fb">
      <div class="front"></div>
      <div class="back">${ev}</div>
    </div>
  </div>`
  )
  .join("");
cardContainer.insertAdjacentHTML("afterbegin", html);

let clicked = 0;
let opened = "";
cardContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("card_container")) return;
  e.target.closest(".fb").classList.toggle("open");
  if (opened == "") {
    opened = e.target.closest(".fb").querySelector(".back").innerHTML;
  } else {
    if (e.target.closest(".fb").querySelector(".back").innerHTML == opened) {
      console.log("same");
      cardContainer.querySelectorAll(".open").forEach((ev) => {
        ev.innerHTML = "";
        ev.classList.add("same");

        // setTimeout(() => {
        //   cardContainer
        //     .querySelectorAll(".open")
        //     .forEach((ev) => ev.classList.toggle("open"));
        // }, 1000);
      });
    } else {
      setTimeout(() => {
        cardContainer
          .querySelectorAll(".open")
          .forEach((ev) => ev.classList.toggle("open"));
      }, 500);

      opened = "";
    }
  }
});
