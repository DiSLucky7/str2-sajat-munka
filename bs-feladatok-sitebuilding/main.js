// NAVBAR
if (window.innerWidth < 992) {
    document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                document.querySelector('.navbar').classList.add('bg-white');
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.add('dark'))
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.add('hover-yellow-text'))
            } else {
                document.querySelector('.navbar').classList.remove('bg-white');
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.remove('dark'))
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.remove('hover-yellow-text'))
            }
        });
    });
} else {
    document.addEventListener("DOMContentLoaded", function () {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                document.querySelector('.navbar').classList.add('bg-white');
                // add padding top to show content behind navbar
                const navbar_height = document.querySelector('.navbar').offsetHeight;
                document.body.style.paddingTop = navbar_height + 'px';
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.add('dark'))
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.add('hover-yellow-text'))
                
            } else {
                document.querySelector('.navbar').classList.remove('bg-white');
                // remove padding top from body
                document.body.style.paddingTop = '0';
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.remove('dark'))
                document.querySelectorAll('.navlink').forEach(elem => elem.classList.remove('hover-yellow-text'))
            }
        });
    });
}

// TOOLTIP
$('#twitter').tooltip('show')
$('#twitter').tooltip('hide')

$('#facebook').tooltip('show')
$('#facebook').tooltip('hide')

$('#gmail').tooltip('show')
$('#gmail').tooltip('hide')

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
