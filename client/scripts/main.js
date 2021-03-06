$(document).ready(function() {
  var updateRooms = function() {
    for (var room in app.newRooms) {
      $room = $(`<option>${room}</option>`);
      app.rooms[room] = room;
      $('#roomSelect').append($room);
    }
    app.newRooms = {};
  };

  var updateMessages = function() {

    var newData = app.fetch(url, app.data);
    if (!newData) return;
    newData.always(function(data) {
      var newMessages = newData.responseJSON.results;
      app.lastUpdate = newMessages[0].createdAt;

      app.clearMessages();
      for (var message of newMessages) {
        app.renderMessage(message);
      }
      updateRooms();
    });
  };

  updateMessages();
  setInterval(updateMessages, 5000);


  // -----Event Handlers-----
  $('body').on('click', '.username', function() {
    app.handleUsernameClick(this.innerHTML.slice(1));
    updateMessages();
  });

  $('#send .submit').on('click submit', function() {
    var username = window.location.search.split('=')[1];
    var text = $('#message').val();
    var roomname = $('#roomSelect').val();

    if (roomname === 'Create new room...')
      roomname = $('#newroomname').val();
    else if (roomname === 'All Rooms')
      roomname = 'lobby';

    app.handleSubmit(username, text, roomname);
    $('#newroomname').remove();
    $('#message').val('');
  });

  // prevent send page refresh
  $('#send').submit(function(e) {
    e.preventDefault();
  });

  $('#roomSelect').on('change', function() {
    var roomname = $('#roomSelect').val();
    
    if (roomname === 'All Rooms')
      delete app.data['where'];
    else if (roomname === 'Create new room...')
      $('#roomSelect').after($('<input id="newroomname" type="text">'));
    else
      app.data['where'] = {'roomname': roomname};

    updateMessages();
  });
});
