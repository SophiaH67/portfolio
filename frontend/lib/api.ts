import axios from 'axios'
import ProjectInterface from '../interfaces/project'

export const getBackendBase = () => {
  // SSR / SSG
  if (typeof window === 'undefined') return 'https://www.marnixah.com'
  // Fetch on client in production
  if (process.env.NODE_ENV == 'production') return window.location.href.split('/').slice(0, 3).join('/')
  // Fetch on client in development
  else return 'http://localhost:8000'
}

export const deleteMessage = (id: number) => axios.delete(`${getBackendBase()}/api/messages/${id}`)

export const getProjects = (): Promise<ProjectInterface[]> =>
  new Promise((resolve, reject) =>
    axios
      .get(`${getBackendBase()}/api/projects`, {
        headers: { Accept: 'application/json' },
      })
      .then((res) => resolve(res.data as ProjectInterface[]))
      .catch(reject)
  )

export const deleteProject = (id: number) => axios.delete(`${getBackendBase()}/api/projects/${id}`)

export const createProject = (
  name: string,
  descriptionEN: string,
  descriptionNL: string,
  link: string
) =>
  axios.post(`${getBackendBase()}/api/projects`, {
    name: name,
    descriptionEN: descriptionEN,
    descriptionNL: descriptionNL,
    link: link,
  })

export const updateProject = (
  id: number,
  name: string,
  descriptionEN: string,
  descriptionNL: string,
  link: string
) =>
  axios.patch(`${getBackendBase()}/api/projects/${id}`, {
    name: name,
    descriptionEN: descriptionEN,
    descriptionNL: descriptionNL,
    link: link,
  })
