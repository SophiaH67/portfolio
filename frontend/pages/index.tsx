import Head from 'next/head'
import Bar from '../components/bar';
import Sections from '../components/sections';

export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME} Portfolio</title>
      </Head>
      <Bar />
      <Sections />
    </div>
  )
}
