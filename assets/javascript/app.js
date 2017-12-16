var topics = ["Game of Thrones", "Westworld", "Mad Men", "Silicon Valley",
              "Mr. Robot", "Breaking Bad", "Rick and Morty", "Bojack Horseman",
              "Archer", "Bob's Burgers"];

var current_topic = "";

function displayGifInfo() {

  $("#gif-view").empty();

  var topic = $(this).attr("data-name");

  current_topic = topic;

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=T0bbTEWMOVBUV0jJAJgYlASvLWncNNyr&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    console.log(response);
    for(var i = 0; i < response.data.length; i++){

      var gifDiv = $("<div class='gif'>");
      gifDiv.attr('gif-id', response.data[i].id);

      var image_url = response.data[i].images.fixed_height_still.url;
      var image = $('<img>').attr('src', image_url);
      gifDiv.attr('image-position', i);
      image.attr('id', i);
      image.attr('animate', 'false');

      gifDiv.append(image);

      var line_break = $('<br>');

      gifDiv.append(line_break);

      var gif_rating = response.data[i].rating;
      var rating = $('<h4>').text(gif_rating);
      gifDiv.append("Rating: " + gif_rating);

      $("#gif-view").prepend(gifDiv);

    }
  });
}

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var gif_button = $("<button>");

    gif_button.addClass("gif-btn");

    gif_button.attr("data-name", topics[i]);

    gif_button.text(topics[i]);

    $("#buttons-view").append(gif_button);

  }
}

function animateGif(){

  var gif_id = $(this).attr('gif-id');

  var img_id = $(this).attr('image-position');

  console.log(img_id);

  var query_url = "https://api.giphy.com/v1/gifs/search?q=" + current_topic + "&api_key=T0bbTEWMOVBUV0jJAJgYlASvLWncNNyr&limit=10";

  $.ajax({
    url: query_url,
    method: "GET"
  }).done(function(response) {

    var animate_flag = $('#' + img_id).attr('animate');

    if(animate_flag === 'false'){

      var image_url = response.data[img_id].images.fixed_height.url;

      $('#' + img_id).attr('src', image_url);

      $('#' + img_id).attr('animate', 'true');

    }
    else if(animate_flag === 'true'){

      var image_url = response.data[img_id].images.fixed_height_still.url;

      $('#' + img_id).attr('src', image_url);

      $('#' + img_id).attr('animate', 'false');
       
    }

  });

}


$("#add-gif").on("click", function(event) {

  event.preventDefault();

  var gif = $("#gif-input").val().trim();

  topics.push(gif);

  renderButtons();

});

$(document).on("click", ".gif-btn", displayGifInfo);

$(document).on("click", ".gif", animateGif);

renderButtons();