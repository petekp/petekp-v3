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
    $('.notice').sticky({
        topSpacing: 0,
        getWidthFrom: '.sticky'
    });

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

        $('.project-item-link').not($(this)).parent().addClass('hidden');

        // get project url
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

    // get project html and display it in .project-window
    function getProject(url) {

        $('.loading-spinner').toggleClass('hidden');

        projectWindow
            .addClass('hidden')
            .on('transitionend webkitTransitionEnd', function(e) {
                e.stopPropagation();

                projectWindow.off('transitionend webkitTransitionEnd');

                setTimeout(function() {
                    projectWindow.load(url, function() {
                        initCarousel();
                        $('.loading-spinner').toggleClass('hidden');
                        $('.project-window').removeClass('hidden')
                            .on('transitionend webkitTransitionEnd', function(e) {
                                e.stopPropagation();
                                projectWindow.off('transitionend webkitTransitionEnd');
                            });
                    });
                }, 500);
            });
    }

    // display project list initially
    getProject('/projects/project-list.html');

});