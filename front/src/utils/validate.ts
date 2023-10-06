enum ErrorType {
  INCORRECT = 'incorrect email',
  PASSWORD_SIMPLE = 'password is too simple, try again',
  PASSWORD_SHORT = 'password must be at least 8 characters long',
  CONTAIN_BIG = 'password must contain at least one uppercase letter',
  CONTAIN_SPECIAL = 'password must contain at least one special character',
  CONTAIN_NUMBER = 'password must contain at least one number',
  IS_EMPTY = 'field is empty',
  IS_SHORT = 'email is too short',
}

enum FIELD_NAME {
  EMAIL = 'email',
  PASSWORD = 'password',
}

const EMAIL_REGEX = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

export class SignUp {
  value = {}
  error = {}
  disabled = true

  validate = (name: string, value: string) => {
    if (value.length < 1) {
      return ErrorType.IS_EMPTY
    }
    if (name === FIELD_NAME.EMAIL) {
      if (value.length < 5) {
        return ErrorType.IS_SHORT
      }
      if (!EMAIL_REGEX.test(value)) {
        return ErrorType.INCORRECT
      }
    }
    if (name === FIELD_NAME.PASSWORD) {
      if (value.length < 8) {
        return ErrorType.PASSWORD_SHORT
      }
      if (!value.match(/[A-Z]/)) {
        return ErrorType.CONTAIN_BIG
      }
      if (!value.match(/[0-9]/)) {
        return ErrorType.CONTAIN_NUMBER
      }
      if (!value.match(/[!@#$%^&*]/)) {
        return ErrorType.CONTAIN_SPECIAL
      }
    }
  }

  validateAll = (email: string, password: string) => {
    const errors = {
      email: this.validate(FIELD_NAME.EMAIL, email),
      password: this.validate(FIELD_NAME.PASSWORD, password),
    }
    return errors
  }
}
