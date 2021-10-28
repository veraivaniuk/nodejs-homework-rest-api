const { BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const { sendSuccessRes } = require('../../helpers/sendSuccessRes')

const { User } = require('../../model/user')

const { SECRET_KEY } = process.env

const login = async(req, res) => {
  const { email, password = 'starter' } = req.body
  const user = await User.findOne({ email }, '_id email password, verify')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Invalid email or password')
  }
  if (!user.verify) {
    throw new BadRequest('Email not verify')
  }
  const { _id } = user
  const payload = {
    _id
  }
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(_id, { token })
  sendSuccessRes(res, token, 200)
}

module.exports = login
