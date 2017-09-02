$(document).ready(function() {
   
  

  $('body').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  
  // $('#send .submit').on('submit', function() {
  //   var username = window.location.search.split('=')[1];
  //   var text = $('#message').val();
  //   console.log('submit');
  //   app.handleSubmit(username, text);
  // });

  $('#send .submit').on('click submit', function() {
    var username = window.location.search.split('=')[1];
    var text = $('#message').val();
    console.log('submit');
    app.handleSubmit(username, text);
  });
  
  $('#send').submit(function(e) {
    e.preventDefault();
  });
  
  var updateMessages = function() {
    var data;
    data = 'order=-createdAt&limit=50';
    // if (!app.lastUpdate) data = 'order=-createdAt&limit=50';
    // else data = `greaterThan('createdAt', ${app.lastUpdate})`;
    var newData = app.fetch(url, data);
    //debugger;
    newData.always(function(data) {
      var newMessages = newData.responseJSON.results;
      console.log(newMessages);
      app.lastUpdate = newMessages[0].createdAt;
      console.log(app.lastUpdate);
      app.clearMessages();
      for (var message of newMessages) {
        app.renderMessage(message);
      }
    });    
    
  
  };

  updateMessages();
  setInterval(updateMessages, 5000);
});