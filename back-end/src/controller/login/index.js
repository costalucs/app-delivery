const { encode } = require('../../utils/encode');
const UserService = require('../../services/users')

const login = async (req, res) => {
  const { email, password } = req.body;
  const passwordMd5 = encode(password)
  const user = await UserService.getOne(email, passwordMd5)
  if (!user) return res.status(404).json({message: "Not found"})
  return res.status(200).json(user)
}

module.exports = { login }