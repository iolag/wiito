//globals
var releasedate;
var type;
var posteromdb;
var delayforfirstresult;
var utellydata;
//save imdb id to cross with availability() data and type to not look up poster if type series



function search(resultcount) {
    document.getElementById("movietitle").style.width = "width: 94vw;"
    document.getElementById("notfound").innerHTML = " ";
    let url = "https://www.omdbapi.com/?apikey=965559d8&i=" + utellydata[resultcount].external_ids.imdb.id;
    // fetching data from the omdb api 
    fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            if (data.Title === undefined) {
                document.getElementById("notfound").innerHTML = "Movie/Show not found.";
                document.getElementById("scores").style.display = "none";
                document.getElementById("availability").style.display = "none";
                document.getElementById("title").innerHTML = " ";
                document.getElementById("poster").src = " ";
                document.getElementById("year").innerHTML = " ";
                document.getElementById("rating").innerHTML = " ";
                document.getElementById("plot").innerHTML = "     ";
                document.getElementById("runtime").innerHTML = "  ";

                return;
            } else {
                if (data.Title.length < 30) {
                    document.getElementById("title").innerHTML = data.Title;
                } else {
                    document.getElementById("title").innerHTML = data.Title;
                    document.getElementById("title").style.fontSize = "0.9rem";
                }
                searchtitle = data.Title;
            }

            if (data.Year === "N/A") {
                document.getElementById("year").innerHTML = "N/A | ";
            } else {
                document.getElementById("year").innerHTML = data.Year + " | ";
                document.getElementById("runtime").style.display = "block"
                if (data.Year.length > 4) {
                    document.getElementById("runtime").style.display = "none"
                }
            }
            if (data.Rated === "N/A") {
                document.getElementById("rating").innerHTML = "N/A";
            } else if (data.Rated.toLowerCase() === "not rated") {
                document.getElementById("rating").innerHTML = "not Rated";
            } else {
                document.getElementById("rating").innerHTML = "Rated " + data.Rated;

            }
            if (data.Plot === "N/A") {
                document.getElementById("plot").innerHTML = "No plot available.";
            } else if (data.Plot.length > 165) {
                document.getElementById("plot").innerHTML = data.Plot.slice(0, 165) + "..."

            } else {
                document.getElementById("plot").innerHTML = data.Plot;
            }
            if (data.Title.length > 50) {
                document.getElementById("plot").innerHTML = data.Plot.slice(0, 90) + "..."
            }
            if (data.Runtime === "N/A") {
                document.getElementById("runtime").innerHTML = "N/A | ";
            } else {
                document.getElementById("runtime").innerHTML = data.Runtime + " | ";
            }

            document.getElementById("scores").style.display = "flex";
            // data.Ratings[0] imdb 2  rotten 3 metacr


            if (data.Ratings[2] === undefined) {
                document.getElementById("metascore").innerHTML = "N/A"
            } else {
                document.getElementById("metascore").innerHTML = data.Ratings[2].Value;
            }

            if (data.Ratings[1] === undefined) {
                document.getElementById("rottenscore").innerHTML = "N/A"
            } else {
                document.getElementById("rottenscore").innerHTML = data.Ratings[1].Value;
                if (data.Ratings[1].Value.split("%")[0] > 59) {
                    document.getElementById("rottenicon").src = "images/fresh.png"
                } else {
                    document.getElementById("rottenicon").src = "images/rotten.png"
                }
            }
            if (data.Ratings[0] === undefined) {
                document.getElementById("imdbscore").innerHTML = "N/A"
            } else {
                document.getElementById("imdbscore").innerHTML = data.Ratings[0].Value;
            }
            //now im gonna save the release date 
            releasedate = data.Year;

            //save imdb id to cross with availability() data and type to not look up poster if type serie              
            type = data.Type;
            posteromdb = data.Poster;
            poster();

            return
        });


}

function opacity(a) {
    let sec05 = "0.5s";
    let sec05poster = "0.5s";
    if (a === 100) {
        sec05poster = "0.25s";
        sec05 = "0.25s"
    }
    setTimeout(function () {
        document.getElementById("movieinfo").style.transitionDuration = sec05;
        document.getElementById("scores").style.transitionDuration = sec05;
        document.getElementById("availability").style.transitionDuration = sec05;
        document.getElementById("postercont").style.transitionDuration = sec05poster;
        document.getElementById("movieinfo").style.opacity = 1;
        document.getElementById("scores").style.opacity = 1;
        document.getElementById("availability").style.opacity = 1;
        document.getElementById("postercont").style.opacity = 1;

    }, a);
}

