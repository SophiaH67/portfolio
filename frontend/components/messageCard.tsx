import Button from './button'
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Message from '../interfaces/message'

interface Props extends Message {
  className?: string
}

export default function MessageCard({ className, id, ip, email, name, message }: Props) {
  return (
    <div className={'w-full md:w-96 md:max-w-xl bg-white shadow-xl rounded-lg ' + className||''}>
      <div className='pt-6 px-3 pb-4'>
        <h2 className='text-4xl text-gray-800'>{name}</h2>
        <h3 className='text-gray-600'>{ip}</h3>
        <p className='text-black'>{message}</p>
      </div>
      <div className='bg-gray-200 flex-col py-2 px-3'>
        <div className='flex justify-center'>
          <div className='flex justify-around -mt-4 px-3 w-full'>
            <span className='inline-block ring-4 ring-gray-200 rounded-full text-sm px-3 pt-0.5 bg-gray-200'>
              <label className='text-gray-800'>ID: {id}</label>
            </span>
            <span className='inline-block ring-4 ring-gray-200 rounded-full text-sm px-3 pt-0.5 bg-gray-200'>
              <button title='Delete'>
                <FontAwesomeIcon className='text-red-500' icon={faBan} />
              </button>
            </span>
          </div>
        </div>
        <h2 className="text-center text-3xl text-gray-800">{email}</h2>
      </div>
    </div>
  )
}
