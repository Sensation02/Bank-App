type BackButtonProps = {
  className?: string
  icon?: string
  onClick?: () => void
}

const BackButton: React.FC<BackButtonProps> = ({
  className,
  icon,
  onClick,
}) => {
  return (
    <button className={className} onClick={onClick}>
      <img src={icon} alt='back-icon' />
    </button>
  )
}

export default BackButton
