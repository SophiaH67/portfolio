import Head from 'next/head'
import CurriculumVitae, { CurriculumVitaeProps } from '../components/curriculumVitae'
import Name from '../components/name'
import Projects, { ProjectsProps } from '../components/projects'
import Contact from '../components/contact'
import Section from '../components/section'
import { GetStaticPropsResult } from 'next'
import { getProjects } from '../lib/api'
import fs from 'fs'
import path from 'path'

interface Props extends ProjectsProps, CurriculumVitaeProps {} 

export default function Home({ initialProjects, aboutme }: Props) {
  return (
    <div>
      <Head>
        <title>Marnix Portfolio</title>
      </Head>
      <Name />
      <Section>
        <Projects initialProjects={initialProjects} />
      </Section>

      <Section>
        <CurriculumVitae aboutme={aboutme} />
      </Section>
      <Contact />
    </div>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  return {
    props: {
      initialProjects: await getProjects(),
      aboutme: fs.readFileSync(path.join(process.cwd(), 'public/aboutme.txt')).toString('utf-8')
    },
  }
}
