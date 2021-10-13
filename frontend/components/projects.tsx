import React, { useEffect, useState } from 'react'
import ProjectInterface from '../interfaces/project'
import { getProjects } from '../lib/api'
import Loading from './loading'
import ProjectCard from './projectCard'

export default function Projects() {
  const [projects, setProjects] = useState<ProjectInterface[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .then(() => setFetching(false))
  }, [])

  return (
    <div className='min-h-min bg-gray-800 pb-20 block w-full'>
      <h2 className='pt-24 pb-12 text-gray-100 font-semibold mx-auto max-w-min text-6xl'>Projects</h2>
      {fetching ? (
        <div className='flex justify-center'>
          <Loading size='70px' />
        </div>
      ) : (
        <div className='w-full mx-auto'>
          <div className='flex flex-wrap justify-center'>
            {projects.map((project) => (
              <a href={project.link} target='_blank' rel='noreferrer' key={project.id}>
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
      )}
    </div>
  )
}
