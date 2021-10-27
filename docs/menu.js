var sidebar;
var content;

window.onload = function () {
    sidebar = document.getElementById("menu");
    content = sidebar.getElementsByTagName("iframe")[0].contentDocument;
    sidebar.innerHTML = content.document.innerHTML;
}