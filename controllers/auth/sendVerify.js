const { NotFound, Forbidden } = require('http-errors')
const { User } = require('../../model/user')
const sendEmail = require('../../helpers/sendEmail')
const sendSuccessRes = require('../../helpers/sendSuccessRes')

const sendVerify = async (req, res) => {
  const { email } = req.body

  if (!email) {
    throw new NotFound('Email not found')
  }

  const user = await User.findOne({ email })

  if (!user) {
    throw new NotFound('User not found')
  }

  if (user.verify) {
    throw new Forbidden('User already verified')
  }

  const dataForEmail = {
    to: email,
    subject: 'Verify your email.',
    html: `<a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">Confirm email<a>`,
  }

  await sendEmail(dataForEmail)

  sendSuccessRes(res, null, 201)
}

module.exports = sendVerify
