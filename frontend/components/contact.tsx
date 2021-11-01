import axios, { AxiosError } from 'axios'
import React, { FormEvent, useState } from 'react'
import { getBackendBase } from '../lib/api'
import { isNL } from '../lib/locale'
import Button from './button'
import FloatingCard from './floatingCard'
import Input from './input'
import Loading from './loading'
import TextareaAutosize from 'react-textarea-autosize'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [fetchErrors, setFetchErrors] = useState([] as string[])
  const [successMessage, setSuccessMessage] = useState('')

  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    const body = {
      name: name,
      email: email,
      message: message,
    }

    axios.defaults.withCredentials = true

    axios
      .post(`${getBackendBase()}/api/messages`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        setSuccessMessage(isNL() ? 'Bericht is verzonden!' : 'Message succesfully sent!')
        setFetchErrors([])
      })
      .catch((err: AxiosError) => {
        const jsonBody = JSON.parse(err.request.response)
        let errors: string[] = []
        Object.entries(jsonBody).forEach(([_key, value]: [any, any]) => errors.push(...value))
        setFetchErrors(errors)
        setSuccessMessage('')
      })
      .finally(() => setSubmitting(false))
  }
  return (
    <FloatingCard>
      <>
        <h2 className='text-gray-800 font-semibold text-6xl text-center'>Contact</h2>
        <p className='text-center text-sm text-gray-800'>
          {isNL()
            ? 'Als je contact wilt opnemen met mij, kan dat hier'
            : 'If you want to contact me, you can do sothrough this form'}
        </p>

        <form onSubmit={onSubmit}>
          <Input description={isNL() ? 'Naam' : 'Name'} state={[name, setName]} type='name' />
          <Input description='Email' state={[email, setEmail]} type='email' />
          <label className='font-light text-gray-500 text-xs'>{isNL() ? 'Bericht' : 'Message'}</label>
          <TextareaAutosize
            placeholder={isNL() ? 'Bericht' : 'Message'}
            minRows={3}
            className='min-w-full border-2 border-gray-300 rounded-md p-1 my-1 focus:outline-none outline-none resize-none overflow-hidden'
            onInput={(e) => {
              const element = e.target as HTMLInputElement
              setMessage(element.value)
            }}
          />
          {fetchErrors.map((fetchError, i) => (
            <div key={i}>
              <label className='text-red-600 text-bold text-sm font-light'>{fetchError}</label>
              <br />
            </div>
          ))}
          {successMessage ? (
            <label className='text-green-600 text-bold text-sm font-light'>{successMessage}</label>
          ) : null}
          <Button className='w-full' type='submit' disabled={submitting}>
            {submitting ? <Loading /> : isNL() ? 'Stuur' : 'Send'}
          </Button>
        </form>
      </>
    </FloatingCard>
  )
}
