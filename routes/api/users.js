const express = require('express')

const { joiSchema } = require('../../model/user')
const { controllerWrapper, validation, authenticate } = require('../../middlewares/')
const { register, login, logout, currentUser } = require('../../controllers/index')

const router = express.Router()

router.post('/register', validation(joiSchema), controllerWrapper(register))

router.post('/login', validation(joiSchema), controllerWrapper(login))

router.get('/logout', authenticate, controllerWrapper(logout))

router.get('/current', authenticate, controllerWrapper(currentUser))

module.exports = router
