import ProjectInterface from '../interfaces/project'

interface Props {
  project: ProjectInterface
}

export default function Project({ project }: Props) {
  return (
    <div className='border-gray-200 border-2 bg-gray-100 w-11/12 my-4 md:max-w-min rounded-md md:m-4'>
      <img src={project.image} className="w-full" />
      <h3 className="text-2xl text-gray-800 font-normal px-1">{project.title}</h3>
      <p className="min-w-max max-w-3xl font-light px-1 text-gray-700">{project.description}</p>
    </div>
  )
}
