    require("dotenv").config();

    var keys = require("./keys.js");

    var spotify = new Spotify(keys.spotify);
    var twitter = new Twitter(keys.twitter);

// check the connection to the keys
console.log("---------------------------------- \n");
console.log("Twitter Key: " + keys.Twitter + "\n");
console.log("---------------------------------- \n");
console.log("Spotify Key: " + keys.spotify + "\n");
console.log("---------------------------------- \n");

    //`my-tweets`
    //This will show your last 20 tweets and when they were created at in your terminal/bash window.







    // `spotify-this-song`
    // *Artist(s)     * The song's name       * A preview link of the song from Spotify      * The album that the song is from
    // default to "The Sign" by Ace of Base





    // `movie-this`
        var title = "space+jam";
        var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.Runtime);
        });

    // `do-what-it-says`