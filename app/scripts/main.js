'use strict';

(function() {

    // Fancy header fading on scroll.
    // Decided to disable to improve page-scrolling performance.
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

    // Sticky Notice Bar
    // $('.notice').sticky({
    //     topSpacing: 0,
    //     getWidthFrom: '.sticky'
    // });

    // Set header height to 60% of window height
    (function bigOlHeader() {
        var windowH = $(window).height();
        var header = $('.page-header');

        if (windowH > 700) {
            header.css(
                'height', $(window).height() * 0.6
            );
        }
    })();

    // Delayed reveal of header content
    (function revealHeader() {
        var headerChildren = $('.page-header').children();

        headerChildren.each(function() {
            $(this).toggleClass('hidden');
        });
    })();

    // Init owl carousel
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

    // Project Viewing Component
    var projectWindow = $('.project-window');
    projectWindow.css('min-height', '800px');

    projectWindow.on('click', '.project-item-link', function(e) {
        e.preventDefault();

        // Not initial page load, so enable auto-scrolling
        initPageLoad = 0;

        // $('.page-content').css('border-color', $(this).data('color'));

        $('.project-item-link').not($(this)).parent().toggleClass('hidden');

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

    // Disable project window auto-scroll if initial page load
    var initPageLoad = 1;

    // Get project html and display it in .project-window
    function getProject(url) {
        $('.loading-spinner, .project-window header').toggleClass('hidden');

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
                        offset: 20,
                        speed: 400,
                        easing: 'swing'
                    });
                } else {
                    loadProject(url);
                }
            });
    }

    // Load and add project html to project window
    function loadProject(url) {
        // Give the fade animation some margin to avoid sudden flash of loaded content
        setTimeout(function() {

            // load the project into project window
            projectWindow.load(url, function() {

                $(this).css('height', 'auto');

                // after load, do this stuff
                initCarousel();
                $('.project-nav').sticky({
                    topSpacing: 0,
                    getWidthFrom: '.wrapper'
                });
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

    // Display project list initially
    setTimeout(function() {
        getProject('/projects/project-list.html');
    }, 800);


})();