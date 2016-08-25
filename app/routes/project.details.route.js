var router = require('express').Router();
var projectsController =  require('../controllers/projectsController');

router.post('/createProject',projectsController.createProject);
router.get('/projectList',projectsController.getProjectList);
router.get('/projectDetails',projectsController.getProjectDetails);
router.delete('/deleteProject',projectsController.deleteProject);
router.get('/updateProject',projectsController.updateProject);

module.exports = router;