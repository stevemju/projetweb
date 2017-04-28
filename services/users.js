var db = require('../db/pg_users.js')

// Renvoie tous les numéros de téléphone de la BDD dans un package JSON : tableaux phone
function listAllPhones(req, res) {
     db.getAllPhones(function(error,data)	
     {
         if (error == null)
         {
            res.status(200).json({
                phone : data
            });
            console.log(data);
         }
         else
         {
             console.log(error);
             res.status(500).send(error);
         }
    })
}

// Renvoie un package JSON : phoneIsHere vaut 0 si le téléphone n'est pas dans la BDD, 1 s'il y est
function isThePhone(req, res) {

	const phone_user = req.params.phone;

     db.getThePhone(phone_user, function(error,data)	
     {
         if (error == null)
         {
            res.status(200).json({
                isHere : data
            });
            console.log(data);
         }
         else
         {
             console.log(error);
             res.status(500).send(error);
         }
    })
}


function addUser(req, res)
{
    var phone = req.body.phone
    var nom = req.body.nom
    var prenom = req.body.prenom
    var localisation = req.body.localisation
    
    db.addPhoneUser(phone, localisation, nom, prenom, function () {
        res.status(200).send("ok");
    })
}

function listUsersWithin(req, res)
{
    const localisation = req.params.localisation;
    const rayon = req.params.rayon;
    
    db.getUsersWithin(localisation, rayon, function(error,data) 
     {
         if (error == null)
         {
            res.status(200).json({
                users : data
            });
            console.log(data);
         }
         else
         {
             console.log(error);
             res.status(500).send(error);
         }
    })
}

function updateUserLocalisation(req, res)
{
    var localisation = req.body.localisation;
    var phone = req.body.phone;
    
    db.updateUserLoc(localisation, phone, function() {
        res.status(200).send("ok");
    })
}

function deleteUser(req, res)
{
    var phone = req.params.phone;
    
    db.deleteIt(phone, function() {
        
        res.status(200).send("ok");
    })
}

function saveMessages(message, phone) 
{
    db.addMessage(message, phone, function() {
        // res.status(200).send("ok");
    })
}

function getMessages(phone, callback) 
{
    db.getMess(phone, function(error,data)   
     {
         if (error == null)
         {
            console.log(data);
         }
         else
         {
             console.log(error);
         }
         callback(data);
    })
}


module.exports = {
  listAllPhones,
  isThePhone,
  addUser,
  listUsersWithin, 
  updateUserLocalisation,
  deleteUser,
  saveMessages,
  getMessages
};