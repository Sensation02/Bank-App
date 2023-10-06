import './style.scss'

interface ButtonProps {
  onClick?: () => void
  type?: 'submit' | 'button'
  disabled?: boolean
  text?: string
  isMain?: boolean
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  disabled,
  text,
  isMain,
}) => {
  return (
    <button
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      className={`button ${isMain ? 'main' : 'secondary'} ${
        disabled ? 'disabled' : ''
      }`}
    >
      {text ? text : 'Default button'}
    </button>
  )
}

export default Button
