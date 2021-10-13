import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default function Bar() {
  return (
    <div className='fixed top-0 min-w-full'>
      <header className='bg-white shadow border-t-4 border-purple-700'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-black'>
              <Link href='/'>Marnix</Link>
            </div>
            <div className='flex flex-row-reverse'>
              <div className='mx-4'>
                <a href={`https://github.com/marnixah`}>
                  <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                </a>
              </div>
              <div>
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
                  <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
