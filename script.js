"use strict";
document.querySelector(".btn-resume").addEventListener("click", function () {
  window.open("./resume/Anant _Sureka_Resume.pdf", "_blank");
  // location.href = "./resume/Anant _Sureka_Resume.pdf";
});

let a = document.createElement("a");
a.href = "https://github.com/ANANT-1510";
a.target = "_blank";

const github = document.querySelector(".github");

github.addEventListener("click", function (e) {
  // location.href = "https://github.com/ANANT-1510";
  // target = "_blank";
  e.preventDefault();
  window.open("https://github.com/ANANT-1510", "_blank");
});

const linkedin = document.querySelectorAll(".linkedin");
linkedin.forEach((val) =>
  val.addEventListener("click", function (e) {
    // location.href = "https://www.linkedin.com/in/anant-sureka-bba9532a9/";
    // target = "_blank";
    e.preventDefault();
    window.open(
      "https://www.linkedin.com/in/anant-sureka-bba9532a9/",
      "_blank"
    );
  })
);

document
  .querySelector(".linkedin-text")
  .addEventListener("click", function (e) {
    // location.href = "https://www.linkedin.com/in/anant-sureka-bba9532a9/";
    // target = "_blank";
    e.preventDefault();
    window.open(
      "https://www.linkedin.com/in/anant-sureka-bba9532a9/",
      "_blank"
    );
  });

document.querySelector(".email").addEventListener("click", function (e) {
  // location.href = "https://mail.google.com/mail/u/3/#inbox";
  // target = "_blank";
  e.preventDefault();
  window.open("https://mail.google.com/mail/u/3/#inbox", "_blank");
});
const nav = document.querySelector(".desktop-nav");
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);
