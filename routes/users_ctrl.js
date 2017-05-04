var express = require('express');
var router = express.Router();
var service = require('../services/users');

router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
 });

router.get('/users/', service.listAllPhones);
router.get('/user/:phone', service.isThePhone);
router.get('/users/:localisation/:rayon', service.listUsersWithin);

router.post('/user/', service.addUser);
router.put('/user/', service.updateUserLocalisation);

router.delete('/user/:phone', service.deleteUser);

module.exports = router
