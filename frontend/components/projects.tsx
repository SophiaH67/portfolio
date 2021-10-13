import { useEffect, useState } from 'react'
import ProjectInterface from '../interfaces/project'
import { getProjects } from '../lib/api'
import ProjectCard from './projectCard'

export default function Projects() {
  const [projects, setProjects] = useState<ProjectInterface[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
      .then(() => console.log(projects))
  }, [])

  return (
    <div className='min-h-min bg-gray-800 pb-20 block w-full'>
      <h2 className='pt-24 pb-12 text-gray-100 font-semibold mx-auto max-w-min text-6xl'>
        Projects
      </h2>
      <div className="flex justify-center">
      <div className='flex w-full flex-wrap justify-center max-w-7xl'>
        {projects.map((project, i) => (
          <ProjectCard 
            key={i}
            id={project.id}
            name={project.name}
            className='mx-4 my-2'
            description={project.description}
            link={project.link}
           />
        ))}
      </div>
      </div>
    </div>
  )
}
