interface Props {
  children: JSX.Element
}

export default function Section({ children }: Props) {
  return (
    <div className='min-h-min pt-24 flex items-center pb-24 mx-auto max-w-full w-full md:w-auto first:mx-auto'>
      {children}
    </div>
  )
}
