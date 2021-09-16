import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Bar() {
  return (
    <div className=''>
      <header className='bg-white shadow border-t-4 border-purple-700'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='text-black'>Marnix Hage</div>
            <div className="flex flex-row-reverse">
              <div className="mx-4">
                <a href='https://github.com/marnixah'>
                  <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
                </a>
              </div>
              <div>
                <a href='mailto:business@marnixah.com'>
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