function poster() {

    if (posteromdb !== "N/A") {
        document.getElementById("poster").src = posteromdb;
        document.getElementById("all").style.position = "absolute";
        document.getElementById("postercont").style.display = "inline-block";

        return opacity(delayforfirstresult);
    }
    if (type === "series") {
        document.getElementById("postercont").style.display = "none";
        document.getElementById("all").style.position = "relative";
        return opacity(delayforfirstresult);
    }
    let date = releasedate;
    fetch("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + document.getElementById("title").innerHTML)
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            for (let i = 0; i < data.results.length; i++) {

                if (data.results[i].release_date.split("-")[0] === date) {
                    if (data.results[i].poster_path !== undefined && data.results[i].poster_path !== "N/A" && data.results[i].poster_path !== null) {
                        document.getElementById("poster").src = "https://image.tmdb.org/t/p/w200" + data.results[i].poster_path;


                        document.getElementById("all").style.position = "absolute";
                        document.getElementById("postercont").style.display = "inline-block";

                        return opacity(delayforfirstresult);
                    } else {

                        document.getElementById("postercont").style.display = "none";
                        document.getElementById("all").style.position = "relative";

                    }
                    return opacity(delayforfirstresult);
                }

            }
            document.getElementById("postercont").style.display = "none";
            document.getElementById("all").style.position = "relative";
            return opacity(delayforfirstresult);
        })



}

function opacityzero() {
    delayforfirstresult = 100;
    document.getElementById("movieinfo").style.transitionDuration = "0s";
    document.getElementById("scores").style.transitionDuration = "0s";
    document.getElementById("availability").style.transitionDuration = "0s";
    document.getElementById("postercont").style.transitionDuration = "0s";
    document.getElementById("movieinfo").style.opacity = 0;
    document.getElementById("scores").style.opacity = 0;
    document.getElementById("availability").style.opacity = 0;
    document.getElementById("postercont").style.opacity = 0;
}


function availability() {
    opacityzero();

    delayforfirstresult = 500;
    document.getElementById("previous").style.display = "none";
    document.getElementById("next").style.display = "none";
    chrome.storage.sync.get('country', function (data) {
        countrycode = data.country.toLowerCase();
        console.log(countrycode);


        //"https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?term=" + countrycode + "&source_id=" + data.imdbid + "&source=imdb"
        let title = document.getElementById("movietitle").value;
        fetch("https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + title + "&country=" + countrycode, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
                    "x-rapidapi-key": "10df7c1a8fmsh80d51cdb76f74e0p1fce14jsn61c338e10852"
                }
            })
            .then(response => {
                return response.json()
            })
            .then(data => {
                if (data.results.length === undefined) {
                    document.getElementById("notfound").innerHTML = "Movie not found.";
                    document.getElementById("scores").style.display = "none";
                    document.getElementById("availability").style.display = "none";
                    document.getElementById("title").innerHTML = " ";
                    document.getElementById("poster").src = " ";
                    document.getElementById("year").innerHTML = " ";
                    document.getElementById("rating").innerHTML = " ";
                    document.getElementById("plot").innerHTML = "     ";
                    document.getElementById("runtime").innerHTML = "  ";
                    document.getElementById("next").style.display = "none";
                    console.log(data);
                    return;
                }


                if (data.results.length > 1) {
                    document.getElementById("next").style.display = "block";
                    chrome.storage.sync.set({
                        resultsnum: data.results.length

                    });
                    chrome.storage.sync.set({
                        counter: 0
                    });
                }
                console.log(data);

                utellydata = data.results
                if (data.results.length > 1){
                document.getElementById("movietitle").style.width = "94vw";
                document.getElementById("availability").style.display = "block";
                document.getElementById("netflix").style.display = "none";
                document.getElementById("amazon").style.display = "none";
                document.getElementById("hulu").style.display = "none";

                let x = 0;
                
                for (let i = 0; i < data.results[0].locations.length; i++) {
                    if (data.results[0].locations[i].display_name === "Amazon Prime Video") {
                        var am = document.getElementById("amazon")
                        am.style.display = "block";
                        am.href = data.results[0].locations[i].url;
                        x += 1;

                    }
                    if (data.results[0].locations[i].display_name === "Hulu") {
                        var am = document.getElementById("hulu")
                        am.style.display = "block";
                        am.href = data.results[0].locations[i].url;
                        x += 1;
                    }
                    if (data.results[0].locations[i].display_name === "Netflix") {
                        var am = document.getElementById("netflix")
                        am.style.display = "block";
                        am.href = data.results[0].locations[i].url;
                        x += 1;
                    }
                }
                if (x === 0) {
                    document.getElementById("availableon").innerHTML = "no streaming options in your location 😞"
                    document.getElementById("availableon").style.paddingTop = "1.3rem";
                } else {
                    document.getElementById("availableon").innerHTML = "Available on";
                    document.getElementById("availableon").style.paddingTop = "0.7rem";

                }
                let resultcount = 0;
                return search(resultcount);}
            })
    });
};



