import Head from 'next/head'
import CurriculumVitae from '../components/curriculumVitae'
import Name from '../components/name'
import Projects, { ProjectsProps } from '../components/projects'
import Contact from '../components/contact'
import Section from '../components/section'
import { GetStaticPropsResult } from 'next'
import { getProjects } from '../lib/api'

export default function Home({ initialProjects }: ProjectsProps) {
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
        <CurriculumVitae />
      </Section>
      <Contact />
    </div>
  )
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ProjectsProps>> {
  return {
    props: {
      initialProjects: await getProjects(),
    },
  }
}
