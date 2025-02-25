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

signInBtn.addEventListener('click', () => {
    signInBtn.style.backgroundColor = 'rgba(255, 255, 255, .3)';
    signUpBtn.style.backgroundColor = '#3E3377';

    signInForm.style.left = '-50%';
    signUpForm.style.left = '150%';

});