document.getElementById("scroll").className = "invisible";

document.addEventListener('DOMContentLoaded', function () {
    window.onscroll = function (ev) {
        document.getElementById("scroll").className = (window.pageYOffset > 100) ? "visible" : "invisible";
    };
});