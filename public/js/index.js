var socket = io();
socket.on('connect',function() {
    console.log("Connected to server");
    socket.emit('createEmail',{
        to:"aahj@gmail.com",
        text: "this is vishal goyal"
    });
    socket.emit('createMessage',{
        from: "Vishal",
        text: "hello"
    });

});

socket.on('disconnect', function(){
console.log('disconnected from server');
});
socket.on('newEmail',function(email){
    console.log('New Email', email);
});

socket.on('newMessage',function(message){
    console.log('New message', message);
});
