import React from 'react'
import BackButton from '../backButton/back'
import icon from '../../assets/icons/arrow-back.svg'
import settingsIcon from '../../assets/icons/settings.svg'
import notificationsIcon from '../../assets/icons/bell.svg'
import './style.scss'

interface NavigationProps {
  title?: string
  settings?: boolean
  isWhite?: boolean
  handleClick?: () => void
  handleSettings?: () => void
  handleNotifications?: () => void
}

const Navigation: React.FC<NavigationProps> = ({
  title,
  handleClick,
  settings,
  isWhite,
  handleSettings,
  handleNotifications,
}) => {
  return settings ? (
    <div className='navigation'>
      <button className='navigation__button' onClick={handleSettings}>
        <img src={settingsIcon} alt='settings_icon' />
      </button>
      {title ? (
        <h2
          className={`navigation__title ${
            isWhite ? 'navigation__title--white' : ''
          }`}
        >
          {title}
        </h2>
      ) : null}
      <button className='navigation__button' onClick={handleNotifications}>
        <img src={notificationsIcon} alt='notifications_icon' />
      </button>
    </div>
  ) : (
    <div className='navigation'>
      <BackButton
        className='navigation__button'
        icon={icon}
        onClick={handleClick}
      />
      {title ? <h2 className='navigation__title'>{title}</h2> : null}
      <span className='icon'></span>
    </div>
  )
}

export default Navigation
