import Head from 'next/head'
import CurriculumVitae from '../components/curriculumVitae';
import Name from '../components/name'
import Projects from '../components/projects'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Marnix Portfolio</title>
      </Head>
      <Name />
      <Projects />
      <CurriculumVitae />
    </div>
  )
}
