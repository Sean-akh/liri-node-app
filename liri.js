    require("dotenv").config();
    var keys = require("./keys.js");
    var inquirer = require("inquirer");
    var request = require('Request');
    var fs = require('fs');

    var Spotify = require('node-spotify-api');
    var Twitter = require('twitter');

// check the connection to the keys
// console.log("---------------------------------- \n");
// console.log("Twitter Key: " + Twitter + "\n");
// console.log("---------------------------------- \n");
// console.log("Spotify Key: " + Spotify + "\n");
// console.log("---------------------------------- \n");


    var client = new Twitter({
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
    });
//console.log("-----Twitter----- \n" + client + "\n -------------- \n");

    var spotify = new Spotify(keys.spotify);
//console.log("----Spotify------ \n" + spotify + "\n -------------- \n");

    //find out what the user want to view
    inquirer.prompt(
        [
            {
                message: "What topic would you like to subscribe to?",
                type: "list",
                name: "choice",
                choices: ["Twitter", "Music", "Movie"]
            }
        ])
            .then(function(inquirerResponse) {
                //if the choice is twitter
                if (inquirerResponse.choice === "Twitter") {
                    var screenName = {screen_name: 'sean_a_project'};
                    client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
console.log("\n Tweets are" + tweets + "\n");
console.log("Response is: " + response + "\n");
                       if(!error){
                            for (var i = 0; i < 10; i++) {
                               var dateCreated = tweets[i].created_at.slice(0, 19);
                                var twitMessage = tweets[i].text;
                               
                                console.log("\n Twit is created on: " + dateCreated);
                                console.log(twitMessage);
                                console.log("------------------- \n");   
                                var writeLog = "------------------\n date Created: " + dateCreated + "\n the message is: " + twitMessage + "\n ------------------";
                                fs.appendFile("log.txt", writeLog[i], null, '\n');
                            };
                        };
                    }); 
                } 

                /***********MUSIC starts****************/
                else if (inquirerResponse.choice === "Music") {
                    var spotify = new Spotify({
                        id: process.env.SPOTIFY_ID,
                        secret: process.env.SPOTIFY_SECRET
                    });

                    //ask for the name of the song
                    inquirer.prompt([{
                                type: "input",
                                message: "What is the name of mnusic?",
                                name: "musicName"
                            }])
                        //Then Do Spotify
                        .then(function(inquirerResponse) {
                            var musicName = inquirerResponse.musicName;

                                spotify.search({type: 'track', query: musicName})
                                    .then(function(data){
                                        //log the results
                                        console.log("-------------\n");
                                        console.log("Artist: " + data.tracks.items[0].artists[0].name);
                                        console.log("Song: " + data.tracks.items[0].name);
                                        console.log("Preview Here: " + data.tracks.items[0].preview_url);
                                        console.log("Album: " + data.tracks.items[0].album.name);
                                        console.log("-------------\n");

                                        var writeLog = " \n---------- Music --------\n Artist: " 
                                        + data.tracks.items[0].artists[0].name 
                                        + "\n Song: " + data.tracks.items[0].name 
                                        + "\n Preview Here: " + data.tracks.items[0].preview_url 
                                        + "\n Album: " + data.tracks.items[0].album.name 
                                        + "\n ------------------";
                                fs.appendFile("log.txt", writeLog, null, '\n');
                                    })
                                    .catch(function(err) {
                                        console.log(err);
                                    });   
                                
                            });
                        }

                /***********MOVIE starts****************/
                else if (inquirerResponse.choice === "Movie") {
//console.log("The choice is movie");
                    //ask for the name of the Movie
                    inquirer.prompt([{
                        type: "input",
                        message: "What is the name of movie?",
                        name: "movieName"
                    }])
                    //Then Do OMDB Query and get the response
                    .then(function(inquirerResponse) {
                        var movieName = inquirerResponse.movieName;
//console.log("The movie is: "+ movieName);
                        var key = "apikey=trilogy";
                        var queryURL = "https://www.omdbapi.com/?" + key + "&t=" + movieName.split(' ').join('+') + "&y=&plot=long&tomatoes=true&r=json";

//console.log("the url query is: " + queryURL);

                        request(queryURL, function(error, response, body){
                            if (error){
                                // Print the error if one occurred
                            console.log('error:', error); 
                            };
                            if (response) {
                                // Print the response status code if a response was received
                                console.log('statusCode:', response && response.statusCode); 
                            };                               
                            console.log();
                            console.log("------------------\n");
                            console.log('Title: ' + JSON.parse(body).Title + "\n");
                            console.log('Year: ' + JSON.parse(body).Year + "\n");
                            console.log('Rated: ' + JSON.parse(body).Rated + "\n");
                            console.log('Language: ' + JSON.parse(body).Language + "\n");
                            console.log('Rotten Tomato Rating: ' + JSON.parse(body).tomatoRating + "\n");
                            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating + "\n");
                            console.log('Movie Plot: ' + JSON.parse(body).Plot + "\n");
                            console.log('Actors: ' + JSON.parse(body).Actors + "\n");
                            console.log('Countries: ' + JSON.parse(body).Country + "\n");
                            console.log("\n------------------\n");

                            var writeLog = " \n---------- Movie --------\nTitle: " 
                            + JSON.parse(body).Title + "\n" 
                            + 'Year: ' + JSON.parse(body).Year + "\n" 
                            + 'Rated: ' + JSON.parse(body).Rated + "\n" 
                            + 'Language: ' + JSON.parse(body).Language + "\n"
                            + 'Rotten Tomato Rating: ' + JSON.parse(body).tomatoRating + "\n"
                            + 'IMDB Rating: ' + JSON.parse(body).imdbRating + "\n"
                            + 'Movie Plot: ' + JSON.parse(body).Plot + "\n"
                            + 'Actors: ' + JSON.parse(body).Actors + "\n"
                            + 'Countries: ' + JSON.parse(body).Country + "\n"
                            + "\n ------------------";
                            fs.appendFile("log.txt", writeLog, null, '\n');
                        });
                    });                  
            }
                /***********Random event ****************/

                /***********ASK TO SELECT****************/
                else {
console.log("Please choose an option");
                    //ask to select 
                }
    });