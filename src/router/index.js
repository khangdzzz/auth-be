import user from './user.js';
import player from './player.js';
import {verifyAccessToken} from '../../helper/jwt.js';
// import {verifyPermission} from '../../middleware/permission.js';

export const route = (app) => {
  app.use('/user', user);
  app.use('/player', [verifyAccessToken], player);
};
