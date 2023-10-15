const data = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data
  },
}

// REST API's methods which we can use for /users route
// this API's is just for example
const getAllUsers = (req, res) => {
  return res.status(200).json(data.users)
}

const createUser = (req, res) => {
  const { email, password } = req.body

  // check if email and password are not empty
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Error. Please fill all fields' })
  }

  const newUser = {
    id: data.users[data.users.length - 1].id + 1,
    email,
    password,
  }

  // add new user to users array
  // data.users.setUsers([...data.users, newUser])
  // or
  data.users.push(newUser)

  res.status(201).json({
    message: 'Successfully created!',
    users: data.users,
  })
}

const updateUser = (req, res) => {
  const user = data.users.find(
    (user) => user.id === parseInt(req.body.id),
  )

  // if user doesn't exist - return error
  if (!user) {
    return res.status(400).json({
      message: `User with ID: ${req.body.id} not found`,
    })
  }
  // if user exists - update user
  if (req.body.email) user.email = req.body.email
  if (req.body.password) user.password = req.body.password

  // filter users array by id, to exclude updated user
  const filteredUsers = data.users.filter(
    (user) => user.id !== parseInt(req.body.id),
  )
  // add updated user to the end of users array
  const unsortedUsers = [...filteredUsers, user]

  // set users array with updated user
  data.setUsers(
    unsortedUsers.sort((a, b) =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0,
    ),
  )
  res.json({ message: 'Successfully updated!', user })
}

const deleteUser = (req, res) => {
  const user = data.users.find(
    (user) => user.id === parseInt(req.body.id),
  )

  // if user doesn't exist - return error
  if (!user) {
    return res.status(400).json({
      message: `User with ID:${req.body.id} not found`,
    })
  }

  // filter users array by id, to exclude deleted user
  const filteredUsers = data.users.filter(
    (user) => user.id !== parseInt(req.body.id),
  )

  // set users array without deleted user
  data.setUsers([...filteredUsers])

  res.json({ message: 'Successfully deleted!', user })
}

const getUserById = (req, res) => {
  const user = data.users.find(
    (user) => user.id === parseInt(req.params.id),
  )

  // if user doesn't exist - return error
  if (!user) {
    return res.status(400).json({
      message: `User with ID: ${req.params.id} not found`,
    })
  }

  res.json({ message: 'Successfully found!', user })
}

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
}
