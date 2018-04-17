$(window).scroll(function () {
	if ($(window).scrollTop() >= 100) {
		$('#mainNavbarContainer').addClass('navbarScroll');
	} else {
		$('#mainNavbarContainer').removeClass('navbarScroll');
	}
});