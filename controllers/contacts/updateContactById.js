const { NotFound } = require('http-errors')
const { Contact } = require('../../model/contacts')
const sendSuccessRes = require('../../helpers/sendSuccessRes')

const updateContactById = async(req, res) => {
  const { id } = req.params
  const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

module.exports = updateContactById
