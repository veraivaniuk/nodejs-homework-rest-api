const currentUser = async(req, res) => {
  const { email, subscription } = req.user
  res.json({
    status: 'succes',
    code: 200,
    user: {
      email,
      subscription,
    },
  })
}

module.exports = currentUser
