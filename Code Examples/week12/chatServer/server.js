const express = require("express");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http, {
    cors: {}
});

const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));

io.on("connection", socket=>{
    let tempUserName = "User-" + Math.floor(Math.random() * (100000 - 1 + 1)) + 1; 

  socket.on('disconnect', function(){
    console.log('user disconnected'); // show when the user disconnected
  });

  socket.on('chat message', function(msg){ // when the socket receives a "chat message"
      console.log("user sent: " + msg);
      io.emit('chat message', tempUserName + ": " + msg); // send the message back to the users
  });
});


http.listen(HTTP_PORT, ()=>{
    console.log("server listening on: " + HTTP_PORT);
});

