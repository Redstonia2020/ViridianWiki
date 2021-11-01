var search = location.search;
var pagename;
var pageurl;

window.onload = function () {
    pageurl = search.substring(1);
    pagename = pageurl.replace("_", " ");
    document.title = pagename + " " + document.title;
    document.getElementById("title").innerHTML = pagename;
    loadpage();
}

function loadpage() {
    loadfile().then((value) => {
        document.getElementById("content").innerHTML = value;
    });
}

async function loadfile() {
    const response = await fetch("pages/" + pageurl + ".txt");
    const data = await response.text();

    return data;
}