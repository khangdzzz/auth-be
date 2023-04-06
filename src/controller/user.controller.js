import {register, login, getAll, logout} from '../service/user.service.js';

export const userController = {
  register: async (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const user = await register(req.body, userAgent);
    if (user) return res.status(201).send(user);
    return res.sendStatus(404);
  },
  login: async (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    const user = await login(req.body, userAgent);

    return user ? res.json(user) : res.sendStatus(400);
  },
  logout: async (req, res, next) => {
    const { sub } = req.payload
    await logout(sub);

    return res.sendStatus(200)
  },
  getAllUser: async (req, res, next) => {
    const listUser = await getAll();
    return listUser ? res.json(listUser) : res.status(400);
  },
};

