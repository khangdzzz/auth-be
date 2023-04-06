import {getPlayerById, getPlayerByNameLogin} from '../service/player.service.js';

export const playerController = {
  getPlayerById: async (req, res, next) => {
    const id = req.params.id;
    const user = await getPlayerById(id);
    return res.send(user);
  },
  getPlayerByNameLogin: async (req, res, next) => {
    const name = req.payload.username;
    const listUser = await getPlayerByNameLogin(name);
    return res.send(listUser);
  },

};
