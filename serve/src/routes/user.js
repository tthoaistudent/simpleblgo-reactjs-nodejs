const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const userController = require('../controllers/userController')

router.get('', auth, userController.getAllUser);
router.post('',  userController.createUser);
router.get('/me',auth ,userController.getProfile);
router.get('/:id',auth ,userController.findOneUser);
router.delete('/:id', auth, userController.deleteUser);
router.put('', auth, userController.updateProfile);


module.exports = router;