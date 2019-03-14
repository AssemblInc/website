function initDownloader() {
    var downloadBtn = document.getElementById("download-btn");
    var otherBtn = document.getElementById("other-btn");
    var appName = document.getElementById("app-name");
    var appVersion = document.getElementById("app-version");

    if (navigator.platform == "Win32") {
        downloadBtn.innerHTML = "Download for Windows";
        downloadBtn.style.display = "inline-block";
        otherBtn.innerHTML = "Other platforms";
    }
    else if (navigator.platform == "MacIntel") {
        downloadBtn.innerHTML = "Download for Mac";
        downloadBtn.style.display = "inline-block";
        otherBtn.innerHTML = "Other platforms";
    }
    else if (navigator.platform.indexOf("Linux") > -1) {
        downloadBtn.innerHTML = "Download for Linux";
        downloadBtn.style.display = "inline-block";
        otherBtn.innerHTML = "Other platforms";
    }
    else {
        downloadBtn.innerHTML = "";
        downloadBtn.style.display = "none";
        otherBtn.innerHTML = "Download";
    }

    appVersion.parentNode.style.marginRight = (-1 * Math.round(appVersion.offsetWidth * 0.5))+"px";
}

document.addEventListener("DOMContentLoaded", initDownloader);