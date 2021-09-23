import Head from 'next/head'
import { useState } from 'react'
import Authorized from '../../components/authorized'
import Bar from '../../components/bar'
import Button from '../../components/button'
import Input from '../../components/input'
import Section from '../../components/section'
import { changeValue, hashPassword } from '../../lib/api'

export default function Home() {
  const [password, setPassword] = useState('')
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME} Portfolio</title>
      </Head>
      <Bar />
      <Authorized>
        <Section alt={false}>
          <div className='mx-auto max-w-min py-10 bg-white border-2 border-gray-400 p-5 rounded-md'>
            <h2 className="font-semibold text-gray-800 text-2xl">Setup</h2>
            <div className="flex max-w-full">
              <div>
                <span className="text-left text-gray-400 text-xs">Password</span>
                <Input state={[password, setPassword]} type="password"></Input>
                <Button className="p-0.5" onClick={async () => {
                  changeValue('PASSWORD_HASH', await hashPassword(password)).then(()=>window.location.reload())
                }}>Save</Button>
              </div>
            </div>
          </div>
        </Section>
      </Authorized>
    </div>
  )
}
