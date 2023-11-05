// Підключаємо роутер до бек-енду
const express = require('express')
const router = express.Router()
const verifyJWT = require('../../middleware/verifyJWT')

// const auth = require('./auth')
// router.use('/auth', auth)

router.use('/register', require('./register'))
router.use('/auth', require('./auth'))

// route for refreshing token (we will use it in front-end)
// router.use('/refresh', require('./refresh'))

// route for logout
router.use('/logout', require('./logout'))

// route for transactions
router.use('/transactions', require('./api/transactions'))
router.use(
  '/transactions/:id',
  require('./api/transactions'),
)

// for verifying JWT token we use verifyJWT middleware before all routes which we want to protect
// router.use(verifyJWT)
// so verifyJWT middleware will be applied to all routes below
router.use('/users', require('./api/users'))
router.use('/users/:id', require('./api/users'))

router.get('/', (req, res) => {
  res.status(200).json('Hello World')
})

// Експортуємо глобальний роутер
module.exports = router
