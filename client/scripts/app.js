const url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

var app = {
  init() {

  },
  send(input) {
    $.ajax({
      url: url,
      type: 'POST',
      data: input,
      success: function (data) {
        console.log('chatterbox: Message sent:', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch(url) {
    return $.ajax({
      url: url,
      type: 'GET',
      data: 'order=-createdAt&limit=10',
      contentType: 'application/json',
      success: function (data) {
        //console.log('chatterbox: message received' + JSON.stringify(data));
      },
      error: function (data) {
        console.error('chatterbox: message was not received', data);
      }
    });
  },
  clearMessages() {
    $('#chats').empty();
  },
  renderMessage(message) {
    var {username, text, roomname, createdAt} = message;
    console.log(username, text, roomname, createdAt);
    var $message = $(`<div class='messageContent'><span class='username'>${username}</span>
                      <div class='messageText'>${text}</div>
                      <span>${roomname}</span>
                      </div>`);
    $('#chats').append($message);
  },
  renderRoom(roomName) {
    var $newRoom = $('<option></option>');
    $newRoom.text(roomName);
    $('#roomSelect').append($newRoom);
  },
  handleUsernameClick() {
    
  }, 
  handleSubmit() {
    
  }
  

};

// update message stream
var _updateStream = function() {};

// count JSON file length
var _JSONLength = function() {};

// length from last fetch



