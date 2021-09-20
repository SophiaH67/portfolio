import Head from 'next/head'
import Authorized from '../../components/authorized';
import Bar from '../../components/bar';
import Sections from '../../components/sections';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Marnix Hage Portfolio</title>
      </Head>
      <Bar />
      <Authorized>
      <Sections />
      </Authorized>
    </div>
  )
}
