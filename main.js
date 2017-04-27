var express = require('express');
var path = require('path');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var users_router = require('./routes/users_ctrl');
var users_services = require('./services/users')

app.use('/api/', users_router);

var io = require('socket.io')(server);


io.on('connection', function (socket) {
  socket.on('join', function (data) {
    socket.join(data.phone); // We are using room of socket io

	// On check si le numéro de téléphone qui vient d’établir une connection a des messages en attente ou pas : code à écrire si c’est le cas :
      io.sockets.in(data.phone).emit('receive_msg', {msg: 'Vous aviez un message en attente alors le voici :)'});
	// on écoute s’il y a des messages provenant des clients:
		socket.on('message', function(message) {console.log(message)});
  });

});


/*io.on('connect', function (socket) {
    console.log("Start animation");
    surface_services.animationOn(socket)
    
    socket.on('disconnect', function() {
        console.log("Stop animation")
        surface_services.animationOff(socket)
    })
})*/


// le repertoire public va contenir les
// fichiers statiques
//app.use(express.static('public'));

server.listen(8080); // démarrage du serveur sur le port 8080

console.log("Serveur démarré sur le port 8080");