const data = {
  transactions: require('../../model/transactions.json'),
  setTransactions: function (data) {
    this.transactions = data
  },
}
const { format } = require('date-fns')
const path = require('path')
const fsPromises = require('fs').promises

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

const createTransaction = async (req, res) => {
  const { email, amount, type } = req.body
  date = format(new Date(), 'dd/MM HH:mm')
  console.log(date)

  // check if email and amount are not empty
  if (!amount) {
    return res
      .status(400)
      .json({ message: 'Error. Please fill amount field' })
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
  // or
  // const otherTransactions = data.transactions.filter(
  //   (transaction) => transaction.id !== newTransaction.id,
  // )
  // data.transactions.setTransactions([
  //   ...otherTransactions,
  //   newTransaction,
  // ])

  // save transactions data to file
  await fsPromises.writeFile(
    path.join(__dirname, '../../model/transactions.json'),
    JSON.stringify(data.transactions, null, 2),
  )

  res.status(201).json({
    message: 'Successfully created!',
    transactions: data.transactions,
  })
}

const getTransactionById = (req, res) => {
  const id = Number(req.params.id)
  const transaction = data.transactions.find(
    (transaction) => transaction.id === id,
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
