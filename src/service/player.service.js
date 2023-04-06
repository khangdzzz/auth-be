import User from '../models/user.model.js';

export const getPlayerById = async (id) => {
  return await getInformationUser({_id: id});
};
// output : IdNguoiChoi,SoTien,NgayDangNhap ,IsActive,PhienBanClient

export const getPlayerByNameLogin = async (name) => {
  return await getInformationUser({username: name});
};
// output : IdNguoiChoi,SoTien,NgayDangNhap ,IsActive,PhienBanClient

const getInformationUser = async (condition) => {
  return await User
      .findOne(condition)
      .select({_id: 0, username: 0, password: 0, role: 0, createdDate: 0})
      .populate({
        path: 'player',
        select: {_id: 0, userId: 1, totalMoney: 1, dateLogin: 1},
      })
      .populate({
        path: 'dataPlayer',
        select: {_id: 0, isActive: 1, versionClient: 1},
      });
};

