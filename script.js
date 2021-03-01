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
let ratings = [
  '<i class="fas fa-star"></i>',
  '<i class="fas fa-star"></i>',
  '<i class="fas fa-star"></i>',
  '<i class="fas fa-star"></i>',
  '<i class="fas fa-star"></i>',
];
const cardContainer = document.querySelector(".card_container");
const moves = document.querySelector(".moves");
const rating = document.querySelector(".rating");
const time = document.querySelector(".time");
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
  if (!e.target.closest(".fb")) return;
  e.target.closest(".fb").classList.toggle("open");
  if (clicked == 0) startTimer();
  console.log(time.textContent);

  if (opened == "") {
    opened = e.target.closest(".fb").querySelector(".back").innerHTML;
  } else {
    clicked += 1;
    // console.log(clicked);
    moves.textContent = clicked;
    if (e.target.closest(".fb").querySelector(".back").innerHTML == opened) {
      opened = "";
      cardContainer.querySelectorAll(".open").forEach((ev) => {
        setTimeout(() => {
          ev.innerHTML = "";
          ev.classList.add("same");
          ev.classList.toggle("open");
        }, 1000);
      });
    } else {
      opened = "";
      setTimeout(() => {
        cardContainer
          .querySelectorAll(".open")
          .forEach((ev) => ev.classList.toggle("open"));
      }, 500);
    }
  }
});
function startTimer() {
  let timer = 300;
  function tick() {
    const min = String(Math.trunc(timer / 60)).padStart(2, 0);
    const sec = String(timer % 60).padStart(2, 0);
    time.textContent = `${min}:${sec}`;

    if (time.textContent.startsWith(":30", 2)) {
      ratings.pop();
      ratings.push('<i class="fas fa-star-half yo"></i>');
      ratingRender();
    }
    if (time.textContent.startsWith(":00", 2) && timer != 299) {
      ratings.pop();
      ratingRender();
    }
    if (timer === 0) {
      clearInterval(set);
    }
    timer--;
  }
  tick();
  const set = setInterval(tick, 1000);
  return set;
}

function ratingRender() {
  rating.innerHTML = "";
  const html2 = ratings.map((ev) => ev).join("");
  rating.insertAdjacentHTML("afterbegin", html2);
}
ratingRender();
