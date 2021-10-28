const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter'
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
    default: v4()
  },
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.createAvatar = function(avatar) {
  this.avatarURL = avatar
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const { SECRET_KEY } = process.env

userSchema.methods.createToken = function() {
  const payload = {
    _id: this._id
  }
  return jwt.sign(payload, SECRET_KEY)
}

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().optional(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiSchema
}
