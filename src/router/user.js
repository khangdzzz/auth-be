import express from 'express';
import {userController} from '../controller/user.controller.js';
import {verifyAccessToken} from '../../helper/jwt.js';
import {verifyPermission} from '../../middleware/permission.js';
const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', [verifyAccessToken], userController.logout);
router.get('/all', [verifyAccessToken, verifyPermission], userController.getAllUser);

export default router;
