/******************************************
    File Name: custom.js
*******************************************/

(function ($) {
    "use strict";

    /**== WOW Animation ==**/
    new WOW().init();

    /**== Loader JS ==**/
    // Uncomment to enable loader functionality
    // $(window).on('load', function () {
    //     $(".bg_load").fadeOut("slow");
    // });

    /**== Top Search JS ==**/
    $("li.search").on("click", function (e) {
        e.preventDefault();
        $(".top-search").slideToggle();
    });

    $(".input-group-addon.close-search").on("click", function () {
        $(".top-search").slideUp();
    });

    /**== Mobile Tab Function ==**/
    const mobileTabFunction = () => {
        const links = document.getElementById("tabLinks");
        if (links) {
            links.style.display = (links.style.display === "block") ? "none" : "block";
        }
    };

    /**== Register Function ==**/
    const registerFunction = () => {
        const selectRegister = document.getElementById("selectRegister");
        if (selectRegister) {
            selectRegister.style.display = (selectRegister.style.display === "block") ? "none" : "block";
        }
    };

    $(document).ready(function () {
        // Event listeners for tab and user icons
        $('.tabIcon').on('click', mobileTabFunction);
        const userIcons = document.querySelectorAll('.userIcon');
        userIcons.forEach(icon => {
            icon.addEventListener('click', registerFunction);
        });

        /* ..............................................
           Owl Carousel Instagram Feed
           ................................................. */
        $('.main-instagram').owlCarousel({
            loop: true,
            margin: 0,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            navText: ["<i class='fas fa-arrow-left'></i>", "<i class='fas fa-arrow-right'></i>"],
            responsive: {
                0: {
                    items: 2,
                    nav: true
                },
                600: {
                    items: 3,
                    nav: true
                },
                1000: {
                    items: 5,
                    nav: true,
                    loop: true
                }
            }
        });

        /* ..............................................
           Scroll
           ................................................. */
        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 100) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });

        $('#back-to-top').on('click', function () {
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

        /* ..............................................
           Gallery
           ................................................. */
        $('#slides-shop').superslides({
            inherit_width_from: '.cover-slides',
            inherit_height_from: '.cover-slides',
            play: 5000,
            animation: 'fade',
        });

        $(".cover-slides ul li").append("<div class='overlay-background'></div>");

        /* ..............................................
           Special Menu
           ................................................. */
        const Container = $('.container-fluid');
        Container.imagesLoaded(function () {
            const portfolio = $('.special-menu');
            portfolio.on('click', 'button', function () {
                $(this).addClass('active').siblings().removeClass('active');
                const filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });

            const $grid = $('.special-list').isotope({
                itemSelector: '.special-grid'
            });
        });

        // My buttons toggle
        const order = document.querySelector('.order-by');
        if (order) { // Check if the element exists
            order.onclick = function () {
                const mybuttons = document.getElementById("mybuttons");
                if (mybuttons) {
                    mybuttons.style.display = (mybuttons.style.display === "block") ? "none" : "block";
                }
            };
        }
    });
})(jQuery);