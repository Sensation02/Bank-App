import React, { useState } from 'react'
import './style.scss'
import showIcon from '../../assets/icons/show.svg'
import hideIcon from '../../assets/icons/hide.svg'
import { ErrorType } from '../../utils/hooks/useInput'

interface IFieldProps {
  type: 'email' | 'password' | 'text'
  placeholder: string
  title: string
  value: string
  name: string
  error: string | ErrorType
  id: 'email' | 'password' | 'text'
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Field: React.FC<IFieldProps> = ({
  title,
  type,
  placeholder,
  value,
  name,
  error,
  id,
  onChange,
}) => {
  const [icon, setIcon] = useState(showIcon)

  const handleIcon = () => {
    if (type === 'password') {
      icon === showIcon ? setIcon(hideIcon) : setIcon(showIcon)
    }
  }

  return (
    <div className='field'>
      {title ? (
        <label className='field__title' htmlFor={id}>
          {title}
        </label>
      ) : (
        ''
      )}

      <input
        type={
          type === 'password' ? (icon === showIcon ? 'password' : 'text') : type
        }
        className='field__input'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        id={id}
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
      {error ? <p className='field__error'>{error}</p> : ''}
    </div>
  )
}

export default Field
