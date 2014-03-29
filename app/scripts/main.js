'use strict';

$(document).ready(function() {

    // fade header content on downward scroll
    $(window).scroll(function() {
        var scrollVar = $(window).scrollTop();
        $('.page-header-content').css({
            'opacity': (250 - scrollVar) / 100
        });
    });

    // sticky notice bar
    $('.notice').sticky({
        topSpacing: 0,
        getWidthFrom: '.sticky'
    });

    // init owl carousel
    function initCarousel() {
        var owl = $('#owl-demo');

        owl.owlCarousel({
            autoplay: 3000,
            slideSpeed: 750,
            lazyLoad: true,
            navigation: true,
            singleItem: true,
            pagination: true,
            lazyEffect: 'fade',
            itemsDesktop: [1199, 4],
            itemsDesktopSmall: [979, 4]
        });

        $('.item').click(function() {
            owl.trigger('owl.next');
        });
    }

    var projectWindow = $('.project-window');

    // get project html and display it in .project-window
    function getProject(url) {

        $('.loading-spinner').fadeIn();

        projectWindow.fadeOut(function() {

            $(this).load(url, function() {
                initCarousel();

                // re-bind event handlers
                $('.root').on('click', function(e) {
                    e.preventDefault();
                    getProject('/project-list.html');
                });

                $('.project-item-link').on('click', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('href');

                    // Prevent multiple clicks within 3s window
                    if (!$(this).data('isClicked')) {
                        var link = $(this);
                        getProject(url);

                        link.data('isClicked', true);
                        setTimeout(function() {
                            link.removeData('isClicked');
                        }, 3000);
                    }
                });
                $('.loading-spinner').fadeOut();
            });
        }).fadeIn();

        console.log('loading ' + url + '...');
    }

    // display project list initially
    getProject('/project-list.html');

});