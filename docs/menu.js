var sidebar;
var content;

window.onload = function () {
    sidebar = document.getElementById("menu");
    content = sidebar.getElementsByTagName("iframe")[0];
    content.contentDocument.onload = function () {
        sidebar.innerHTML = content.document.innerHTML;
    }
}