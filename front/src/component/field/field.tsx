import React, { useState } from 'react'
import './style.scss'
import showIcon from '../../assets/icons/show.svg'
import hideIcon from '../../assets/icons/hide.svg'

const EMAIL_REGEX = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

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

type FieldType = 'email' | 'password' | 'text'

interface IFieldProps {
  type: FieldType
  placeholder: string
  title: string
  onValidationChange?: (isValid: boolean, isValid2: boolean) => void
}

const Field: React.FC<IFieldProps> = ({
  title,
  type,
  placeholder,
  onValidationChange,
}) => {
  // Визначаємо стан для інпута
  const [value, setValue] = useState('')
  // Визначаємо стан для помилки
  const [errMsg, setErrMsg] = useState('')
  // Визначаємо стан для іконки
  const [icon, setIcon] = useState(showIcon)

  // Визначаємо функцію для валідації
  const validate = (value: string) => {
    let validEmail = false
    let validPassword = false

    if (value.length === 0) {
      setErrMsg(ErrorType.IS_EMPTY)
    } else if (type === 'email') {
      if (value.length < 6) {
        setErrMsg(ErrorType.IS_SHORT)
      } else if (!value.match(EMAIL_REGEX)) {
        setErrMsg(ErrorType.INCORRECT)
      } else {
        setErrMsg('')
      }
    } else if (type === 'password') {
      if (value.length < 8) {
        setErrMsg(ErrorType.PASSWORD_SHORT)
      } else if (!value.match(/[A-Z]/)) {
        setErrMsg(ErrorType.CONTAIN_BIG)
      } else if (!value.match(/[!@#$%]/)) {
        setErrMsg(ErrorType.CONTAIN_SPECIAL)
      } else if (!value.match(/[0-9]/)) {
        setErrMsg(ErrorType.CONTAIN_NUMBER)
      } else {
        setErrMsg('')
      }
    }
  }

  // Визначаємо функцію для зміни значення інпута
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // Визначаємо функцію для зміни типу інпута
  const handleIcon = () => {
    if (type === 'password') {
      icon === showIcon ? setIcon(hideIcon) : setIcon(showIcon)
    }
  }

  return (
    <div className='field'>
      {title ? <h3 className='field__title'>{title}</h3> : ''}

      <input
        type={
          type === 'password' ? (icon === showIcon ? 'password' : 'text') : type
        }
        className='field__input'
        placeholder={placeholder}
        onChange={(e) => {
          validate(e.target.value)
          handleChange(e)
        }}
        value={value}
      />
      {type === 'password' ? (
        <img
          src={icon}
          alt='show/hide'
          className='field__icon'
          onClick={handleIcon}
        />
      ) : (
        ''
      )}

      {errMsg ? <p className='field__error'>{errMsg}</p> : ''}
    </div>
  )
}

export default Field
