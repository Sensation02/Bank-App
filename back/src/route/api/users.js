const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
} = require('../../../controllers/usersController')
const verifyJWT = require('../../../middleware/verifyJWT')

// here we can create, read, update, delete users (CRUD) using REST API methods (GET, POST, PUT, DELETE) for /users route
// apply verifyJWT middleware to all routes which we want to protect
// if we want to protect all routes in this file, we can use it in main router file (back/src/route/index.js)
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)
  .put(updateUser)
  .delete(deleteUser)

// here we can get user by id
router.route('/:id').get(getUserById)

module.exports = router
