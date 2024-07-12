"use strict";
document.querySelector(".btn-resume").addEventListener("click", function () {
  window.open("./resume/Anant _Resume.pdf", "_blank");
});

let a = document.createElement("a");
a.href = "https://github.com/ANANT-1510";
a.target = "_blank";

const github = document.querySelector(".github");

github.addEventListener("click", function () {
  location.href = "https://github.com/ANANT-1510";
});

const linkedin = document.querySelectorAll(".linkedin");
linkedin.forEach((val) =>
  val.addEventListener("click", function () {
    location.href = "https://www.linkedin.com/in/anant-sureka-bba9532a9/";
  })
);

document.querySelector(".linkedin-text").addEventListener("click", function () {
  location.href = "https://www.linkedin.com/in/anant-sureka-bba9532a9/";
});

document.querySelector(".email").addEventListener("click", function () {
  location.href = "https://mail.google.com/mail/u/3/#inbox";
});
