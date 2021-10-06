interface Props {
  bgClass?: string
  onClick?: () => void
  className?: string
  disabled?: boolean
  children?: string
  type?: "button" | "submit" | "reset"
}
export default function Button({
  bgClass,
  className,
  onClick,
  disabled,
  children,
  type
}: Props) {
  return (
    <button
      disabled={!!disabled}
      onClick={onClick}
      type={type}
      className={`${className || ''} text-gray-200 rounded-md p-2 my-1 ${bgClass || 'bg-purple-700'} disabled:bg-gray-300`}
    >
      {children}
    </button>
  )
}
