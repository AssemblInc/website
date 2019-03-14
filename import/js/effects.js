function onScrollEvent() {
    var scrollTop = document.getElementsByTagName("html")[0].scrollTop || document.getElementsByTagName("body")[0].scrollTop;
    var splashHeight = document.getElementById("splash").clientHeight * 0.67;
    var scrollPerc = scrollTop / splashHeight;
    var scrollPercAlmost = scrollPerc;
    if (scrollPercAlmost > 0.75) {
        scrollPercAlmost = 0.75;
    }
    var scrollPercExtra = scrollPerc * 1.4;
    if (scrollPercExtra > 1) {
        scrollPercExtra = 1;
    }
    document.getElementById("splash").style.opacity = 1 - scrollPercAlmost;
    document.getElementById("splash-inner").style.opacity = 1 - scrollPercExtra;
    document.getElementById("splash-inner").style.top = -(scrollPerc * 250) + "px";
    if (scrollTop > 0) {
        document.getElementById("expand-more-content").className = "contract";
        if (scrollTop >= splashHeight) {
            if (scrollTop < splashHeight + 500) {
               document.getElementById("main-header").style.top = -(scrollTop - splashHeight) + "px";
            }
        }
        else {
            document.getElementById("main-header").style.top = "0px";
        }
    }
    else {
        document.getElementById("expand-more-content").className = "expand";
    }
}

function initEffects() {
    document.onscroll = onScrollEvent;
    onScrollEvent();
}

document.addEventListener("DOMContentLoaded", initEffects);

function expandMoreContent(expand) {
    console.log("Expanding", expand);
    if (expand) {
        document.getElementsByTagName("html")[0].scrollTop = window.innerHeight - 240;
        document.getElementsByTagName("body")[0].scrollTop = window.innerHeight - 240;
    }
    else {
        document.getElementsByTagName("html")[0].scrollTop = 0;
        document.getElementsByTagName("body")[0].scrollTop = 0;
    }
}