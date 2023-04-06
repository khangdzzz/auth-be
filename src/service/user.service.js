import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Player from '../models/player.model.js';
import DataPlayer from '../models/dataPlayer.model.js';
import dotenv from 'dotenv';
dotenv.config();

export const getAll = async () => {
  return await User.find();
};

export const register = async (userParam, userAgent) => {
  // validate
  if (await User.findOne({username: userParam.username})) {
    // eslint-disable-next-line no-throw-literal
    return;
  }

  const user = new User(userParam);

  // hash password
  if (userParam.password) {
    user.password = bcrypt.hashSync(userParam.password, 10);
  }

  return await user.save().then( async (user) => {
    const player = new Player({
      userId: user.id,
      username: user.username,
      password: user.password,
      totalMoney: 1000, // hard code,
      idDevice: Math.floor(Math.random() * 10000),
    });

    const dataPlayer = new DataPlayer({
      userId: user.id,
      versionClient: 'v1', // hard code
      deviceModel: 'laptop', // hard code
      deviceName: userAgent,
    });

    await player.save();
    await dataPlayer.save();
    user.player = player.id;
    user.dataPlayer = dataPlayer.id;
    await user.save();
    return user;
  });
};

export const login = async ({username, password}, userAgent) => {
  const user = await User
              .findOne({username})
              .populate({
                path: 'player',
                select: {_id: 0, totalMoney: 1, dateLogin: 1},
              })
  if (user && bcrypt.compareSync(password, user.password)) {
    const pyload = {
      sub: user.id,
      role: user.role,
      username: user.username,
    };
    const token = jwt.sign(pyload, process.env.SERCRET, {expiresIn: '1h'});

    const player = await Player.findOne({userId: user.id})
    player.dateLogin = new Date().toLocaleString();
    player.idDevice = Math.floor(Math.random() * 10000), // hard code
    await player.save();

    const dataPlayer = await DataPlayer.findOne({userId: user.id});
    dataPlayer.deviceModel = 'laptop', // hard code
    dataPlayer.deviceName = userAgent;
    dataPlayer.isActive = true;
    await dataPlayer.save();

    return {
      ...user.toJSON(),
      token,
    };
  }
  return
};

export const logout = async (sub) => {
  const dataPlayer = await DataPlayer.findOne({userId: sub});
  dataPlayer.isActive = false;

  return await dataPlayer.save();
}
