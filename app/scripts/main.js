'use strict';

$(document).ready(function() {

    /*
        Fancy header fading on scroll.
        Disabled to improve page performance.
    */

    // $(window).scroll(function() {
    //     var scrollVar = $(window).scrollTop(),
    //         pageHeaderContent = $('.page-header__content'),
    //         pageHeaderBg = $('.page-header__bg');
    //     pageHeaderContent.css({
    //         'opacity': (250 - scrollVar) / 100
    //     });
    //     pageHeaderBg.css({
    //         'opacity': (300 - scrollVar) / 300
    //     });
    // });

    // sticky notice bar
    // $('.notice').sticky({
    //     topSpacing: 0,
    //     getWidthFrom: '.sticky'
    // });
    (function bigOlHeader() {
        var windowH = $(window).height();
        var header = $('.page-header');

        if (windowH > 700) {
            header.css(
                'height', $(window).height() * 0.6
            );
        }
    })();


    // init owl carousel
    function initCarousel() {
        var owl = $('#owl-demo');

        owl.owlCarousel({
            slideSpeed: 750,
            navigation: true,
            singleItem: true,
            pagination: true
        });

        $('.item').click(function() {
            owl.trigger('owl.next');
        });
    }

    var projectWindow = $('.project-window');

    projectWindow.on('click', '.project-item-link', function(e) {
        e.preventDefault();

        // Not initial page load, so enable auto-scrolling
        initPageLoad = 0;

        $('.project-item-link').not($(this)).parent().addClass('hidden');

        // get project url
        var url = $(this).attr('href');

        // Prevent multiple clicks within 3s window
        if (!$(this).data('isClicked')) {
            getProject(url);
            var link = $(this);
            link.data('isClicked', true);

            setTimeout(function() {
                link.removeData('isClicked');
            }, 3000);
        }
    });

    // Disable auto-scroll on initial page load
    var initPageLoad = 1;

    // get project html and display it in .project-window
    function getProject(url) {
        $('.loading-spinner').toggleClass('hidden');

        projectWindow
            .addClass('hidden')
            .on('transitionend webkitTransitionEnd', function(e) {
                e.stopPropagation();
                projectWindow.off('transitionend webkitTransitionEnd');

                // If not initial page load, scroll to top of newly loaded projects
                if (initPageLoad !== 1) {
                    $.smoothScroll({
                        scrollTarget: '.page-content',
                        afterScroll: loadProject(url),
                        offset: -50,
                        speed: 400,
                        easing: 'swing'
                    });

                } else {
                    loadProject(url);
                }
            });
    }

    function loadProject(url) {
        // Give the fade animation some margin to avoid sudden flash of loaded content
        setTimeout(function() {

            // load the project into project window
            projectWindow.load(url, function() {

                // after load, do this stuff
                initCarousel();
                $('.loading-spinner').toggleClass('hidden');
                projectWindow
                    .removeClass('hidden')
                    .on('transitionend webkitTransitionEnd', function(e) {
                        e.stopPropagation();
                        projectWindow.off('transitionend webkitTransitionEnd');

                    });
            });
        }, 400);
    }

    // display project list initially
    getProject('/projects/project-list.html');

});