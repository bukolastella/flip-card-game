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
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalRating = document.querySelector(".modal_rating");
const modalMoves = document.querySelector(".modal_moves");
const modalBtn = document.querySelector(".modal_btn");
const modalhead = document.querySelector(".modal_head");
const your = document.querySelector(".your");
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
let correct = 0;
let set;
cardContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("card_container")) return;
  if (!e.target.closest(".fb")) return;
  e.target.closest(".fb").classList.toggle("open");
  if (clicked == 0) startTimer();
  clicked += 1;

  if (opened == "") {
    opened = e.target.closest(".fb").querySelector(".back").innerHTML;
  } else {
    // console.log(clicked);
    moves.textContent = Math.trunc(clicked / 2);
    if (e.target.closest(".fb").querySelector(".back").innerHTML == opened) {
      opened = "";
      correct += 1;
      cardContainer.querySelectorAll(".open").forEach((ev) => {
        setTimeout(() => {
          ev.innerHTML = "";
          ev.classList.add("same");
          ev.classList.toggle("open");
        }, 1000);
      });
      setTimeout(() => {
        if (correct == 8) {
          modal.style.display = "block";
          modalRating.innerHTML = rating.innerHTML;
          modalMoves.textContent = moves.textContent;
          overlay.style.display = "block";
          clearInterval(set);
        }
      }, 1000);
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
      renderRating();
    }
    if (time.textContent.startsWith(":00", 2) && timer != 300) {
      ratings.pop();
      renderRating();
    }
    if (timer === 0) {
      clearInterval(set);
      modal.style.display = "block";
      your.style.display = "none";
      modalMoves.textContent = moves.textContent;
      overlay.style.display = "block";
      modalhead.textContent = "whoops, time up!";
    }
    timer--;
  }
  tick();
  set = setInterval(tick, 1000);
  return set;
}

function renderRating() {
  rating.innerHTML = "";
  const html2 = ratings.map((ev) => ev).join("");
  rating.insertAdjacentHTML("afterbegin", html2);
}
renderRating();

modalBtn.addEventListener("click", function () {
  location.reload();
});
