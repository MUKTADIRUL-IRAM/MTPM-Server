const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const invitationController = require('../controllers/invitationController');

router.post('/createInvitedUserData',verifyToken,invitationController.saveInvitationDataToDatabase);
router.patch('/acceptInvitation/:invitationId',verifyToken,invitationController.acceptInvitation);
router.patch('/rejectInvitation/:invitationId',verifyToken,invitationController.rejectInvitation);

module.exports = router;