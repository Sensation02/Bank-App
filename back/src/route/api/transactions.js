const express = require('express')
const router = express.Router()

const {
  getAllTransactions,
  createTransaction,
  getTransactionById,
} = require('../../../controllers/TransactionsControllers/transactionsController')

router
  .get('/', getAllTransactions)
  .post('/', createTransaction)

router.route('/:id').get(getTransactionById)

module.exports = router
