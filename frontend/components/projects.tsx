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
      <h2 className='pt-24 pb-12 text-gray-100 font-semibold mx-auto max-w-min text-6xl'>Projects</h2>
      <div className='w-full mx-auto'>
        <div className='flex flex-wrap justify-center'>
          {projects.map((project) => (
            <a href={project.link} target='_blank' rel='noreferrer' key={project.name+project.link+project.description}>
              <ProjectCard
                id={project.id}
                className='my-2 mx-4'
                name={project.name}
                description={project.description}
                link={project.link}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
