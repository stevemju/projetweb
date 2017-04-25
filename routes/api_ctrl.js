var express = require('express');
var router = express.Router();
var service = require('../services/api_functions');


router.put('/user/', service.updateUserInfo);
router.post('/user/', service.addUser);
router.get('/user/', service.getUserInfo);
router.delete('/user/', service.deleteUserInfo);

router.get('/user/contacts/:idUser', service.getContactList);

router.get('/user/location/:idUser', service.getUserLocation);
router.put('/user/location/:idUser', service.updateUserLocation);




module.exports = router
