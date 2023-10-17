enum EmailErrors {
  REQUIRED = 'Email is required',
  INVALID = 'Invalid email',
  LATIN = 'Email must contain only latin letters',
}
enum PasswordErrors {
  REQUIRED = 'Password is required',
  IS_SHORT = 'Password must be at least 8 characters',
  CONTAIN_UPPERCASE = 'Password must contain at least one uppercase letter',
  CONTAIN_SPECIAL_CHARACTER = 'Password must contain at least one special character',
  CONTAIN_NUMBER = 'Password must contain at least one number',
}
enum TokenErrors {
  REQUIRED = 'Code is required',
  INVALID = 'Invalid code',
}

export const validateEmail = {
  required: EmailErrors.REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[A-Za-z0-9@.]+$/)) {
      return EmailErrors.LATIN
    }
    if (!value.match(/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/)) {
      return EmailErrors.INVALID
    }
    return true
  },
}

export const validatePassword = {
  required: PasswordErrors.REQUIRED,
  validate: (value: string) => {
    if (value.length < 8) {
      return PasswordErrors.IS_SHORT
    }
    if (!value.match(/[A-Z]/)) {
      return PasswordErrors.CONTAIN_UPPERCASE
    }
    if (!value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
      return PasswordErrors.CONTAIN_SPECIAL_CHARACTER
    }
    if (!value.match(/[0-9]/)) {
      return PasswordErrors.CONTAIN_NUMBER
    }
    return true
  },
}

export const validateToken = {
  required: TokenErrors.REQUIRED,
  validate: (value: string) => {
    if (!value.match(/^[A-Za-z0-9]+$/)) {
      return TokenErrors.INVALID
    }
    return true
  },
}
