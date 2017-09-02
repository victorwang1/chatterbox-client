const url = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';

var app = {
 
  lastUpdate: undefined,
  rooms: {},
  newRooms: {},
  friends: {},
  data: {
    'order': '-createdAt',
    'limit': '50'
  },
  init() {

  },
  send(input) {
    $.ajax({
      url: url,
      type: 'POST',
      data: input,
      success: function (data) {
        console.log('chatterbox: Message sent:');
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
  clearRooms() {
    $('#roomSelect').empty();
  },
  renderMessage(message) {
    var {username, text, roomname, createdAt} = message;
    if (!(username || text || roomname)) return;
    username = app.checkForSciprt(username);
    if (username.length > 15) username = username.slice(0, 15);
    text = app.checkForSciprt(text);
    roomname = roomname || 'undefined';  
    roomname = app.checkForSciprt(roomname);
    if (!app.rooms[roomname]) {
      app.newRooms[roomname] = roomname;
    }
    
    var $message = $(`<div class='messageContent'>
                        <span class='username'>@${username}</span>
                        <span class='roomName'>${roomname}</span>
                        <div class='messageText'>${text}</div>
                        <span class='createdAt'>${createdAt}</span>
                      </div>`);
    if (app.friends[username]) {
      $message.find('.username').addClass('friend');
    }
    $('#chats').append($message);
  },
  renderRoom(roomName) {
    var $newRoom = $('<option></option>');
    $newRoom.text(roomName);
    $('#roomSelect').append($newRoom);
  },
  handleUsernameClick(username) {
    app.friends[username] = username;
  }, 

  handleSubmit(username, text, roomname) {
    var message = {
      username: username,
      text: text,
      roomname: roomname
    }; 
    this.send(message);
  },

  checkForSciprt(text) {
    if (text.includes('<script>')) return 'script blocked';
    else return text;
  }
};


