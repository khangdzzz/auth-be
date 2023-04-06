import express from 'express';
import {playerController} from '../controller/player.controller.js';
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/getPlayerById/:id', playerController.getPlayerById);
router.get('/getPlayerByNameLogin', playerController.getPlayerByNameLogin);

export default router;
