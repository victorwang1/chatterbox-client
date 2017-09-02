const url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

var app = {
 
  lastUpdate: undefined,
 
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
  fetch(url, data) {
    return $.ajax({
      url: url,
      type: 'GET',
      data: data,
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
    //console.log(username, text, roomname, createdAt);
    if (!(username || text)) return;
    username = app.checkForSciprt(username);
    if (username.length > 15) username = username.slice(0, 15);
    text = app.checkForSciprt(text);
    roomname = roomname || '';  
    roomname = app.checkForSciprt(roomname);
    
    
    var $message = $(`<div class='messageContent'>
                        <span class='username'>@${username}</span>
                        <span class='roomName'>${roomname}</span>
                        <div class='messageText'>${text}</div>
                        <span class='createdAt' data-time='${createdAt}'>${createdAt}</span>
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
  handleSubmit(username, text) {
    var message = {
      username: username,
      text: text,
      roomname: '4chan'
    }; 
    console.log(message);
    this.send(message);
  },

  checkForSciprt(text) {
    if (text.includes('<script>')) return 'script blocked';
    else return text;
  }
};

// update message stream
var _updateStream = function() {};

// count JSON file length
var _JSONLength = function() {};

// length from last fetch



