import React, { useEffect, useState } from 'react'
import ProjectInterface from '../interfaces/project'
import { getProjects } from '../lib/api'
import ProjectCard from './projectCard'

export interface ProjectsProps {
  initialProjects: ProjectInterface[]
}

export default function Projects({ initialProjects }: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectInterface[]>(initialProjects)

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  return (
    <div className='min-h-min bg-gray-800 pb-20 block w-full'>
      <h2 className='pt-24 mb-2 text-gray-100 font-semibold mx-auto max-w-min text-6xl'>
        {'Projects'}
      </h2>
      <p className='text-center text-gray-400 mb-4'>{'These are the projects which I am proud of'}</p>
      <div className='w-full mx-auto'>
        <div className='flex flex-wrap justify-center'>
          {projects.map((project) => (
            <a
              href={project.link}
              target='_blank'
              rel='noreferrer'
              key={project.name + project.link + project.description_en}
            >
              <ProjectCard
                id={project.id}
                className='my-2 mx-0 md:mx-4 w-screen'
                name={project.name}
                description_en={project.description_en}
                link={project.link}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
