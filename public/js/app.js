const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
const closeBtn = document.querySelector('#close-btn');

const signInBtn = document.querySelector('#sing-in');
const signUpBtn = document.querySelector('#sign-up');

const signInForm = document.querySelector('.sign-in-form');
const signUpForm = document.querySelector('.sign-up-form');

// ===================== Toggle sign-in & sign-up ====================== 
signInBtn.addEventListener('click', () => {
    signInBtn.style.backgroundColor = '#3E3377';
    signUpBtn.style.backgroundColor = 'rgba(255, 255, 255, .3)';

    signInForm.style.left = '50%';
    signUpForm.style.left = '-50%';

});

signUpBtn.addEventListener('click', () => {
    signInBtn.style.backgroundColor = 'rgba(255, 255, 255, .3)';
    signUpBtn.style.backgroundColor = '#3E3377';

    signInForm.style.left = '-50%';
    signUpForm.style.left = '150%';

});

// ===================== Media Queries Menu Button ======================
menuBtn.addEventListener('click', () => {
    if (sideMenu.style.display === 'none') {
        sideMenu.style.display = 'block';
    } else {
        sideMenu.style.display = 'none';
    }
});

const aside = document.querySelector("aside");
const toggleMenu = () => {
    if (aside.classList.contains("show")) {
        aside.classList.replace("show", "hide");
        setTimeout(() => aside.style.display = "none", 400); // Hide after animation
    } else {
        aside.style.display = "block";
        aside.classList.replace("hide", "show");
    }
};

document.querySelector(".menu-button").addEventListener("click", toggleMenu);
