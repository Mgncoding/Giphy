   
    // pre-selected topics to click on
    var topics = ["Waterfalls", "Volcano", "Tornado", "Sand Storms", "Fire", "Hurricane", "Meteor Shower", "Tsunami", "Rain", "Snow Storms", "Hail"]
    
    //function to make sure right info is displayed
    function displayElementInfo() {

        var topic = $(this).attr("data-name")
        // URL to query the API
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=zwj8jHUPitL8XnhBTMLkmIkBbMAN06xC&limit=10"
        console.log(queryURL)
    // AJEX Get request
$.ajax({
 url: queryURL,
 method: "GET"
})
//   data comes back from the API
.then(function(response) {
    // to call the data from the giphy
    var results = response.data
    console.log(results)
    // a loop for the results
    for( var i = 0; i < results.length; i++) {
        if (results[i].rating == "r" || results[i].rating == "pg-13"){    
        }
       
    

    // creating a class to place the rating of each gif
    var elementalDiv = $("<div class='elemental'>")

    //variable to store the ratings
    var rating = results[i].rating
    // variables that will to set the gif to animated and still
    var animatedSrc = results[i].images.fixed_height.url
    var staticSrc = results[i].images.fixed_height_still.url
    // creating a img tag
    var gifImage = $('<img>')

    // element that will display the rating of the Gifs
    var paraOne = $('<p>').text("Rating: " + rating)

        gifImage.attr("src", staticSrc)
        gifImage.addClass("elementGif")
        gifImage.attr("data-state", "still")
        gifImage.attr("data-still", staticSrc)
        gifImage.attr("data-animate", animatedSrc)
        // display info to HTML
        elementalDiv.append(paraOne)
        elementalDiv.append(gifImage)
        $('#gifsHere').prepend(elementalDiv) 
  
}
})
}
// function that will display gif data
function renderButtons() {
    // will help prevent repeat buttons
    $('#gif-button').empty()
    // make a loop for the array of gifs
    for (var i = 0; i < topics.length; i++) {
        // creating a button for each gif
        var gif = $("<button>")
        // creating a class for the button
        gif.addClass("gif-btn")
        gif.attr("data-name", topics[i])
        //text for initial button
        gif.text(topics[i])
        $("#gif-button").append(gif)
  }
}

// function to for when element button is called
$("#element-find").on("click", function(event) {
    event.preventDefault()
    var topic = $("#element-place").val().trim()
    // placing new elements into array
    topics.push(topic)
    $('#element-place').val("")

    renderButtons()
    return false;
})
    // will execute the displayElementInfo function
    $(document).on("click", ".gif-btn", displayElementInfo)

    // will execute the pausePlay function
    $(document).on("click", ".elementGif", pausePlayGifs)
 // this will help display the initial buttons
    renderButtons()

        //  i had referenced this from our class assignment  '6.3.15-PausingGifs'. This allows to click the gifs to play/pause
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
       if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
         $(this).attr("data-state", "animate");
       } else {
         $(this).attr("src", $(this).attr("data-still"));
         $(this).attr("data-state", "still");
       }
    }





    
