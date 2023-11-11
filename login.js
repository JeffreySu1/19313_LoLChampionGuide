// Puts the user's username and password into the API and gives a response

$('#login-button').on('click', function() {
  const username = $('#username').val();
  const password = $('#password').val();

  console.log('Username:', username);
  console.log('Password:', password);

  //Puts the username and password into the API
  $.ajax({
    url: "https://retoolapi.dev/BJR4EI/data",
    method: "POST",
    data: { username, password },
    success: function(response) {
      console.log('API Response:', response);

      if (response.success === true) {
        alert("You are not logged in.");
      } else {
        alert("You have been logged in.");
      }
    },

    error: function(err) {
      console.error("Error:", err);
    }
  });
});