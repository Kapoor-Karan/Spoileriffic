document.querySelector( "#nav-toggle" ).addEventListener( "click", function() {
    this.classList.toggle( "active" );
    $('.nav-link').toggleClass('show');
    $('.icon-link').toggleClass('show');    
    $('.top-left__corner').toggleClass('shrink-height');
    $('.bottom-right__corner').toggleClass('shrink-width');
});
