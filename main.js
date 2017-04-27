var express = require('express');
var path = require('path');
var app = express(); // creation du serveur
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var users_router = require('./routes/users_ctrl');
var users_services = require('./services/users')

app.use('/api/', users_router);

var io = require('socket.io')(server);

io.on('connection', function(socket) {

	socket.send('Un client vient de se connecter');
    
    
    // on écoute la future déconnection de la socket nouvellement créée
    //socket_client.on('disconnect', function(){
     //   nbclient--; 
        // on prévient tout le monde du nouveau nombre de 
        // clients sur l'événement broadcast
      //  io.sockets.emit('broadcast', nbclient) 
    //})
})

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