$(document).ready(function() {
  $('body').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  
  $('#send .submit').on('submit', function() {
    app.handleSubmit();
  });

  $('#send').submit(function(e) {
    e.preventDefault();
  });
});