var pgp = require('pg-promise')(/*options*/)
var dbconfig = require('../config/settings.js').settings
var db = pgp(dbconfig)

function getAllPhones(callback) {
	var requete = 'select phone from public.users'
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function getThePhone(phone_user, callback) {
	var requete = `SELECT count(1) FROM public.users where phone='${phone_user}'`
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}


function addPhoneUser(phone, localisation, nom, prenom, callback)
{
    var requete = `INSERT INTO public.users (phone, localisation, nom, prenom) VALUES ('${phone}', '${localisation}', '${nom}', '${prenom}')`
    console.log(requete);
    
    db.none(requete, null)
            .then(function (data) {
                callback();
    }).catch(function(error) {
        console.log(error)
        callback(); // devrait normalement remonte à la page web
    })
}

function getUsersWithin(localisation, rayon, callback) {
	var requete = `SELECT phone FROM public.users where st_dwithin(users.localisation, '${localisation}', ${rayon})`
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function updateUserLoc(localisation, phone, callback)
{
    var requete = `UPDATE public.users SET localisation='${localisation}' WHERE phone='${phone}'`
    
    console.log(requete);
    
    db.none(requete, null).
            then(function (data) {
                callback();
            }).catch(function(error) {
        console.log(error) // devrait normalement remonter à la page web
    })
}

function deleteIt(phone, callback)
{
    var requete = `DELETE FROM public.users WHERE phone='${phone}'`
    
    console.log(requete);
    
    db.none(requete, null).
            then(function (data) {
                callback();
            }).catch(function(error) {
        console.log(error) // devrait normalement remonter à la page web
    })
}

function addMessage(message, phone, phone_emetteur, timestamp, callback)
{
    var requete = `INSERT INTO public.messages (phone, phone_emetteur, messages, time) VALUES ('${phone}', '${phone_emetteur}', '${message}', ${timestamp})`
    console.log(requete);
    
    db.none(requete, null)
        .then(function (data) {
                callback();
    })
        .catch(function(error) {
         console.log(error) // devrait normalement remonte à la page web
    })
}

function getMess(phone, callback) {
    // ne pas oublier de retirer les messages ensuite !!!!!!
    var requete = `SELECT messages, phone, time, phone_emetteur FROM public.messages where phone='${phone}'`
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

function deleteMess(phone, callback)
{
    var requete = `DELETE FROM public.messages WHERE phone='${phone}'`
    
    console.log(requete);
    
    db.none(requete, null).
            then(function (data) {
                callback();
            }).catch(function(error) {
        console.log(error) // devrait normalement remonter à la page web
    })
}

function getNameAndSurname(phone, callback) 
{
    var requete = `SELECT nom, prenom FROM public.users where phone='${phone}'`
    console.log(requete);
    
    db.any(requete, null)
            .then(function (data)  {
                callback(null, data)
    })
            .catch(function(error)  {
                callback(error, null)
    })    
}

module.exports = {
  getAllPhones,
  getThePhone,
  addPhoneUser,
  getUsersWithin, 
  updateUserLoc,
  deleteIt,
  addMessage,
  getMess,
  deleteMess,
  getNameAndSurname
};