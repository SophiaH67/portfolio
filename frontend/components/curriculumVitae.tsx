import Button from './button'
import FloatingCard from './floatingCard'
import Linkify from 'react-linkify'

export interface CurriculumVitaeProps {
  aboutme: string
}

export default function CurriculumVitae({ aboutme }: CurriculumVitaeProps) {
  return (
    <FloatingCard>
      <>
        <h2 className='text-center min-w-min text-6xl font-semibold text-gray-800 pb-4'>
          {'About Me'}
        </h2>
        <div className='flex flex-col md:flex-row'>
          <img
            className='w-full md:w-auto md:max-w-sm md:pr-2'
            src='/aboutme.webp'
            alt='Avatar of Sophia'
          />
          <div className='p-1 md:p-0 md:flex md:flex-col md:justify-between'>
            <p className='w-full'>
              <Linkify>{aboutme}</Linkify>
            </p>
            <div className='flex justify-center'>
              <a href="https://www.linkedin.com/in/sophia-hage/" download>
                <Button className='bottom-0 mx-2 w-full md:w-auto'>View LinkedIn</Button>
              </a>
            </div>
          </div>
        </div>
      </>
    </FloatingCard>
  )
}
