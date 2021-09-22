import { useEffect, useState } from 'react'
import { hashPassword, validateHash } from '../lib/api'
import { getHash, setHash } from '../lib/hashState'
import Input from './input'


interface Props {
  children: JSX.Element | never[]
}

export default function Authorized({ children }: Props) {
  const [authorized, setAuthorized] = useState(false)
  const [authorizing, setAuthorizing] = useState(false)
  const [password, setPassword] = useState('')
  
  const authorize = () => validateHash(getHash()).then(setAuthorized)

  const setHashAndCheck = (hash: string) => {
    setHash(hash)
    authorize()
  }

  const onClick = async () => {
    setAuthorizing(true)
    setHashAndCheck(await hashPassword(password))
    setAuthorizing(false)
  }

  useEffect(() => {authorize()})

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
