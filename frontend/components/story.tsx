interface Props {
  darkBackground: boolean
  title: string
  text: string
  className?: string
}

export default function Story({ className, darkBackground, text, title }: Props) {
  return ( 
    <div className={"text-center mx-auto max-w-5xl pt-20 pb-20 " + className}>
      <h2 className={ (darkBackground ? 'text-white' : 'text-gray-800') + " text-2xl font-semibold"}>{title}</h2>
      <p className={ (darkBackground ? 'text-gray-300' : 'text-gray-800') }>{text}</p>
    </div>
   )
}
