const express = require('express')

const { joiSchema } = require('../../model/user')
const { controllerWrapper, validation, authenticate, upload } = require('../../middlewares/')
const { register, login, logout, currentUser, add, verify, sendVerify } = require('../../controllers/index')

const router = express.Router()

router.post('/register', validation(joiSchema), controllerWrapper(register))

router.post('/login', validation(joiSchema), controllerWrapper(login))

router.get('/logout', authenticate, controllerWrapper(logout))

router.get('/current', authenticate, controllerWrapper(currentUser))

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(add))

router.get('/verify/:verificationToken', controllerWrapper(verify))

router.post('/verify', controllerWrapper(sendVerify))

module.exports = router
