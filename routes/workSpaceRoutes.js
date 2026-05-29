const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const workSpaceController = require('../controllers/workSpaceController');

router.post('/createWorkSpace',verifyToken,workSpaceController.saveWorkSpaceToDataBase);
router.get('/getWorkSpaceList',verifyToken,workSpaceController.getWorkSpaceList);
router.get('/getSingleWorkSpace/:workSpaceId',verifyToken,workSpaceController.getSingleWorkSpace);

module.exports = router;