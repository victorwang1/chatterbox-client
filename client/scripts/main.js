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
  
  var updateMessages = function() {
    var newData = app.fetch(url);
    var newMessages;
    newData.always(function(data) {
      newMessages = newData.responseJSON.results;
      for (var message of newMessages) {
        app.renderMessage(message);
      }
    });    
    

  };
  updateMessages();
});