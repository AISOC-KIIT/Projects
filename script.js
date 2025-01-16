"use strict";

const container = document.querySelector(".container").offsetWidth;
document.querySelector(".btn-resume").addEventListener("click", function () {
  window.open("./resume/Anant _Resume.pdf", "_blank");
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

document.querySelector(".email-logo").addEventListener("click", function (e) {
  // location.href = "https://mail.google.com/mail/u/3/#inbox";
  // target = "_blank";
  e.preventDefault();
  window.open("mailto:sureka.anant2004@gmail.com");
});

const bar = document.querySelector(".nav-bar");
const close = document.querySelector(".nav-close");
bar.addEventListener("click", function (e) {
  // console.log(e);
  document.querySelector(".nav-links").style.opacity = 100;
  document.querySelector(".nav-links").style.gap = "45px";
  document.querySelector(".nav-links").style.marginRight = "130px";
  document.querySelector(".logo").style.opacity = 0;
  document.querySelector(".nav-close").style.opacity = 100;
  bar.style.opacity = 0;
  close.style.zIndex = 100;
  bar.style.zIndex = 0;
  document.querySelector(".nav-links").style.pointerEvents = "auto";
});

close.addEventListener("click", function () {
  close.style.opacity = 0;
  bar.style.opacity = 100;
  document.querySelector(".nav-links").style.opacity = 0;
  close.style.zIndex = 0;
  bar.style.zIndex = 100;
  // if (container > 450) {
  //   bar.opacity = 0;
  //   close.opacity = 0;
  //   document.querySelector(".nav-links").style.opacity = 100;
  //   document.querySelector(".nav-links").style.pointerEvents = "auto";
  // } else
  document.querySelector(".nav-links").style.pointerEvents = "none";
  document.querySelector(".logo").style.opacity = 100;
  document.querySelector(".nav-links").style.gap = "10px";
  document.querySelector(".nav-links").style.marginRight = "0px";
});

// if (container > 450) {
//   bar.opacity = 0;
//   close.opacity = 0;
//   document.querySelector(".nav-links").style.opacity = 100;
//   document.querySelector(".nav-links").style.pointerEvents = "auto";
// }
console.log(container);
