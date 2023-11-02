const data = {
  transactions: require('../../model/transactions.json'),
}

const getAllTransactions = (req, res) => {
  // calculate total amount based on type of transaction
  // if type is 'receive' - add amount to total, if 'send' - subtract
  const getAmount = data.transactions.reduce(
    (acc, transaction) => {
      const amount = parseFloat(transaction.amount)
      return transaction.type === 'receive'
        ? acc + amount
        : acc - amount
    },
    0,
  )

  // round to 2 decimal places
  const totalAmount = getAmount.toFixed(2)

  // create response data
  const responseData = {
    totalAmount,
    transactions: data.transactions,
  }
  return res.status(200).json(responseData)
}

const createTransaction = (req, res) => {
  const { email, amount, type } = req.body

  // check if email and amount are not empty
  if (!email || !amount) {
    return res
      .status(400)
      .json({ message: 'Error. Please fill all fields' })
  }

  const newTransaction = {
    id:
      data.transactions[data.transactions.length - 1].id +
      1,
    date,
    email,
    amount,
    type,
  }

  // add transaction to transactions data
  data.transactions.push(newTransaction)

  res.status(201).json({
    message: 'Successfully created!',
    transactions: data.transactions,
  })
}

const getTransactionById = (req, res) => {
  const transaction = data.transactions.find(
    (transaction) =>
      transaction.id === Number(req.params.id),
  )

  // if transaction doesn't exist - return error
  if (!transaction) {
    return res.status(400).json({
      message: `Transaction with such id: ${req.params.id} not found`,
    })
  }

  res.status(200).json(transaction)
}

module.exports = {
  getAllTransactions,
  createTransaction,
  getTransactionById,
}
