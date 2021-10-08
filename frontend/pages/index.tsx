import Head from 'next/head'
import CurriculumVitae from '../components/curriculumVitae';
import Name from '../components/name'
import Projects from '../components/projects'
import Contact from '../components/contact'
import Section from '../components/section';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Marnix Portfolio</title>
      </Head>
      <Name />
      <Section>
        <Projects />
      </Section>

      <Section>
        <CurriculumVitae />
      </Section>
      <Contact />
    </div>
  )
}
