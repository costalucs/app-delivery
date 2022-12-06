const UserService = require('../../services/users');
const { HttpException } = require('../../shared/error');

const login = async (req, res, next) => {
  try {
    // treat request
    const { email, password } = req.body;
    if (!email || !password) throw new HttpException(400, 'Missing required fields');
    // request services
    const token = await UserService.login(email, password);
    // provide response
    return res.status(200).json({ token });
  } catch (e) {
    next(e);
  }
};

module.exports = { login };
