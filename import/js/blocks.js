function scrollToAnchor(aid){
	var aTag = $("[data-blockname='"+ aid +"']");
	$('html,body').animate({scrollTop: aTag.offset().top}, 400);
}

function scrollToTop() {
	$('html,body').animate({scrollTop: 0}, 200);
}

if (location.hash) {
	setTimeout(function() {
		scrollToAnchor(location.hash.replace("#",""));
	}, 10);
}

var backToTopShown = false;
$(document).ready(function() {
	$(document).scroll(function() {
		var blockHeight = $(".block").first().outerHeight();
		var scrollTop = $(document).scrollTop();
		if (scrollTop >= blockHeight) {
			if (!backToTopShown) {
				// start displaying back button as soon as user fully reaches first block
				$("#back-to-top").css({top: 8});
				backToTopShown = true;
			}
		}
		else {
			if (backToTopShown) {
				// hide back-to-top button
				$("#back-to-top").css({top: -100});
				backToTopShown = false;
			}
		}
	});
	
	// on document ready the scoll event should be fired because of title anchors!
	$(document).scroll();
});