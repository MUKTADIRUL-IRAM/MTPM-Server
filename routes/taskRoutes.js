const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const taskController = require('../controllers/taskController');

router.post('/post_tasks',verifyToken,taskController.postTaskToDatabase);
router.get('/get_tasks/:id',verifyToken,taskController.getProjectRelatedTaskFromDatabase);
router.put('/update_task/:id',verifyToken,taskController.updateTaskInDataBase);
router.put('/update_status/:id',verifyToken,taskController.updateStatusInDatabase);


module.exports = router;