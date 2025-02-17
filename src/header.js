"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navbarContainer = document.querySelector(".navbar-container");

  if (hamburgerMenu && navbarContainer) {
    hamburgerMenu.addEventListener("click", () => {
      navbarContainer.classList.toggle("show");
    });
  }
});
