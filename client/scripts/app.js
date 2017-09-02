const url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

var app = {
  init() {

  },
  send(input) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: url,
      type: 'POST',
      data: input,
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch(url) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: url,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        var messages = JSON.stringify(data);
        console.log('chatterbox: message received' + messages);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: message was not received', data);
      }
    });
  },
  clearMessages() {
    $('#chats').empty();
  },
  renderMessage(message) {
    var {username, text, roomname} = message;
    var $message = $(`<div><span class='username'>${username}</span>\n${text}\n${roomname}</div>`);
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