const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')

const { User } = require('../../model/user')
const { sendSuccessRes } = require('../../helpers/sendSuccessRes')

const avatarsDir = path.join(__dirname, '../../', 'public')

const add = async(req, res) => {
  const { path: tempDir, originalname } = req.file
  try {
    const newUser = {
      email: req.body.email,
      avatar: '/public/avatars/way.png'
    }
    const result = await User.create(newUser)
    const [extention] = originalname.split('.').reverse()
    const newName = `user${result._id}.${extention}`
    const originalImage = await Jimp.read(tempDir)
    const resizedImage = await originalImage.resize(250, 250)
    await resizedImage.write(`${avatarsDir}/avatars/${newName}`)
    fs.unlink(tempDir)
    const avatar = path.join('/avatars', newName)
    const { avatarURL } = await User.findByIdAndUpdate(result._id, { avatarURL: avatar }, { new: true })
    sendSuccessRes(res, { avatarURL })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
}

module.exports = add
