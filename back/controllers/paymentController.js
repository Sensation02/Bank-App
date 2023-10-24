const PaymentSystemDB = require('../model/paymentSystems.json')

const getAllPaymentSystems = async (req, res) => {
  try {
    const paymentSystems = await PaymentSystemDB.find()
    res.status(200).json(paymentSystems)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = {
  getAllPaymentSystems,
}
