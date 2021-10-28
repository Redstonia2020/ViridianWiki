var sidebar;
var content;

function loadmenu() {
    sidebar = document.getElementById("menu");
    content = sidebar.getElementsByTagName("iframe")[0];
    sidebar.innerHTML = content.contentDocument.body.innerHTML;
}