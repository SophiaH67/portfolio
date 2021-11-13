import { isNL } from '../lib/locale'
import Button from './button'
import FloatingCard from './floatingCard'

export interface CurriculumVitaeProps {
  aboutme: string
}

export default function CurriculumVitae({ aboutme }: CurriculumVitaeProps) {

  return (
    <FloatingCard>
      <>
        <h2 className='text-center min-w-min text-6xl font-semibold text-gray-800 pb-4'>{isNL() ? 'Over Mij' : 'About Me'}</h2>
        <div className='flex flex-col md:flex-row'>
          <img className='w-full md:w-auto md:max-w-sm md:pr-2' src='https://picsum.photos/512/512' alt="Picture of Marnix" />
          <div className='p-1 md:p-0 md:flex md:flex-col md:justify-between'>
            <p className='w-full'>
              {aboutme}
            </p>
            <div className='flex justify-center'>
              <Button className='bottom-0 mx-2 w-full md:w-auto'>Download CV</Button>
            </div>
          </div>
        </div>
      </>
    </FloatingCard>
  )
}
