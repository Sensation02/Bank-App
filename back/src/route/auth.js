const express = require('express')
const router = express.Router()

const { User } = require('../class/user')
const { Session } = require('../class/session')
const { Confirm } = require('../class/confirm')

User.create({
  email: 'user@mail.com',
  password: 123,
})

User.create({
  email: 'admin@mail.com',
  password: 123,
})

User.create({
  email: 'developer@mail.com',
  password: 123,
})

router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  console.log(req.body)

  if (!email || !password || !role) {
    res
      .status(400)
      .json({ message: 'Error. Please fill all fields' })
  }

  try {
    const user = User.getByEmail(email)

    if (user) {
      return res.status(400).json({
        message: 'User with such email already exists',
      })
    }
    const newUser = User.create({ email, password, role })

    const session = Session.create(newUser)

    Confirm.create(newUser.email)

    return res.status(200).json({
      message: 'Successfully signed up!',
      session,
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Error. Try again' })
  }
})

router.get('/signup-confirm', function (req, res) {
  const { renew, email } = req.query
  if (renew) {
    Confirm.create(email)
  }
})

router.post('/signup-confirm', function (req, res) {
  const { code, token } = req.body

  if (!code || !token) {
    return res.status(400).json({
      message: 'Error. Required fields are empty.',
    })
  }

  try {
    const session = Session.get(token)

    if (!session) {
      return res.status(400).json({
        message: 'Error. Session is not valid.',
      })
    }

    const email = Confirm.getData(code)

    if (!email) {
      return res.status(400).json({
        message: 'Code is not valid.',
      })
    }

    if (email !== session.user.email) {
      return res.status(400).json({
        message: 'Code is not valid.',
      })
    }

    const user = User.getByEmail(session.user.email)
    user.isConfirm = true
    session.user.isConfirm = true

    return res.status(200).json({
      message: 'You are confirmed!',
      session,
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})
