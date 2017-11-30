$(document).ready(function() {
  var fooddrinks = [
    "apple", "cheese", "alcohol", "bacon", "breakfast", "coffee",
    "pancakes", "banana", "pizza", "sandwich", "doughnut"
  ];

  function buttons() {
    $('#food-buttons').empty();
    for (var i = 0; i < fooddrinks.length; i++) {
      var bttn = $("<button>");
      bttn.addClass("foodbttn");
      bttn.attr("data-search", fooddrinks[i]);
      bttn.text(fooddrinks[i]);
      $('#food-buttons').append(bttn);
    }
  }
  $(document).on("click", ".foodbttn", function() {
    $('#food').empty();
    var getitem = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + getitem + "&api_key=WWLugtppAfjPpgZe2dpBCsD0eM5Iej0e&limit=5";
    $.ajax({
      url: queryURL,
      method: 'GET'
    })
    .done(function(response) {
      
      console.log(response);

      var result = response.data;

      for (var i = 0; i < result.length; i++) {
        var fooddiv = $('<div class="fooditem">');
        var rating = result[i].rating;
        var p = $("<p>").text("Rating:" + rating);
        var animate = result[i].images.fixed_height.url;
        var still = result[i].images.fixed_height_still.url;
        var foodimg = $("<img>");
        foodimg.attr("src", still);
        foodimg.attr("data-still", still);
        foodimg.attr("data-animate", animate);
        foodimg.attr("data-state", "still");
        foodimg.addClass("food-image");
        fooddiv.append(p);
        fooddiv.append(foodimg);
        $('#food').append(fooddiv);
      }
    });
  });
  $(document).on("click", ".food-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  $('#add-food').on("click", function(event) {
    event.preventDefault();
    var addfood = $('#food-input').val().trim();
    fooddrinks.push(addfood);
    
    buttons();
  });
  buttons();
});