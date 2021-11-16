var search = location.search;
var pagename;
var pageurl;

window.onload = function () {
    pageurl = search.substring(1);
    pagename = pageurl.replaceAll("__", "/underscore/").replaceAll("_", " ").replaceAll("/underscore/", "_");
    document.title = pagename + " " + document.title;
    document.getElementById("title").innerHTML = pagename;
    loadpage();
}

function loadpage() {
    var file = loadfile();
    file.then(value => {
        //document.getElementById("content").innerHTML = value;
        if (value.includes("#endinfo")) {
            var infosplit = value.split("#endinfo");

            var info = infosplit[0];
            var infolines = info.split("\n");
            var htmlInfoResult = "";
            for (var i = 0; i < infolines.length; i++) {
                htmlInfoResult += infolines[i] + "<br>";
            }

            htmlInfoResult = htmlInfoResult.substring(0, htmlInfoResult.lastIndexOf("<br>"));

            var infoObject = document.getElementById("info");
            infoObject.innerHTML = htmlInfoResult;
            infoObject.hidden = false;

            var cutout = infosplit[1];
        }

        else {
            var cutout = value;
        }

        var formatted = cutout.replacepair("**", "<b>", "</b>").replacepair("__", "<u>", "</u>").replacepair("*", "<i>", "</i>").replacepair("_", "<i>", "</i>").replacepair("--", "<strike>", "</strike>").linkify();

        var paragrapharray = formatted.split("\n");
        var paragraphed = "";
        var ulist = false;
        for (var i = 0; i < paragrapharray.length; i++) {
            var line = paragrapharray[i];
            var headerType = 0;
            var islistitem = false;

            if (line[0] == '-') {
                islistitem = true;
                if (!ulist) {
                    ulist = true;
                    paragraphed += "<ul>";
                }

                line = line.replace("-", "");
                line = "<li>" + line + "</li>";
            }

            else if (!(line[0] == '-') && ulist) {
                ulist = false;
                paragraphed += "</ul>";
            }

            while (line[0] == '#') {
                headerType++;
                line = line.replace("#", "");
            }

            if (headerType > 0) {
                headerType += 1;
                paragraphed += "<h" + headerType + ">" + line + "</h" + headerType + ">\n";
            }

            else if (!islistitem) {
                paragraphed += "<p>" + line + "</p>\n";
            }

            else {
                paragraphed += line;
            }
        }

        document.getElementById("content").innerHTML = paragraphed;
    });

    file.catch(function () {
        alert("uh oh, something went wrong, we're very sorry")
    });
}

async function loadfile() {
    const response = await fetch("pages/" + pageurl + ".txt");
    const data = await response.text();

    return data;
}

String.prototype.replacepair = function (search, replace1, replace2) {
    var result = this;
    var first = true;
    while (result.includes(search)) {
        if (first) {
            result = result.replace(search, replace1);
        }

        else {
            result = result.replace(search, replace2);
        }

        first = !first;
    }

    return result;
}

String.prototype.linkify = function () {
    var result = this;
    var start;
    var end;
    var link;
    var destination;
    while (result.includes("[") && result.includes("](") && result.includes(")")) {
        start = result.indexOf("[");
        end = result.indexOf("](");
        link = result.substring(start + 1, end);

        start = end;
        end = result.indexOf(")");
        destination = result.substring(start + 2, end);

        result = result.replace("[" + link + "](" + destination + ")", "<a href=\"" + "page.html?" + destination + "\">" + link + "</a>");
    }

    return result;
}