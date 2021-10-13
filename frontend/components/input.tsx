interface Props {
  state: [string, (value: string) => void]
  type?: string
  placeholder: string
  description: string
}

export default function Input({ state, type, placeholder, description }: Props) {
  const [value, setValue] = state

  return (
    <div>
      <label className='font-light text-gray-500 text-xs'>{description}</label>
      <input
        onInput={(e) => {
          const element = e.target as HTMLInputElement
          setValue(element.value)
        }}
        placeholder={placeholder}
        className='min-w-full border-2 border-gray-300 rounded-md p-1 my-1 focus:outline-none'
        type={type}
        value={value}
      ></input>
    </div>
  )
}
