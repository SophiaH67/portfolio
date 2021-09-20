interface Props {
  state: [string, (value: string) => void]
  type?: string
}

export default function Input({state, type} : Props) {
  const [value, setValue] = state

  return (
    <input
      onInput={(e) => {
        const element = e.target as HTMLInputElement
        setValue(element.value)
      }}
      placeholder='password'
      className='min-w-full border-2 border-gray-300 rounded-md my-1 focus:outline-none'
      type={type}
      value={value}
    ></input>
  )
}
