// $(document).ready(function() {
//
//   // API keys: ".. /env/config.js"
//
//   $.get(url, function(data) {
//     console.log()
//     $('#chats').append(data);
//   });
// });

const url = "http://parse.sfm6.hackreactor.com/";

var app = {
  init() {

  },
  send(input) {
    $.ajax({
      url: url,
      type: "POST",
      data: input
    });
  },
  fetch() {
    $.ajax({
      type: 'GET'
    });
  },
  clearMessages() {
    $('#chats').remove();
  },
  renderMessage(message) {
    $('#chats').append(message);
  }

};
