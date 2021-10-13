interface Props {
  children: JSX.Element
}

export default function floatingCard({ children }: Props) {
  return (
    <div className='w-11/12 max-w-4xl md:w-auto bg-white pt-4 md:p-4 shadow-xl rounded-lg mx-auto'>
      {children}
    </div>
  )
}
