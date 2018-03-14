var currRSSData = null;
function changeRSSSrc()
{
    var feedURL = prompt("Enter your RSS feed URL:");
    var url = "./getFeedData?url=" + feedURL;
    loadRSS(url);
}

function loadRSS(url) {
    loadFile(url, function(resData){
        try {
            currRSSData = JSON.parse(resData).feed.results;
        } catch(err) {
            console.log(err.message);
        }
        var markup = "";
        for(var i = 0; i < currRSSData.length; i++){
            var entry = currRSSData[i];
            var thumb = entry.artworkUrl100;
            var name = entry.name;
            var artist = entry.artistName;
            markup += "<button onclick='itemSelected(" + i + ")'><img src='" + thumb + "'><h1>" + name+ "</h1><h2>" + artist + "<h2></button>";
        }
        $("#theList").html(markup);
    });
}

function itemSelected(n)
{
    var data = currRSSData[n];
    var markup = JSON.stringify(data); //Used for troubleshooting

    var thumbnail = (currRSSData[n].artworkUrl100) ? "<img src=" + currRSSData[n].artworkUrl100 + "></img>" : "";
    var artistName = (currRSSData[n].artistName) ? "<a href = " + currRSSData[n].artistUrl + " target=\"_blank\">" + currRSSData[n].artistName + "</a>" : "";
    var name = (currRSSData[n].name) ? "<a href = " + currRSSData[n].url + " target=\"_blank\">" + currRSSData[n].name + "</a>" : "";
    var collectionName = (currRSSData[n].collectionName) ? currRSSData[n].collectionName : "";
    var releaseDate = (currRSSData[n].releaseDate) ? "<h4>Published: " + currRSSData[n].releaseDate + "</h4>" : "";
    var copyright = (currRSSData[n].copyright) ? "<h4>" + currRSSData[n].copyright + "</h4>" : "";

    var genre = (currRSSData[n].genres) ? function() {
        if (currRSSData[n].genres[1]) {
            var tmp = currRSSData[n].genres[0]
            currRSSData[n].genres[0] = currRSSData[n].genres[1];
            currRSSData[n].genres[1] = tmp;
        }
        var genre = "<h4>" + currRSSData[n].genres[0].name;
        for (var i = 1; i < currRSSData[n].genres.length; i++) {
            genre += " | " + currRSSData[n].genres[i].name;
        }
        return genre + "</h4>";
    } : "";

    switch(currRSSData[n].kind) { //Switch the details displayed based on the different kinds of RSS feeds
        case "song":                //Feeds must come from https://rss.itunes.apple.com/en-us
        case "musicVideo":
            artistName = "<h4>Artists: " + artistName + "</h4>";
            name = "<h4>Track: " + name + "</h4>";
            collectionName = "<h4>Album: " + collectionName + "</h4>";
            releaseDate = "<h4>Released: " + releaseDate + "</h4>";
            break;
        case "iosSoftware":
        case "Application":
            artistName = "<h4>Developer: " + artistName + "</h4>";
            name = "<h4>App Name: " + name + "</h4>";
            break;
        case "book":
        case "epubBook":
            artistName = "<h4>Author: " + artistName + "</h4>";
            name = "<h4>Title: " + name + "</h4>";
            break;
        case "tvEpisode":
            artistName = "<h4>Series: " + artistName + "</h4>";
            name = "<h4>Episode Title: " + name + "</h4>";
            collectionName = "<h4>Season: " + collectionName + "</h4>";
            releaseDate = "<h4>Released: " + releaseDate + "</h4>";
            break;
        case "movie":
            artistName = "<h4>Director: " + artistName + "</h4>";
            name = "<h4>Title: " + name + "</h4>";
            releaseDate = "<h4>Released: " + releaseDate + "</h4>";
            break;
        case "course":
            artistName = "<h4>Author: " + artistName + "</h4>";
            name = "<h4>Course Title: " + name + "</h4>";
            break;
        case "podcast":
            artistName = "<h4>Host: " + artistName + "</h4>";
            name = "<h4>Title: " + name + "</h4>";
            break;
        default:
            var markup = "Failed to parse RSS feed";
            break;
    }
    markup = thumbnail + artistName + releaseDate + name + genre() + copyright;
    $("#theDetails").html(markup);
    if (currRSSData[n].genres[1]) {
        var tmp = currRSSData[n].genres[0]
        currRSSData[n].genres[0] = currRSSData[n].genres[1];
        currRSSData[n].genres[1] = tmp;
    }
}
