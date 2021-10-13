import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading'
import MessageCard from '../../components/messageCard'
import Section from '../../components/section'
import Message from '../../interfaces/message'
import { getBackendBase } from '../../lib/api'

export default function Messages() {
  const [messages, setMessages] = useState([] as Message[])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    fetch(`${getBackendBase()}/api/messages`)
      .then((res) => res.json())
      .then((incomingMessages: Message[]) => setMessages(incomingMessages))
      .then(()=>setFetching(false))
  }, [])

  return (
    <Section>
      <div className='flex w-full flex-wrap justify-center max-w-10xl'>
        {fetching ? (
          <div className="pt-6"><Loading size="70px" /></div>
        ) : (
          messages.map((message) => (
            <MessageCard
              className='mx-4 my-2'
              onDelete={() =>
                setMessages((prevState) =>
                  prevState.filter(
                    (filterMessage) => filterMessage.id !== message.id
                  )
                )
              }
              key={message.id}
              updated_at={message.updated_at}
              created_at={message.created_at}
              message={message.message}
              email={message.email}
              name={message.name}
              id={message.id}
              ip={message.ip}
            />
          ))
        )}
      </div>
    </Section>
  )
}
