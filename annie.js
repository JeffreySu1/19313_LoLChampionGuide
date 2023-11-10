$(document).ready(function () {
  function displayComments() {
    $.ajax({
      url: "https://retoolapi.dev/COcivp/data",
      method: "GET",
      success: function (response) {
        const commentsContainer = $("#comments-container");
        const commentCountElement = $("#comment-count");
        commentsContainer.empty();

        if (Array.isArray(response) && response.length > 0) {
          response.forEach(function (comment) {
            if (comment.comment) {
              commentsContainer.append("<p>" + comment.comment + "</p>");
            }
          });

          const totalComments = response.length - 1;
          commentCountElement.text("Total Comments: " + totalComments);
        } else {
          commentsContainer.append("<p>No comments available.</p>");
          commentCountElement.text("Total Comments: 0");
        }
      },
      error: function (error) {
        console.error("API Error:", error);
      },
    });
  }

  function displayRatings() {
    $.ajax({
      url: "https://retoolapi.dev/vWUBoA/data",
      method: "GET",
      success: function (response) {
        const ratingsContainer = $("#ratings-container");
        const ratingCountElement = $("#rating-count");
        ratingsContainer.empty();

        if (Array.isArray(response) && response.length > 0) {
          let totalRatings = 0;
          response.forEach(function (rating) {
            if (rating.rating) {
              ratingsContainer.append("<p>Rating: " + rating.rating + "</p>");
              totalRatings += parseInt(rating.rating);
            }
          });

          const averageRating = totalRatings / response.length;
          ratingCountElement.text("Average Rating: " + averageRating.toFixed(1));
        } else {
          ratingsContainer.append("<p>No ratings available.</p>");
          ratingCountElement.text("Average Rating: No rating so far.");
        }
      },
      error: function (error) {
        console.error("API Error:", error);
      },
    });
  }

  displayComments();
  displayRatings();

  $("#submitCommentBtn").click(function () {
    const userInput = $("#userInput").val();

    $.ajax({
      url: "https://retoolapi.dev/COcivp/data",
      method: "POST",
      data: JSON.stringify({ comment: userInput }),
      contentType: "application/json",
      success: function () {
        displayComments();
        $("#userInput").val("");
      },
      error: function (error) {
        console.error("API Error:", error);
      },
    });
  });

  $("#submitRatingBtn").click(function () {
    const ratingInput = $("#ratingInput").val();

    //Checks if number is between 1-5
    if (isNumericBetween(ratingInput, 1, 5)) {

      $.ajax({
        url: "https://retoolapi.dev/vWUBoA/data",
        method: "POST",
        data: JSON.stringify({ rating: ratingInput }),
        contentType: "application/json",
        success: function () {
          displayRatings();
          $("#ratingInput").val("");
        },
        error: function (error) {
          console.error("API Error:", error);
        },
      });
    } else {
      alert("Please enter a number between 1 and 5.")
    }
  });

  // Function to check if number is between 1-5 and checks if it's a number
  function isNumericBetween(value, min, max) {
    const numericValue = parseInt(value);
    return !isNaN(numericValue) && numericValue >= min && numericValue <= max;
  }
});