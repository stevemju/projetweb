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
	// Si message en attente : on suppose que nico et Alexis aussi tout OK
	if (data.phone == '0630637680') {
     io.sockets.in(data.phone).emit('receive_msg', {msg: 'Nicolas tu avais un message !!!'});
 	}
 	if (data.phone == '0658267981') {
		io.sockets.in(data.phone).emit('receive_msg', {msg: 'Coucou Alexis t es tout bien'});
 	}
	// on écoute s’il y a des messages provenant du client:
	  socket.on('message', function(message) {
	  	// écrire dans la BDD les messages
	  	console.log(message)
	  	io.sockets.emit('send_me_a_check');
	  });
	  // Alexis envoie un message, je veux que Nicolas sache qu'Alexis a envoyé un message
	  socket.on('check', function() { 
	  	if (data.phone == '0630637680') {
     		io.sockets.in(data.phone).emit('receive_msg', {msg: 'Nicolas on a checké ta base'});
 		}
 		if (data.phone == '0658267981') {
			io.sockets.in(data.phone).emit('receive_msg', {msg: 'Alexis on a checké ta base'});
 		}
 	})
  });
  // on envoie les messages en attente
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