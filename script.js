// import LocomotiveScroll from "locomotive-scroll";
let data = document.getElementById("main");

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnimation() {
  var t1 = gsap.timeline();
  t1.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: "0",
      duration: 1.6,
      ease: Expo.easeInOut,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: "-10",
      opacity: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      delay: -0.5,
    });
}
function cicleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

var timeout;
function circleSkew() {
  // Define default scale value
  var xscale = 1;
  var yscale = 1;
  var xprevious = 0;
  var yprevious = 0;
  window.addEventListener("mousemove", function (details) {
    clearTimeout(timeout);
    var xdiff = details.clientX - xprevious;
    var ydiff = details.clientY - yprevious;

    xprevious = details.clientX;
    yprevious = details.clientY;

    xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
    yscale = gsap.utils.clamp(0.8, 1.2, ydiff);
    cicleMouseFollower(xscale, yscale);
    timeout = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave", function (details) {
    gsap.to(elem.querySelector("img"), {
      display: "none",
      ease: Power3,
      duration: 0.5,
    });
  });
  elem.addEventListener("mousemove", function (details) {
    var diff = details.clientY - elem.getBoundingClientRect().top;
    diffrot = details.clientX - rotate;
    rotate = details.clientX;

    
    gsap.to(elem.querySelector("img"), {
      display: "block",
      ease: Power3,
      top: diff,
      left: details.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
    });
  });
});

var datetime = new Date();
console.log(datetime);
document.getElementById("date").textContent = datetime.getUTCFullYear(); //it will print on html page
document.getElementById("time").textContent = datetime.toLocaleTimeString(); //it will print on html page

// document.getElementById("menu").addEventListener("click", function () {
//   // Toggle visibility of the "mynav" element using GSAP
//   gsap.fromTo(
//     "#mynav",
//     { opacity: 0, display: "block" },
//     { duration: 0.5, opacity: 1 }
//   );

//   // Hide the "Menu+" element
//   gsap.to("#menu", {
//     duration: 0.2,
//     opacity: 0,
//     display: "none",
//   });
// });

let hideTimeout;

function showMenu() {
  var t1 = gsap.timeline();
  t1.fromTo(
    "#mynav",
    { opacity: 0, display: "block", },
    { duration: 0.2, opacity: 1 , ease: Expo.easeInOut,},
    
  );

  t1.to("#menu", {
    duration: 0.2,
    opacity: 0,
    display: "none",
    ease: Expo.easeInOut,
  });

  // If there's already a timeout, clear it first
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }

  // Set a new timeout to hide the "mynav" element after 5 seconds of inactivity
  hideTimeout = setTimeout(hideMenu, 5000);
}

function hideMenu() {
  var t1 = gsap.timeline();
  t1.to("#mynav", {
    duration: 0.5,
    opacity: 0,
    display: "none",
  });

  t1.fromTo(
    "#menu",
    { opacity: 0, display: "block" },
    { duration: 0.5, opacity: 1 }
  );
}

document.getElementById("menu").addEventListener("click", showMenu);

document.getElementById("mynav").addEventListener("mouseenter", function () {
  // If the "mynav" is hovered, clear the hide timeout
  if (hideTimeout) {
    clearTimeout(hideTimeout);
  }
});

document.getElementById("mynav").addEventListener("mouseleave", function () {
  // If the "mynav" is no longer hovered, set a new timeout to hide it
  hideTimeout = setTimeout(hideMenu, 5000);
});

firstPageAnimation();
cicleMouseFollower();
circleSkew();
