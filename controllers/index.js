const listContacts = require('./contacts/listContacts')
const getContactById = require('./contacts/getContactById')
const addContact = require('./contacts/addContact')
const updateContactById = require('./contacts/updateContactById')
const removeContact = require('./contacts/removeContact')
const updateStatusContact = require('./contacts/updateStatusContact')
const register = require('./auth/register')
const login = require('./auth/login')
const logout = require('./auth/logout')
const currentUser = require('./auth/current')
const add = require('./auth/add')

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateStatusContact,
  register,
  login,
  logout,
  currentUser,
  add
}
