import '../styles/globals.css'
import '../styles/background.css'
import 'tailwindcss/tailwind.css'
import Bar from '../components/bar'

function MyApp({ Component, pageProps }) {
  return <div className="font-sans"><Bar /><Component {...pageProps} /></div>
}

export default MyApp
