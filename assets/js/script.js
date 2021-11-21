// initialize the dinner modal
$(document).ready(function() {
    $("#dinner-modal").modal({
        onCloseEnd: function() {
            $("#meal-type").val("");
            $("#cuisine").val("");
            $("#diet").val("");
        }
    });
});

// initialize the meal type dropdown
$(document).ready(function(){
    $('#meal-type').formSelect();
});

// initialize the cuisine dropdown
$(document).ready(function(){
    $('#cuisine').formSelect();
});

// initialize the diet dropdown
$(document).ready(function(){
    $('#diet').formSelect();
});

// initialize the movie modal
$(document).ready(function() {
    $('#movie-modal').modal();
});

// initialize the sort dropdown
$(document).ready(function(){
    $('#sort').formSelect();
});


var getMovies = function(params) {
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

// call Spoonacular API for recipes
var getRecipes = function(mealType, cuisine, diet) {
    // format spoonacular api url
    var spoonApiUrl ="https://api.spoonacular.com/food/videos/search?apiKey=98f2006279d64b1894e8b2e18d3687b3&type=" + mealType + "&cuisine=" + cuisine + "&diet=" + diet;

    // make a request to the url
    fetch(spoonApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayRecipes(data);
            });
        }
    });
};

// display recipe cards on site
var displayRecipes = function(data) {
    for (var i = 0; i < 4; i++) {
        console.log("[Recipe " + i + "]: Thumbnail: " + data.videos[i].thumbnail + " - shortTitle: " + data.videos[i].shortTitle + " - YoutTube: " + data.videos[i].youTubeId + " - Views: " + data.videos[i].views);
    }
    console.log("Length of results: " + data.videos.length);
};

// get dinner inputs
$("#dinner-submit-btn").click(function(event) {
    event.preventDefault();
    var mealType = $("#meal-type").val();
    var cuisine = $("#cuisine").val();
    var diet = $("#diet").val();
    console.log("meal type: " + mealType + " - cuisine: " + cuisine + " - diet: " + diet);
    getRecipes(mealType, cuisine, diet);
});
