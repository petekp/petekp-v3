'use strict';

$(document).ready(function() {

    $('.notice').sticky({
        topSpacing: 0,
        getWidthFrom: '.sticky'
    });

    var owl = $('#owl-demo');
     
    owl.owlCarousel({
        autoplay: 3000,
        slideSpeed: 750,
        lazyLoad : true,
        navigation : true,
        singleItem: true,
        pagination: true,
        lazyEffect: 'fade',
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 4]
    });

    $('.item').click(function(){
        owl.trigger('owl.next');
    });
});