// Adding and retriving comments from the API

$(document).ready(function() {
  // Function to display comments
  function displayComments() {
    // GET request to fetch comments from the API
    $.ajax({
      url: "https://retoolapi.dev/FOq1uT/data",
      method: "GET",
      success: function(response) {
        // Handle the comments
        const commentsContainer = $("#comments-container");
        commentsContainer.empty();

        if (Array.isArray(response) && response.length > 0) {
          response.forEach(function(comment) {
            if (comment.comment) {
              commentsContainer.append("<p>" + comment.comment + "</p>");
            }
          });
        } else {
          commentsContainer.append("<p>No comments available.</p>");
        }
      },
      error: function(error) {
        console.error("API Error:", error);
      },
    });
  }

  // Display comments when the page loads
  displayComments();

  // Waiting for button to be pressed
  $("#submitBtn").click(function() {
    const userInput = $("#userInput").val();

    // Posting message to the API
    $.ajax({
      url: "https://retoolapi.dev/FOq1uT/data",
      method: "POST",
      data: JSON.stringify({ comment: userInput }),
      contentType: "application/json",
      success: function() {
        // Updates the comment section
        displayComments();
        $("#userInput").val("");
      },
      error: function(error) {
        console.error("API Error:", error);
      },
    });
  });
});
