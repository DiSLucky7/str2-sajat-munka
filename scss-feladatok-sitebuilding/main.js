// NAVBAR
if (window.innerWidth < 992) {
    document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                document.querySelector('.nav-scss').classList.add('white-bg');
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.add('dark'))
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.add('hover-yellow-text'))
            } else {
                document.querySelector('.nav-scss').classList.remove('bg-white');
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.remove('dark'))
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.remove('hover-yellow-text'))
            }
        });
    });
} else {
    document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                document.querySelector('.nav-scss').classList.add('bg-white');
                // add padding top to show content behind navbar
                const navbar_height = document.querySelector('.nav-scss').offsetHeight;
                document.body.style.paddingTop = navbar_height + 'px';
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.add('dark'))
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.add('hover-yellow-text'))
                
            } else {
                document.querySelector('.nav-scss').classList.remove('bg-white');
                // remove padding top from body
                document.body.style.paddingTop = '0';
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.remove('dark'))
                document.querySelectorAll('.nav-scss__link').forEach(elem => elem.classList.remove('hover-yellow-text'))
            }
        });
    });
}

// // TOOLTIP
// $('#twitter').tooltip('show')
// $('#twitter').tooltip('hide')

// $('#facebook').tooltip('show')
// $('#facebook').tooltip('hide')

// $('#gmail').tooltip('show')
// $('#gmail').tooltip('hide')

// SMOOTH SCROLL
$(document).ready(function () {
    // Add smooth scrolling to all links
    $("a").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            const hash = this.hash;
            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        }
    });
});

// MODAL
let modalConatiners = document.querySelectorAll('.modal__container');
const modals = document.querySelectorAll('.modal-scss');

const footerLinks = document.querySelectorAll('.footer-link')
console.log("Modal & footerLinks: ", modals, footerLinks);
footerLinks.forEach((element, i) => element.addEventListener('click', () => {
    modalConatiners[i].classList.remove('hidden');
    modals[i].focus();
}))

function close() {
    setTimeout(() => {
        modalConatiners.forEach(elem => elem.classList.add('hidden'));
    }, 600)
}

document.querySelectorAll('.x__button').forEach(elem => elem.addEventListener('click', function() {
    close();
}))

document.querySelectorAll('.okay__button').forEach(elem => elem.addEventListener('click', function() {
    close();
}))

document.querySelectorAll('.cancel__button').forEach(elem => elem.addEventListener('click', function() {
    close();
}))

window.addEventListener('click', function(event) {
    for (let i = 0; i < modalConatiners.length; i++) {
        if (event.target == modalConatiners[i]) {
            close();
        }
    }
})
