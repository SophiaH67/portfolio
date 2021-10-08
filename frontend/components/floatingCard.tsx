interface Props {
  children: JSX.Element
}

export default function floatingCard({children}: Props) {
  return <div className='w-11/12 max-w-4xl md:w-auto border-gray-100 bg-white pt-4 md:p-4 border-2 rounded-md mx-auto'>
    {children}
  </div>
}