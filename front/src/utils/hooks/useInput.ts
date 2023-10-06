import { ChangeEvent, useState } from 'react'

export enum ErrorType {
  INCORRECT = 'incorrect email',
  PASSWORD_SIMPLE = 'password is too simple, try again',
  PASSWORD_SHORT = 'password must be at least 8 characters long',
  CONTAIN_BIG = 'password must contain at least one uppercase letter',
  CONTAIN_SPECIAL = 'password must contain at least one special character',
  CONTAIN_NUMBER = 'password must contain at least one number',
  IS_EMPTY = 'field is empty',
  IS_SHORT = 'email is too short',
  NONE = '',
}

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState<string>('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const setErrorWithEnum = (error: ErrorType) => {
    setError(error)
  }

  return {
    value,
    error,
    onChange: handleChange,
    setError: setErrorWithEnum,
  }
}
