const UserService = require('../../services/users');
const { HttpException } = require('../../shared/error');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new HttpException(400, 'Missing required fields');
    const token = await UserService.login(email, password);
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = { login };
