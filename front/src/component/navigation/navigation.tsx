import React from 'react'
import icon from '../../assets/icons/arrow-back.svg'
import './style.scss'

interface NavigationProps {
  title?: string
  handleClick?: () => void
}

const Navigation: React.FC<NavigationProps> = ({ title, handleClick }) => {
  return (
    <div className='navigation'>
      <button className='navigation__button' onClick={handleClick}>
        <img src={icon} alt='back' />
      </button>
      {title ? <h2 className='navigation__title'>{title}</h2> : ''}
      <span className='icon'></span>
    </div>
  )
}

export default Navigation
