$(document).ready(function () {
  // Event listener for the signup button
  $("#signup-button").click(function () {
    const username = $("#username").val();
    const password = $("#password").val();

    // Create an object to store the registration data
    const userData = {
      username: username,
      password: password,
    };

    // Send the registration data to your API for storage
    $.ajax({
      url: "https://retoolapi.dev/phqTvJ/data", // Replace with your API endpoint
      method: "POST", // Use POST to send registration data
      data: JSON.stringify(userData),
      contentType: "application/json",
      success: function (response) {
        // Handle the API response
        if (response.status === "success") {
          // Registration successful, you can redirect or perform other actions here
          alert("Registration successful!");
        } else if (response.status === "error") {
          // Registration failed, handle error messages
          alert("Registration failed. Please try a different username.");
        }
      },
      error: function (error) {
        // Handle API errors
        console.error("API Error:", error);
      },
    });
  });
});
