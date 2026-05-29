const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const notificationController = require('../controllers/notificationController');

router.get('/getNotifications',verifyToken,notificationController.getNotifications);

module.exports = router;