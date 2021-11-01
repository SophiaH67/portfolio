import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import ProjectCard from '../../components/projectCard'
import Section from '../../components/section'
import ProjectInterface from '../../interfaces/project'
import { createProject, getProjects, updateProject } from '../../lib/api'

export default function Projects() {
  const [update, setUpdate] = useState(Math.random())
  const [fetching, setFetching] = useState(true)

  const [projects, setProjects] = useState<ProjectInterface[]>([])
  const [editing, setEditing] = useState([] as boolean[])

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .then(() => setFetching(false))
  }, [update])

  return (
    <Section>
      {fetching ? (
        <div className='flex justify-center w-full'>
          <Loading size='70px' />
        </div>
      ) : (
        <div className='flex w-full flex-wrap justify-center max-w-7xl'>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              className='mx-4 my-2'
              name={project.name}
              description_en={project.description_en}
              description_nl={project.description_nl}
              link={project.link}
              onSave={(name, description_en, description_nl, link) => {
                let items = [...editing]
                items[project.id] = false
                setEditing(items)

                updateProject(project.id, name, description_en, description_nl, link)
              }}
              onEdit={() => {
                let items = [...editing]
                items[project.id] = true
                setEditing(items)
              }}
              onDelete={() => {
                let items = [...projects]
                items.splice(i, 1)
                setProjects(items)
              }}
              editing={!!editing[project.id]}
            />
          ))}
          <ProjectCard
            id={-1}
            className='mx-4 my-2'
            name='Project Name'
            description_en='Description'
            description_nl='Beschrijving'
            link='https://example.com'
            onSave={(name, description_en, description_nl, link) =>
              createProject(name, description_en, description_nl, link)
                .then(() => setUpdate(Math.random()))
                .catch((err: AxiosError) => {
                  const jsonBody = JSON.parse(err.request.response)
                  let errors: string[] = []
                  Object.entries(jsonBody).forEach(([_key, value]: [any, any]) => errors.push(...value))
                  alert(errors.join('\n'))
                })
            }
            onEdit={() => {}}
            editing={true}
          />
        </div>
      )}
    </Section>
  )
}
