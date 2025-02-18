'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navbarContainer = document.querySelector('.navbar-container');

  if (hamburgerMenu && navbarContainer) {
    hamburgerMenu.addEventListener('click', () => {
      navbarContainer.classList.toggle('show');
    });
  }
});

document
  .querySelector('.hamburger-menu')
  .addEventListener('click', function () {
    this.setAttribute(
      'aria-label',
      this.classList.toggle('open') ? 'Stäng meny' : 'Öppna meny'
    );
  });
