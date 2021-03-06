var router = require('express').Router();
var userController =  require('../controllers/userController');

router.post('/userSignUp',userController.userSignUp);
router.post('/userLogin',userController.userLogin);
router.get('/userInfo', userController.getUserInfoById);
router.post('/updateUserInfo', userController.updateUserInfo);

router.get('/sendForgotLink', userController.sendForgotLink);
router.post('/updatePassword', userController.updatePassword);
module.exports = router;