import '../styles/globals.css'
import '../styles/background.css'
import 'tailwindcss/tailwind.css'
import Bar from '../components/bar'

function MyApp({ Component, pageProps }) {
  return <><Bar /><Component {...pageProps} /></>
}

export default MyApp
