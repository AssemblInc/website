function onScrollEvent(noScrollCheck) {
    var expandMore = document.getElementById("expand-more-content");
    var scrollTop = document.getElementsByTagName("html")[0].scrollTop || document.getElementsByTagName("body")[0].scrollTop;
    var splashHeight = document.getElementById("splash").clientHeight * 0.7;
    var scrollPerc = scrollTop / splashHeight;
    var scrollPercAlmost = scrollPerc;
    if (scrollPercAlmost > 0.75) {
        scrollPercAlmost = 0.75;
    }
    var scrollPercExtra = scrollPerc * 1.4;
    if (scrollPercExtra > 1) {
        scrollPercExtra = 1;
    }
    if ((scrollTop >= 0 && scrollTop < splashHeight + 200) || noScrollCheck === true) {
        var splash = document.getElementById("splash");
        var splashInner = document.getElementById("splash-inner");
        splash.style.opacity = 1 - scrollPercAlmost;
        splashInner.style.opacity = 1 - scrollPercExtra;
        splashInner.style.top = -(scrollPerc * 250) + "px";
        if (scrollPercExtra >= 0.5) {
            splash.style.pointerEvents = "none";
        }
        else {
            splash.style.pointerEvents = "auto";
        }
    }
    if (scrollTop > 0) {
        expandMore.className = "contract";
        var mainHeader = document.getElementById("main-header");
        if (scrollTop >= splashHeight) {
            if ((scrollTop < splashHeight + 200) || noScrollCheck === true) {
                mainHeader.style.top = -(scrollTop - splashHeight) + "px";
            }
        }
        else {
            mainHeader.style.top = "0px";
        }
    }
    else {
        expandMore.className = "expand";
    }
}

function initEffects() {
    document.onscroll = onScrollEvent;
    onScrollEvent(true);
    if (window.location.hash.length > 1) {
        loadContent(window.location.hash.substring(3));
        window.addEventListener("load", function() {
            setTimeout(function() {
                if (document.getElementsByTagName("html")[0].scrollTop == 0 && document.getElementsByTagName("body")[0].scrollTop == 0) {
                    expandMoreContent(true);
                }
            }, 50);
        });
    }
    else if (getParameterByName("_escaped_fragment_") != null) {
        // for GoogleBot etc.
        // see https://www.searchenginepeople.com/blog/anchor-links.html
        loadContent(getParameterByName("_escaped_fragment_"));
        window.addEventListener("load", function() {
            setTimeout(function() {
                if (document.getElementsByTagName("html")[0].scrollTop == 0 && document.getElementsByTagName("body")[0].scrollTop == 0) {
                    expandMoreContent(true);
                }
            }, 50);
        });
    }
    else {
        loadContent("home", true);
    }
}

document.addEventListener("DOMContentLoaded", initEffects);

function expandMoreContent(expand) {
    console.log("Expanding", expand);
    if (expand) {
        if (window.innerWidth > 520) {
            document.getElementsByTagName("html")[0].scrollTop = window.innerHeight - 217;
            document.getElementsByTagName("body")[0].scrollTop = window.innerHeight - 217;
        }
        else {
            document.getElementsByTagName("html")[0].scrollTop = window.innerHeight - 192;
            document.getElementsByTagName("body")[0].scrollTop = window.innerHeight - 192;
        }
    }
    else {
        document.getElementsByTagName("html")[0].scrollTop = 0;
        document.getElementsByTagName("body")[0].scrollTop = 0;
    }
}

var loadedContent = "";
function loadContent(cardGroup, doNotExpand) {
    if (cardGroup != loadedContent) {
        expandMoreContent(false);
        var cards = document.getElementsByClassName("card");
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.display = 'none';
        }
        var groupedCards = document.getElementsByClassName("cardgroup-"+cardGroup);
        if (groupedCards.length > 0) {
            var amountOnLeft = 0;
            var amountOnRight = 0;
            for (var i = 0; i < groupedCards.length; i++) {
                groupedCards[i].style.display = 'block';
                if (groupedCards[i].className.indexOf("content-left") > -1) {
                    amountOnLeft += 1;
                }
                else if (groupedCards[i].className.indexOf("content-right") > -1) {
                    amountOnRight += 1;
                }
            }

            if (amountOnRight < 1) {
                document.getElementById("cards-left").className = "cards-full";
                document.getElementById("cards-right").className = "cards-hidden";
            }
            else if (amountOnLeft < 1) {
                document.getElementById("cards-left").className = "cards-hidden";
                document.getElementById("cards-right").className = "cards-full";
            }
            else {
                document.getElementById("cards-left").className = "";
                document.getElementById("cards-right").className = "";
            }
        }
        else {
            console.warn("Tried loading an empty cardgroup!");
            loadContent("home", doNotExpand);
        }
        if (!doNotExpand) {
            expandMoreContent(true);
        }
        loadedContent = cardGroup;
        window.location.hash = '#!/'+cardGroup;
        document.location.hash = '#!/'+cardGroup;
    }
}

window.addEventListener("hashchange", function() {
    loadContent(window.location.hash.substring(3));
});