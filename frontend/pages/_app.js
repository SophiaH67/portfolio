import '../styles/globals.css'
import '../styles/background.css'
import 'tailwindcss/tailwind.css'
import Bar from '../components/bar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <div className='font-sans'>
      <Head>
        <title key='title'>{"Sophia's Portfolio"}</title>
      </Head>
      <Bar />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
