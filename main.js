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
var curiosite;

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
		//var timestampp = Date.now()/3600000;
		users_services.getMessages(phone, function(data) {
			
			console.log(data);
			var timestamp = Date.now()/3600000;
			// on vérifie que la date n'est pas passée
			for (var i = 0; i < data.length; i++) {
                 //alert("Message " + (i+1) + " " + data[i].messages);
                 //console.log("BDD : " + data[i].messages);
                 //console.log('les mesages : ' + data[i]);
                 if (timestamp - data[i].time > 72) {
                 	//console.log('les mesages à virer : ' + data[i]);
                 	delete data[i];
                 }
               /*  else {
                 	users_services.getName(data[i].phone, function(data2){
                 		console.log('DATA2.NOM ' + data2.nom);
                 		data[i].nom = data2.nom;
                 		data[i].prenom = data2.prenom;
                 	});
                 }*/
            } 

            socket.emit('messages_bdd', data);
			console.log('Les messages ont été checkés et envoyés à l utilisateur');
			// on peut maintenant supprimer les messages de la BDD : 
			users_services.deleteMessages(phone);
		});
    });


	socket.on('message', function(message) {
	  	// envoyer le message aux téléphones concernés qui sont en ligne
	  	var phonesToSend = JSON.parse(message.phones);
	  	console.log('Téléphones à envoyer : ' + phonesToSend);
	  	n = phonesToSend.length;
	  	message.phone = phone;
	  	
	  	for (i = 0; i < n; i++) {
	  		var phonesToSendI = phonesToSend[i];
	  		curiosite = phonesToSend[i];
	  		// Si le téléphone est en ligne, on lui envoie directement le message
		  	if (phones_connected.hasOwnProperty(phonesToSendI)) {
		  		console.log('Le téléphone : ' + phonesToSend[i] + ' est connecté, on lui envoie le message');
		  		var you = phones_connected[phonesToSendI];
		  		io.to(you).emit('receive_msg', message);
		 	}
		 	// Si le téléphone n'est pas connecté, on stocke le message dans la BDD
	  		else {
	  			console.log('Le téléphone ' + phonesToSend[i] + 'n est pas connecté, on stocke le message dans la BDD');
	  			// on utilise services/users
	  			users_services.listUsersWithin(message.localisation, message.rayon, phonesToSend[i], function(data) {
  				// on ne garde que les téléphones qui sont à proximité 
	  				for (var k = 0; k < data.length; k++) {
	  					if (data[k].phone == data.thePhone) {
	  						console.log('J ajoute un message à la BDD');
	  						users_services.saveMessages(message.content, data[k].phone, phone, message.timestamp);
	  					}
	  				}
	  			})
	  		}
	  	}
	 });

	socket.on('disconnect', function() {
		console.log('On déconnecte le client : ');
		delete phones_connected[phone];
	})
});


server.listen(8080); // démarrage du serveur sur le port 8080

console.log("Serveur démarré sur le port 8080");