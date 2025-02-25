const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu-btn');
console.log(sideMenu);
console.log(menuBtn);


// ===================== Media Queries Menu Button ======================
menuBtn.addEventListener('click', () => {
    if (sideMenu.style.display === 'none') {
        sideMenu.style.display = 'block';
        sideMenu.classList.add('showMenu');
    } else {
        sideMenu.style.display = 'none';
        sideMenu.classList.replace('showMenu', 'hideMenu');
    }
});