import React, { useEffect, useState } from 'react'
import MessageCard from '../../components/messageCard'
import Section from '../../components/section'
import axios from 'axios'
import Message from '../../interfaces/message'

export default function Messages() {
  const [messages, setMessages] = useState([] as Message[])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/messages')
      .then((res) => res.json())
      .then((incomingMessages: Message[]) => setMessages(incomingMessages))
  }, [])

  return (
    <Section>
      <div className='flex w-full flex-wrap justify-center max-w-10xl'>
        {messages.map((message) => (
          <MessageCard
            className='mx-4 my-2'
            key={message.id}
            message={message.message}
            email={message.email}
            name={message.name}
            id={message.id}
            ip={message.ip}
          />
        ))}
      </div>
    </Section>
  )
}
