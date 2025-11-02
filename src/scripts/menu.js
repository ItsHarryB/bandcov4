document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.nav-overlay');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('expanded');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-active');
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('expanded');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-active');
    });
});