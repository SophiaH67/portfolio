import { createRef, useEffect, useState } from 'react'
import createPersistedState from 'use-persisted-state'
import { hashPassword, validateHash } from '../lib/api'
import Input from './input'

const useHashSate = createPersistedState('hash')

interface Props {
  children: JSX.Element | never[]
}

export default function Authorized({ children }: Props) {
  const [authorized, setAuthorized] = useState(false)
  const [authorizing, setAuthorizing] = useState(false)
  const [password, setPassword] = useState('')
  const [hash, setHash] = useHashSate('')

  useEffect(() => {
    validateHash(hash).then(setAuthorized)
  }, [hash])

  const onClick = async () => {
    setAuthorizing(true)
    setHash(await hashPassword(password))
    setAuthorizing(false)
  }
  return (
    <>
      {authorized ? (
        children
      ) : (
        <div className='mx-auto my-6 p-2 max-w-xs border-gray-300 border-2 rounded-md'>
          <h2 className='text-center text-gray-700 font-semibold text-2xl'>
            Authorization Required
          </h2>
          <div>
            <Input type='password' state={[password, setPassword]} />
            <button
              disabled={authorizing}
              onClick={onClick}
              className={`min-w-full p-1 text-gray-100 rounded-md my-1 ${
                authorizing ? 'bg-gray-300' : 'bg-purple-700'
              }`}
              id='submit-button'
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  )
}
