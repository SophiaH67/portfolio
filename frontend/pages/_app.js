import '../styles/globals.css'
import '../styles/background.css'
import 'tailwindcss/tailwind.css'
import Bar from '../components/bar'
import Head from 'next/head'
import { isNL } from '../lib/locale'

function MyApp({ Component, pageProps }) {
  if (isNL()) 
    document.getElementsByTagName("html")[0].lang = 'nl'
  return (
    <div className='font-sans'>
      <Head>
        <title key="title">Marnix Portfolio</title>
      </Head>
      <Bar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
