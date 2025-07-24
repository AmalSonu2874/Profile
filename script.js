// Toggle Navbar for mobile
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Changes icon to 'x'
    navbar.classList.toggle('active'); // Shows/hides navbar
};

// Scroll sections active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Adjust for header height
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                // Ensure the link for the current section is highlighted
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Sticky Header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when click navbar link (scroll)
    // This ensures the mobile menu closes when a nav link is clicked
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


// Text animation for home section
document.addEventListener("DOMContentLoaded", function() {
    // UPDATED: Target the specific span with the 'animated-text' class
    const textAnimationSpan = document.querySelector(".text-animation .animated-text");
    const roles = ["Data Analyst", "AI Student", "Data Science Enthusiast", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentRole = roles[roleIndex];
        if (isDeleting) {
            textAnimationSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textAnimationSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 150; // Speed for typing
        if (isDeleting) {
            typeSpeed /= 2; // Faster deletion
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
});
