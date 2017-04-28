var express = require('express');
var path = require('path');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var bodyParser = require('body-parser');  // envoie des paramètres en POST
var io = require('socket.io')(server);
var users_router = require('./routes/users_ctrl');
var users_services = require('./services/users')


// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json 
app.use(bodyParser.json());

app.use('/api/', users_router);

var phones_connected = {};
var all_messages;
var i, n;

io.on('connection', function (socket) {
	var phone;
	// Nouvelle connexion !
	socket.on('join', function(data) {
        phones_connected[data.phone] = socket.id;
        console.log(phones_connected[data.phone]);
        phone = data.phone;
        console.log('Nouvelle connexion');
        socket.emit('receive_msg', 'On a checké ta base ' + phone);
		// on lui envoie les messages en attente 
		users_services.getMessages(phone, function(data) {
			console.log('ALL MESSAGES IN THE BDD FOR ONE PHONE ' + data);	
			socket.emit('messages_bdd', data);
		});
	
		/*if (all_messages != null) {
			socket.emit('messages_bdd', all_messages);
		}*/
			
    });


	socket.on('message', function(message) {
	  	// écrire dans la BDD les messages
	  	console.log(message)
	  	// dire à tout le monde d'envoyer un check
	  	// io.emit('send_me_a_check');

	  	// envoyer le message aux téléphones concernés qui sont en ligne
	  	var phonesToSend = JSON.parse(message.phones);
	  	console.log(phonesToSend);
	  	n = phonesToSend.length;
	  	console.log(n);
	  	
	  	for (i = 0; i < n; i++) {
	  		console.log(phonesToSend[i]);
	  		console.log(phones_connected);

		  	if (phones_connected.hasOwnProperty(phonesToSend[i])) {
		  		console.log('Le téléphone est connecté, on lui envoie le message');
		  		var you = phones_connected[phonesToSend[i]];
		  		io.to(you).emit('receive_msg', message.content);
		 	}
		 		// Si le téléphone n'est pas connecté, on stocke le message dans la BDD
	  		else {
	  			// on utilise services/users
	  			users_services.saveMessages(message.content, phonesToSend[i]);
		  		console.log('Le téléphone n est pas connecté, on stocke le message dans la BDD');
	  		}
	  	}
	 });

	socket.on('disconnect', function() {
		console.log('On déconnecte le client : ');
	})
});
/*
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
	  		console.log('Check reçu sur serveur : à envoyer à 0630637680');
     		io.sockets.in(data.phone).emit('receive_msg', {msg: 'Nicolas on a checké ta base'});
 		}
 		if (data.phone == '0658267981') {
 			console.log('Check reçu sur serveur : à envoyer à 0658267981');
			io.sockets.in(data.phone).emit('receive_msg', {msg: 'Alexis on a checké ta base'});
 		}
 	})
	  // IL faut que l'événement soit déclenché par le client pour qu'on puisse lui adresser la parole directement et qu'à LUI
  });
  // on envoie les messages en attente
});
*/

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