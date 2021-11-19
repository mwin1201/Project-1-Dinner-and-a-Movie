
// var getMovies = function () {
// //    var response = fetch("https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=westerns&with_watch_monetization_types=flatrate");
//    fetch("https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=westerns&with_watch_monetization_types=flatrate").then(function (response) {
//        console.log("inside", response);
//    });
   
//    console.log(response);
// }

// getMovies();

// fetch("https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=westerns&with_watch_monetization_types=flatrate").then(function (response) {
//        console.log("inside", response);
//    });
   
//    console.log(response);


//    fetch("https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=westerns&with_watch_monetization_types=flatrate").then(function(response) {
//   response.json().then(function(data) {
//     console.log(data);
//   });
// });

var getMovies = function (params) {
    // format tmdb api url
    // var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=" +  year + "&with_genres=" + genre + "&with_watch_monetization_types=free";
    var tmdbApiUrl ="https://api.themoviedb.org/3/discover/movie?api_key=b2defd411e4c4ccada84680b336db68b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=westerns&with_watch_monetization_types=flatrate";

    // make a request to the url
    fetch(tmdbApiUrl).then(function (response) {
        response.json().then(function (data) {
            console.log(data)
        });
    });
};

getMovies()