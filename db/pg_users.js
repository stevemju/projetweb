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

module.exports = {
  getAllPhones,
  getThePhone,
  addPhoneUser,
  getUsersWithin, 
  updateUserLoc,
  deleteIt
};