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
    var file = loadfile();
    var thing;
    file.then(value => {
        document.getElementById("content").innerHTML = value;
        thing = value;
    });

    file.catch(function () {
        alert("uh oh, something went wrong, we're very sorry")
    });
    return thing;
}

async function loadfile() {
    const response = await fetch("pages/" + pageurl + ".txt");
    const data = await response.text();

    return data;
}