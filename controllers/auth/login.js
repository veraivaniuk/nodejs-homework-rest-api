const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../../model/user')

const { SECRET_KEY } = process.env

const login = async(req, res) => {
  const { email, password, subscription = 'starter' } = req.body
  const user = await User.findOne({ email }, '_id email password')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Invalid email or password')
  }
  const { _id } = user
  const payload = {
    _id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
      user: {
        email,
        subscription
      }

    }
  })
}

module.exports = login
