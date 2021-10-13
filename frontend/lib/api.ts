import axios from 'axios'
import ProjectInterface from '../interfaces/project'

export const getBackendBase = () =>
  process.env.NODE_ENV == 'production'
    ? window.location.href.split('/').slice(0, 3).join('/')
    : 'http://localhost:8000'

export const deleteMessage = (id: number) =>
  axios.delete(`${getBackendBase()}/api/messages/${id}`)

export const getProjects = (): Promise<ProjectInterface[]> =>
  new Promise((resolve, reject) =>
    axios
      .get(`${getBackendBase()}/api/projects`, {
        headers: { Accept: 'application/json' },
      })
      .then((res) => resolve((res.data) as ProjectInterface[]))
      .catch(reject)
  )

export const deleteProject = (id: number) =>
  axios.delete(`${getBackendBase()}/api/messages/${id}`)

export const createProject = (
  name: string,
  description: string,
  link: string
) =>
  axios.post(`${getBackendBase()}/api/projects`, {
    name: name,
    description: description,
    link: link,
  })

export const updateProject = (
  id: number,
  name: string,
  description: string,
  link: string
) =>
  axios.patch(`${getBackendBase()}/api/projects/${id}`, {
    name: name,
    description: description,
    link: link,
  })
