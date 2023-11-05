const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require('../../../controllers/usersController')
const {
  updateUsersEmail,
} = require('../../../controllers/updateUser/updateEmailController')
const {
  updateUsersPassword,
} = require('../../../controllers/updateUser/updatePasswordController')
const getByEmail = require('../../../controllers/PasswordRecovery/getByEmailController')
// const verifyJWT = require('../../../middleware/verifyJWT')

// here we can create, read, update, delete users (CRUD) using REST API methods (GET, POST, PUT, DELETE) for /users route
// apply verifyJWT middleware to all routes which we want to protect
// if we want to protect all routes in this file, we can use it in main router file (back/src/route/index.js)
router.route('/').get(getAllUsers).delete(deleteUser)

router.route('/').post((req, res, next) => {
  const conditionAll = req.body.email && req.body.password
  const conditionEmail = req.body.email
  const conditionRecover =
    req.body.oldPassword && req.body.newPassword

  if (conditionAll) {
    return createUser(req, res, next)
  } else if (conditionEmail) {
    return getByEmail(req, res, next)
  } else if (conditionRecover) {
    return updateUsersPassword(req, res, next)
  } else {
    return res.status(400).json({
      message: 'Error. Please fill all fields',
    })
  }
})

router.route('/').put((req, res, next) => {
  const conditionAll = req.body.email && req.body.password
  const conditionEmail = req.body.email
  const conditionPassword =
    req.body.oldPassword && req.body.newPassword
  const conditionId = req.body.id

  if (conditionAll) {
    return updateUsersEmail(req, res, next)
  } else if (conditionEmail) {
    return updateUsersEmail(req, res, next)
  } else if (conditionPassword) {
    return updateUsersPassword(req, res, next)
  } else if (conditionId) {
    return updateUser(req, res, next)
  } else {
    return res.status(400).json({
      message: 'Error. Please fill all fields',
    })
  }
})

// here we can get user by id
router.route('/:id').get(getUserById)

module.exports = router
