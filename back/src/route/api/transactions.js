const express = require('express')
const router = express.Router()

const {
  getAllTransactions,
  createTransaction,
} = require('../../../controllers/transactionsController')

router
  .get('/', getAllTransactions)
  .post('/', createTransaction)

router.route('/:transactionId').get(getTransactionById)

module.exports = router
