// Updates and displays comments as well as average rating from the API

// Displays comments from API
$(document).ready(function () {
  function displayComments() {
    $.ajax({
      url: "https://retoolapi.dev/E1PgTg/data",
      method: "GET",
      success: function (response) {
        const commentsContainer = $("#comments-container");
        const commentCountElement = $("#comment-count");
        commentsContainer.empty();

        // Checks if anything has been typed into the box
        if (Array.isArray(response) && response.length > 0) {
          response.forEach(function (comment) {
            if (comment.comment) {
              commentsContainer.append("<p>" + comment.comment + "</p>");
            }
          });

          // Displays all the comments in the API
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

  // Displays an average rating from the API
  function displayRatings() {
    $.ajax({
      url: "https://retoolapi.dev/ytiScm/data",
      method: "GET",
      success: function (response) {
        const ratingsContainer = $("#ratings-container");
        const ratingCountElement = $("#rating-count");
        ratingsContainer.empty();

        // Checks if anything has been typed into the box
        if (Array.isArray(response) && response.length > 0) {
          let totalRatings = 0;
          response.forEach(function (rating) {
            if (rating.rating) {
              ratingsContainer.append("<p>Rating: " + rating.rating + "</p>");
              totalRatings += parseInt(rating.rating);
            }
          });

          // Calculates and displays the average rating
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

  // Displays the current comments and average rating when loading page
  displayComments();
  displayRatings();

  // Adds new comment to the API
  $("#submitCommentBtn").click(function () {
    const userInput = $("#userInput").val();

  // Checks if anything has been typed into the box
  if (userInput.trim() !== "") {

    // POST new comment to API
    $.ajax({
      url: "https://retoolapi.dev/E1PgTg/data",
      method: "POST",
      data: JSON.stringify({ comment: userInput }),
      contentType: "application/json",
      success: function () {
        // Updates the comments displayed and clears comment box
        displayComments();
        $("#userInput").val("");
      },
      error: function (error) {
        console.error("API Error:", error);
      },
    });
  }
  });

  // Adds new rating to the API
  $("#submitRatingBtn").click(function () {
    const ratingInput = $("#ratingInput").val();

    //Checks if number is between 1-5
    if (isNumericBetween(ratingInput, 1, 5)) {

      // POST the new rating to API
      $.ajax({
        url: "https://retoolapi.dev/ytiScm/data",
        method: "POST",
        data: JSON.stringify({ rating: ratingInput }),
        contentType: "application/json",
        success: function () {
          // Updates the ratings displayed and clears rating box
          displayRatings();
          $("#ratingInput").val("");
        },
        error: function (error) {
          console.error("API Error:", error);
        },
      });
      // Displays an alert if number isn't between 1-5
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