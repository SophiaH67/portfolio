import Button from './button'
import FloatingCard from './floatingCard'

export default function CurriculumVitae() {
  return (
    <FloatingCard>
      <>
        <h2 className='text-center min-w-min text-6xl font-semibold text-gray-800 pb-4'>About Me</h2>
        <div className='flex flex-col md:flex-row'>
          <img className='w-full md:w-auto md:max-w-sm md:pr-2' src='https://picsum.photos/512/512' />
          <div className='p-1 md:p-0 md:flex md:flex-col md:justify-between'>
            <p className='max-w-sm'>
              Beeg paragraph describing a lot of stuff that I have done and stuff yeah
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
