const role = {
  user: 'user',
  admin: 'admin',
};

export const verifyPermission = (req, res, next) => {
  const data = req.payload;
  if (data.role === role.user) next();
  return res.status(403);
};
