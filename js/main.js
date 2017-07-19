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

    // Add tabIndex to all focusable elements, because on '#menu-icon' click some buttons will toggle this tabIndex (0 / -1)
    $('#logo, #menu-icon, #start-button, .about-button, #map-button, #msg-button, .stop-focus, input, textarea, .social-icons').attr('tabIndex', '0');

    // Transforming hamburger menu-icon to closing X-icon
    $('#menu-icon').on('mousedown', function(e) {
        $(this).toggleClass('change');
    	$('#main-nav').toggleClass('showHide');
        $('#top-bar-wrapper').toggleClass('topbar-hamburger-on');
        $('#main-nav>li').removeClass('animated bounceInRight');
        $('#link-portfolio, #link-technology, #link-contact').addClass('animated bounceInLeft');
        $('#link-offer, #link-team').addClass('animated bounceInRight');
        $('#start-button, .about-button, #map-button, #msg-button, .stop-focus, input, textarea, .social-icons').attr('tabIndex', function(index, attr) {
             return attr == 0 ? -1 : 0;
        });
        e.preventDefault();
    });

    // Add enter behavior as a click
    $('#menu-icon, #logo').on('keydown', function(e) {
        if(e.which === 13) {
            $(this).mousedown();
        }
    });

    // Flip effect
    $('.flip-container').on('click', function() {
        $(this).toggleClass('clicked');
    });

    // Slide show/hide team-member details
    var prevBtn;
    $('.about-button').on('mousedown', function(e) {
        var $parent = $(this).parent();
        var btn = this.id;
        if (btn != prevBtn && $(window).width() < 950) {
             reset($parent.parent());
        }
        prevBtn = btn;
        $parent.find('.space').css('height', $parent.find('.about-member-info').height()+'px');
        customSlideToggle($parent.find('.about-member-info'));
        $parent.find('.space').slideToggle(600);
        e.preventDefault();
    });

    // Adjust space under team-member when resizing the window
    $(window).resize(function() {
        $('.space').css('height', $('.about-member-info').height()+'px');
    });

    // Removes focus after click or using tab -> enter
    $('.social-icons, .stop-focus').on('click', function() {
        $(this).blur();
    });

    // Show/hide google maps in contact area
    $('#map-button').on('click', function() {
        $(this).blur();
    	$('#contact-container').toggleClass('mapToggle');
    	$('#google-map-container').toggleClass('active');
    	$(this).text(function(index, text) {
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
	$('#logo').on('mousedown', function(e) {
   	    $(window).scrollTo($('body'), 1000);
        clearMenu();
        e.preventDefault();
   	});
   	$('#link-portfolio, #start-button').on('click', function() {
   		$(window).scrollTo($('#portfolio'), 1000);
        $(this).blur();
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
        $('#start-button, .about-button, #map-button, #msg-button, .stop-focus, input, textarea, .social-icons').attr('tabIndex', '0');
    }

    // Acts like a slideToggle but for 'visibility: hidden' elements
    function customSlideToggle(e) {
        if (e.hasClass('hidden')) {
            e.hide();
            e.removeClass('hidden')
            e.slideDown(600, function() {
                // Sets window to properly see sliding text
                if ($(window).width() < 550) {
                    $(window).scrollTo(e.parent().parent().children('h4'), 600);
                } else if ($(window).width() < 950)  {
                    $(window).scrollTo(e.parent().parent().children('img'), 600);
                }
            });
        } else {
            e.slideUp(600, function() {
                e.addClass('hidden');
            });
        }
    }

    // Slides up info (text) when clicked another button to show another info
    function reset(e) {
        e.find('.about-member-info').each(function() {
            if (!$(this).hasClass('hidden')) {
                $(this).slideUp(600, function() {
                    $(this).addClass('hidden');
                });
            }
        });
        e.find('.space').each(function() {
            if ($(this).css('display') == 'block') {
                $(this).slideUp(600);
            }
        });
    }
});
