'use strict';

$(document).ready(function() {

    $(window).scroll(function() {
        var scrollVar = $(window).scrollTop();
        $('.page-header-content').css({
            'opacity': (250 - scrollVar) / 100
        });
    });

    $('.notice').sticky({
        topSpacing: 0,
        getWidthFrom: '.sticky'
    });

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

    function getProject(url) {
        $.ajax({
            type: 'GET',
            url: url,
            success: showProject
        });
    }



    function showProject(data) {
        $('.project-window').fadeOut(function() {
            $('.project-window').html(data);
            $('.root').on('click', function(e) {
                e.preventDefault();
                getProject('/projects-list.html');
            });
            $('.project-item-link').on('click', function(e) {
                e.preventDefault();
                var url = $(this).attr('href');
                console.log('loading ' + url + '...');
                getProject(url);
            });
            initCarousel();
        }).fadeIn();
    }



    getProject('/projects-list.html');



});