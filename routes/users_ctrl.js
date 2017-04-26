var express = require('express');
var router = express.Router();
var service = require('../services/users');


/*router.put('/user/', service.updateUserInfo);
router.post('/user/', service.addUser);
router.get('/user/', service.getUserInfo);
router.delete('/user/', service.deleteUserInfo);

router.get('/user/contacts/:idUser', service.getContactList);
router.get('/user/location/:idUser', service.getUserLocation);
router.put('/user/location/:idUser', service.updateUserLocation);

*/

router.get('/users/', service.listAllPhones);
router.get('/user/:phone', service.isThePhone);
router.get('/users/:localisation/:rayon', service.listUsersWithin);

router.post('/user/', service.addUser);
router.put('/user/', service.updateUserLocalisation);

router.delete('/user/:phone', service.deleteUser);

module.exports = router
