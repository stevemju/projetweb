var db = require('../db/pg_users.js')

// Renvoie tous les numéros de téléphone de la BDD dans un package JSON : tableaux phone
function listAllPhones(req, res) {
     db.getAllPhones(function(error,data)	
     {
         if (error == null)
         {
            res.status(200).json({
                phone : data.phone
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
                phoneIsHere : data.count
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
    
    db.addPhoneUser(phone, localisation, nom, prenom, function () {
        res.status(200).send("ok");
    })
}

module.exports = {
  // exporter toutes les fonctions !!!!
  listAllPhones,
  isThePhone,
  addUser
};