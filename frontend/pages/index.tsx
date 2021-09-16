import Head from 'next/head'
import Bar from './components/bar';
import Section from './components/section';
import Story from './components/story';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Marnix Hage Portfolio</title>
      </Head>
      <Bar />
      <Section alt={true}>
        <Story darkBackground={true} title="Some title" text="Some big story about this project" />
      </Section>
    </div>
  )
}
