const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const projectsController = require('../controllers/projectsController');

router.post('/postProjects',verifyToken,projectsController.postProjectsToDataBase);
router.get('/getProjects',verifyToken,projectsController.getProjects);
router.get('/getSingleProject/:id',verifyToken,projectsController.getSingleProject);


module.exports = router;