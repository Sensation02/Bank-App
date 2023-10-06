import React, { useState } from 'react'
import './style.scss'
import showIcon from '../../assets/icons/show.svg'
import hideIcon from '../../assets/icons/hide.svg'

type FieldType = 'email' | 'password' | 'text'

interface IFieldProps {
  type: FieldType
  placeholder: string
  title: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Field: React.FC<IFieldProps> = ({
  title,
  type,
  placeholder,
  value,
  onChange,
}) => {
  // Визначаємо стан для іконки
  const [icon, setIcon] = useState(showIcon)

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
        onChange={onChange}
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
    </div>
  )
}

export default Field
