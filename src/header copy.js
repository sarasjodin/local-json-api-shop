"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navbarContainer = document.querySelector(".navbar-container");

  if (!hamburgerMenu || !navbarContainer) {
    console.error("Elementet hittades inte!");
    return;
  }

  hamburgerMenu.addEventListener("click", () => {
    console.log("Hamburgermenyn klickades!");
    navbarContainer.classList.toggle("show");
  });
});
