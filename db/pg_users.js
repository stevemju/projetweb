var pgp = require('pg-promise')(/*options*/)
var dbconfig = require('../config/settings.js').settings
var db = pgp(dbconfig)
/*

function updateUserInfo(callback)
{
}

function addUser(callback)
{
}

function getUserInfo(callback)
{
}

function deleteUserInfo(callback)
{
}

function getContactList(callback)
{
}

function getUserLocation(callback)
{
}

function updateUserLocation(callback)
{
}

*/

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
    
    db.none(requete, null).
            then(function (data) {
                callback();
    }).catch(function(error) {
        console.log(error) // devrait normalement remonte à la page web
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

module.exports = {
  getAllPhones,
  getThePhone,
  addPhoneUser,
  getUsersWithin
};