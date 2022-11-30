const UserService = require('../../services/users')

const createUser = async (req, res) => {
  try {
    const newUser = await UserService.create(req.body)
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(404).json({ message: error.message })
  }
}

module.exports = { createUser }