const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

const projectsController = require('../controllers/projectsController');

router.post('/postProjects',verifyToken,projectsController.postProjectsToDataBase);
router.get('/getProjects/:workSpaceId',verifyToken,projectsController.getProjects);//Express route params are ALWAYS STRINGS.(I used req.params.workSpaceName._id)
router.get('/getSingleProject/:id',verifyToken,projectsController.getSingleProject);
router.delete('/deleteProject/:projectId',verifyToken,projectsController.deleteProjectFromDataBase);


module.exports = router;