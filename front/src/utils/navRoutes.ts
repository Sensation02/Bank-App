enum SignupSteps {
  SignupConfirm = '/signup-confirm',
  Signup = '/signup',
  Signin = '/signin',
  Recovery = '/recovery',
  RecoveryConfirm = '/recovery-confirm',
  Balance = '/balance',
  Notifications = '/notifications',
  Settings = '/settings',
  Receive = '/receive',
  Send = '/send',
  Transaction = '/balance/:transactionId',
  Index = '/',
}

export const ApiURL = 'http://localhost:4000'

export default SignupSteps
