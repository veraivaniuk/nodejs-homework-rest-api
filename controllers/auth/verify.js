const { NotFound } = require('http-errors')
const { User } = require('../../model/user')

const verify = async (req, res) => {
  const user = await User.findOne({ verifyToken: req.params.verifyToken })

  if (!user) {
    throw new NotFound('Verify error')
  }

  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification successful'
  })
}

module.exports = verify
