import React, { useEffect, useState } from 'react'
import ProjectInterface from '../interfaces/project'
import { getProjects } from '../lib/api'
import { isNL } from '../lib/locale'
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
        {isNL() ? 'Projecten' : 'Projects'}
        </h2>
        <p className="text-center text-gray-400 mb-4">
          {isNL() ?
          'Dit zijn projecten waar ik trots op ben' :
          'These are the projects which I am proud of'
        }
        </p>
      <div className='w-full mx-auto'>
        <div className='flex flex-wrap justify-center'>
          {projects.map((project) => (
            <a href={project.link} target='_blank' rel='noreferrer' key={project.name+project.link+project.descriptionNL+project.descriptionEN}>
              <ProjectCard
                id={project.id}
                className='my-2 mx-4'
                name={project.name}
                descriptionEN={project.descriptionEN}
                descriptionNL={project.descriptionNL}
                link={project.link}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
