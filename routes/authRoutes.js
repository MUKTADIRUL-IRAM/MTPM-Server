//Routes decide which controller runs

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')//"authController" is the 
//object containing all exported functions

router.post('/jwt',authController.jsonWebToken);//router.post() = endpoint path
router.post('/logout',authController.clearingCookie);

module.exports = router;

//Both will not run because:
// Express checks 2 things:

// 1.HTTP method (GET / POST)
// 2.Path (/login, /register)

/*Only one will run because Express matches method + path */