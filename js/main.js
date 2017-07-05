$(document).ready(function() {

    // Changing background of top navigation bar when page is scrolled
	$(document).on('scroll', function() {
	   var topNav = $('#top-bar-wrapper');
        topNav.toggleClass('scrolled', $(this).scrollTop() > topNav.height());
    });
    if ($(window).scrollTop() > 100) {
        $('#top-bar-wrapper').addClass('scrolled');
    } else {
        $('#top-bar-wrapper').removeClass('scrolled');
    }

	// Transforming hamburger menu-icon to closing X-icon
    $('#menu-icon').on('click', function() {
        $(this).toggleClass('change');
    	$('#main-nav').toggleClass('showHide');
        $('#top-bar-wrapper').toggleClass('topbar-hamburger-on');
        $('#link-portfolio, #link-technology, #link-contact').addClass('animated bounceInLeft');
        $('#link-offer, #link-team').addClass('animated bounceInRight');
    });

    // Flip effect
    $('.flip-container').on('click', function() {
        $(this).toggleClass('clicked');
    });

    // Slide show/hide team-member details
    $('.about-button').on('click', function() {
    	$(this).parent().children('.about-member').slideToggle();
    });

    // Show/hide google maps in contact area
    $('#map-button').on('click', function() {
    	$('#contact-container').toggleClass('mapToggle');
    	$('#google-map-container').toggleClass('active');
    	$(this).text(function(i, text) {
    		return text === "Show map" ? "Hide map" : "Show map";
    	}); 
    });

    // Google map active only after click
    $('#google-map').addClass('mapScrollOff');
	$('#google-map-container').on('click', function () {		// when clicked, set the mouse events free
        $('#google-map').removeClass('mapScrollOff');
    });
    $('#google-map').mouseleave(function () {		// when mouse leaves the map, disable scroll again
    	$(this).addClass('mapScrollOff');
   	});

    // Smooth scroll navigation links (https://github.com/flesler/jquery.scrollTo)
    $.extend($.scrollTo.defaults, {
    	// change default settings here
    	// adjusting to fixed navigation bar, which is always on top (width: 79px)
    	offset: {top: -79}
	});
	// after comma put time length in ms
	$('#logo').on('click', function() {
   	    $(window).scrollTo($('body'), 1000);
        clearMenu();
   	});
   	$('#link-portfolio, #start-button').on('click', function() {
   		$(window).scrollTo($('#portfolio'), 1000);
        clearMenu();
   	});
   	$('#link-offer').on('click', function() {
   		$(window).scrollTo($('#offer'), 1000);
        clearMenu();
   	});
   	$('#link-technology').on('click', function() {
   		$(window).scrollTo($('#technology'), 1000);
        clearMenu();
   	});
    $('#link-team').on('click', function() {
   		$(window).scrollTo($('#team'), 1000);
        clearMenu();
   	});
   	$('#link-contact').on('click', function() {
   		$(window).scrollTo($('#contact'), 1000);
        clearMenu();
   	});

    // Removing hamburger menu options after click in some menu button
    function clearMenu() {
        $('#menu-icon').removeClass('change');
        $('#main-nav').removeClass('showHide');
        $('#top-bar-wrapper').removeClass('topbar-hamburger-on');
    }
});