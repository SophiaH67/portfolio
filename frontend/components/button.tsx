interface Props {
  bgClass?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  children?: string
}
export default function Button({
  bgClass,
  className,
  onClick,
  disabled,
  children,
}: Props) {
  return (
    <button
      disabled={!!disabled}
      onClick={onClick}
      className={`${className || ''} text-gray-200 rounded-md p-2 my-1 ${
        disabled ? 'bg-gray-300' : bgClass || 'bg-purple-700'
      } `}
    >
      {children}
    </button>
  )
}
