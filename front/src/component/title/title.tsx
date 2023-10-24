import React from 'react'
import './style.scss'

interface TitleProps {
  title?: string
  subtitle?: string
  isBlack?: boolean
}

const Title: React.FC<TitleProps> = ({ title, subtitle, isBlack }) => {
  return (
    <div className={`box ${isBlack ? 'black' : ''}`}>
      <h1 className='title'>{title}</h1>
      <h2 className='subtitle'>{subtitle}</h2>
    </div>
  )
}

export default Title
