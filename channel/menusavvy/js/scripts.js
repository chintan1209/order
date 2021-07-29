$(function() {
    AOS.init({
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)

        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 30, // offset (in px) from the original trigger point
        delay: 80, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease-in-out-quart', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
});

(function($) {
    "use strict";

    // Enable Bootstrap tooltips via data-attributes globally
    $('[data-toggle="tooltip"]').tooltip();

    // Enable Bootstrap popovers via data-attributes globally
    $('[data-toggle="popover"]').popover();

    $(".popover-dismiss").popover({
        trigger: "focus"
    });

    // Activate Feather icons
    feather.replace();

    // Activate Bootstrap scrollspy for the sticky nav component
    $("body").scrollspy({
        target: "#stickyNav",
        offset: 82
    });

    // Scrolls to an offset anchor when a sticky nav link is clicked
    $('.nav-sticky a.nav-link[href*="#"]:not([href="#"])').click(function() {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate({
                        scrollTop: target.offset().top - 81
                    },
                    200
                );
                return false;
            }
        }
    });

    // Collapse Navbar
    // Add styling fallback for when a transparent background .navbar-marketing is scrolled
    var navbarCollapse = function() {
        if ($(".navbar-marketing.bg-transparent.fixed-top").length === 0) {
            return;
        }
        if ($(".navbar-marketing.bg-transparent.fixed-top").offset().top > 0) {
            $(".navbar-marketing").addClass("navbar-scrolled");
        } else {
            $(".navbar-marketing").removeClass("navbar-scrolled");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // $('#collapsePrimary').on('shown.bs.collapse', function() {
    //     console.log("shown");
    // }).on('show.bs.collapse', function() {
    //     console.log("show");
    // });

})(jQuery);


$(function() {


    $(".custom-file-dynamic-upload input").change(function() {

        var formData = new FormData();
        formData.append('photo', $('input[type=file]')[0].files[0]);

        $("#loading").show();

        $.ajax({
            url: "/image/userupload", // Url to which the request is send
            type: "POST", // Type of request to be send, called as method
            data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
            contentType: false, // The content type used when sending data to the server.
            cache: false, // To unable rsequest pages to be cached
            processData: false, // To send DOMDocument or non processed data file it is set to false
            success: function(data) // A function to be called if request succeeds
            {


                $("#cover-image").attr('src', data.url);
                $("#featured-media-id").attr('value', data.media_id);
                $("#photo-url").attr('value', data.url);

                setTimeout(function() {
                    $("#loading").hide();
                }, 500);

                //                $('#loading').hide();
                //                $("#message").html(data);
            }
        });
    });

});

//Enable popovers everywhere
$(function() {
    $('[data-toggle="popover"]').popover()
});

//Enable tooltips everywhere
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
});

$('#carouselDesktop').carousel({
    interval: 3000
});

$('.carousel-desktop .carousel-item').each(function() {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    for (var i = 0; i < 2; i++) {
        next = next.next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }

        next.children(':first-child').clone().appendTo($(this));
    }
});