chrome.storage.sync.get('title', function (data) {
    document.getElementById("movietitle").value = data.title;
    if (document.getElementById("movietitle").value !== "") {
        document.getElementById("appname").style.marginBottom = "0.6rem";
        availability();
    }
});

document.getElementById('movietitle').addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("appname").style.marginBottom = "0.6rem";
        availability();
    }
});


document.getElementById("next").onclick = function () {
    opacityzero();
    document.getElementById("poster").src = " ";
    chrome.storage.sync.get(['resultsnum', 'counter'], function (data) {
        if (data.resultsnum - 2 === data.counter) {
            document.getElementById("next").style.display = "none";
        }
        document.getElementById("previous").style.display = "block";
        let count = data.counter + 1;
        chrome.storage.sync.set({
            counter: count
        });

        document.getElementById("availability").style.display = "block";
        document.getElementById("netflix").style.display = "none";
        document.getElementById("amazon").style.display = "none";
        document.getElementById("hulu").style.display = "none";

        let x = 0;

        for (let i = 0; i < utellydata[count].locations.length; i++) {
            if (utellydata[count].locations[i].display_name === "Amazon Prime Video") {
                var am = document.getElementById("amazon")
                am.style.display = "block";
                am.href = utellydata[count].locations[i].url;
                x += 1;

            }
            if (utellydata[count].locations[i].display_name === "Hulu") {
                var am = document.getElementById("hulu")
                am.style.display = "block";
                am.href = utellydata[count].locations[i].url;
                x += 1;
            }
            if (utellydata[count].locations[i].display_name === "Netflix") {
                var am = document.getElementById("netflix")
                am.style.display = "block";
                am.href = utellydata[count].locations[i].url;
                x += 1;
            }
        }
        if (x === 0) {
            document.getElementById("availableon").innerHTML = "no streaming options in your location 😞"
            document.getElementById("availableon").style.paddingTop = "1.3rem";
        } else {
            document.getElementById("availableon").innerHTML = "Available on";
            document.getElementById("availableon").style.paddingTop = "0.7rem";

        }
        return search(count);
    })
}

document.getElementById("previous").onclick = function () {
    opacityzero();
    document.getElementById("poster").src = " ";
    chrome.storage.sync.get(['resultsnum', 'counter'], function (data) {
        if (data.counter === 1) {
            document.getElementById("previous").style.display = "none";
        }
        document.getElementById("next").style.display = "block";
        let count = data.counter - 1;
        chrome.storage.sync.set({
            counter: count
        });

        document.getElementById("availability").style.display = "block";
        document.getElementById("netflix").style.display = "none";
        document.getElementById("amazon").style.display = "none";
        document.getElementById("hulu").style.display = "none";

        let x = 0;

        for (let i = 0; i < utellydata[count].locations.length; i++) {
            if (utellydata[count].locations[i].display_name === "Amazon Prime Video") {
                var am = document.getElementById("amazon")
                am.style.display = "block";
                am.href = utellydata[count].locations[i].url;
                x += 1;

            }
            if (utellydata[count].locations[i].display_name === "Hulu") {
                var am = document.getElementById("hulu")
                am.style.display = "block";
                am.href = utellydata[count].locations[i].url;
                x += 1;
            }
            if (utellydata[count].locations[i].display_name === "Netflix") {
                var am = document.getElementById("netflix")
                am.style.display = "block";
                am.href = utellydata[count].locations[i].url;
                x += 1;
            }
        }
        if (x === 0) {
            document.getElementById("availableon").innerHTML = "no streaming options in your location 😞"
            document.getElementById("availableon").style.paddingTop = "1.3rem";
        } else {
            document.getElementById("availableon").innerHTML = "Available on";
            document.getElementById("availableon").style.paddingTop = "0.7rem";

        }
        return search(count);
    })
}