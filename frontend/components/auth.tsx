import axios, { AxiosError } from 'axios'
import { FormEvent, useState } from 'react'
import Button from './button'
import Input from './input'

export default function Modal() {
  const [signUp, setSignup] = useState(false)
  // For both siging in & up
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  // Only for signing up
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [name, setName] = useState('')

  const [fetchErrors, setFetchErrors] = useState([] as string[])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      password: password,
      email: email,
      ...(signUp && {
        password_confirmation: confirmPassword,
        email_confirmation: confirmEmail,
        name: name,
      }),
    }

    axios.defaults.withCredentials = true
    axios.defaults.headers = {accept: 'application/json'};

    axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(() =>{
      axios
        .post(
          `http://127.0.0.1:8000/${signUp ? 'register' : 'login'}`,
          body,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
      )
        .catch((err: AxiosError) => {
          const jsonBody = JSON.parse(err.request.response)
          console.log(jsonBody)
          let errors: string[] = []
          if (jsonBody.errors)
            Object.entries(jsonBody.errors).forEach(
              ([_key, value]: [any, any]) => errors.push(...value)
            )
          else errors.push(jsonBody.message)
          setFetchErrors(errors)
        })
      }
    ).catch(e=>console.log(e))
  }
  return (
    <div className='max-w-xl mx-auto bg-white border-gray-100 border-2 rounded-md pt-8 mt-24'>
      <div className='flex flex-col max-h-full'>
        <h2 className='text-3xl text-gray-800 font-semibold text-center'>
          {signUp ? 'Sign Up' : 'Sign In'}
        </h2>
        <h3 className='text-sm font-light text-gray-600 text-center'>
          {signUp
            ? 'Become a beautiful member of this site!'
            : "This place just wasn't the same without you."}
        </h3>
        <form onSubmit={onSubmit}>
          {signUp ? (
            <Input
              state={[name, setName]}
              type='name'
              placeholder='Foo Bar'
              description='Name'
            ></Input>
          ) : null}
          <Input
            state={[email, setEmail]}
            type='email'
            placeholder='foo@bar.tld'
            description='Email'
          ></Input>
          {signUp ? (
            <Input
              state={[confirmEmail, setConfirmEmail]}
              type='email'
              placeholder='foo@bar.tld'
              description='Confirm Email'
            />
          ) : null}
          <Input
            state={[password, setPassword]}
            type='password'
            placeholder='********'
            description='Password'
          ></Input>
          {signUp ? (
            <Input
              state={[confirmPassword, setConfirmPassword]}
              type='password'
              placeholder='********'
              description='Confirm Password'
            ></Input>
          ) : null}
          <label>
            <input
              type='checkbox'
              name='remember'
              className='text-gray-600'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{' '}
            <label className='text-gray-600'>Remember me</label>
            <br />
          </label>
          {fetchErrors.map((err, i) => (
            <>
              <label
                key={i}
                className='text-red-600 text-bold text-sm font-light'
              >
                {err}
              </label>
              <br />
            </>
          ))}

          <a
            className='text-center text-gray-400 underline'
            href='#'
            onClick={() => setSignup(!signUp)}
          >
            {signUp
              ? 'Existing user? Get in here!'
              : 'New here? Sign up instead!'}
          </a>
          <Button className='w-full' type='submit'>
            {signUp ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}
