const { User } = require('../../model/user')

const logout = async(req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.json({
    status: 'success',
    code: 204,
    message: 'No Content'
  })
}

module.exports = logout
