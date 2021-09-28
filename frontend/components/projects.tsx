import { useEffect, useState } from 'react'
import ProjectInterface from '../interfaces/project'
import Project from './project'

export default function Projects() {
  const [projects, setProjects] = useState<ProjectInterface[]>([])

  useEffect(() => {
    let tmpProjects = []
    for (let i = 0; i < 10; i++) {
      tmpProjects.push({
        title: 'Big Project',
        description: 'This really was a lot of work I swear',
        image: 'https://picsum.photos/300/200',
      })
    }
    setProjects(tmpProjects)
  }, [])

  return (
    <div className='min-h-min bg-gray-800 pb-20 block'>
      <h2 className='pt-24 pb-12 text-gray-100 font-semibold mx-auto max-w-min text-6xl'>
        Projects
      </h2>
      <div className="flex justify-center">
      <div className='flex w-full flex-wrap justify-center max-w-7xl'>
        {projects.map((project, i) => (
          <Project key={i} project={project} />
        ))}
      </div>
      </div>
    </div>
  )
}
