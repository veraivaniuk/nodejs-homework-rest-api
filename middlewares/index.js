const authenticate = require('./authorization')
const validation = require('./validation')
const controllerWrapper = require('./ctrl')
const upload = require('./upload')

module.exports = {
  authenticate,
  validation,
  controllerWrapper,
  upload
}
