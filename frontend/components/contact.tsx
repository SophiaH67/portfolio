import axios, { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import { getBackendBase } from '../lib/api'
import Button from './button'
import FloatingCard from './floatingCard'
import Input from './input'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [fetchErrors, setFetchErrors] = useState([] as string[])
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      name: name,
      email: email,
      message: message,
    }

    axios.defaults.withCredentials = true
    axios.defaults.headers = { accept: 'application/json' }

    axios
      .post(`${getBackendBase()}/api/messages`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setSuccessMessage('Bericht is verzonden!')
        setFetchErrors([])
      })
      .catch((err: AxiosError) => {
        const jsonBody = JSON.parse(err.request.response)
        let errors: string[] = []
        Object.entries(jsonBody).forEach(([_key, value]: [any, any]) =>
          errors.push(...value)
        )
        setFetchErrors(errors)
        setSuccessMessage('')
      })
  }
  return (
    <FloatingCard>
      <>
        <h2 className='text-gray-800 font-semibold text-6xl text-center'>
          Contact
        </h2>
        <p className='text-center text-sm text-gray-800'>
          Als je contact wilt opnemen met mij, kan dat hier!
        </p>

        <form onSubmit={onSubmit}>
          <Input
            description='Naam'
            placeholder='N.A. am'
            state={[name, setName]}
            type='name'
          />
          <Input
            description='Email'
            placeholder='email@example.com'
            state={[email, setEmail]}
            type='email'
          />
          <Input
            description='Bericht'
            placeholder=''
            state={[message, setMessage]}
            type='text'
          />
          {fetchErrors.map((fetchError, i) => (
            <div key={i}>
              <label
                className='text-red-600 text-bold text-sm font-light'
              >
                {fetchError}
              </label>
              <br />
            </div>
          ))}
          {successMessage ? (
            <label className='text-green-600 text-bold text-sm font-light'>
              {successMessage}
            </label>
          ) : null}
          <Button className='w-full' type='submit'>
            Stuur
          </Button>
        </form>
      </>
    </FloatingCard>
  )
}
