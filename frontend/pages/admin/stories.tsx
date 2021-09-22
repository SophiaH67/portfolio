import Head from 'next/head'
import { useEffect, useState } from 'react'
import Authorized from '../../components/authorized'
import Bar from '../../components/bar'
import StoryInterface from '../../interfaces/story'
import { addStory, deleteStory, getStories, updateStory } from '../../lib/api'
import HashLoader from 'react-spinners/HashLoader'
import Input from '../../components/input'
import Button from '../../components/button'

interface EditableStory extends StoryInterface {
  editing: boolean
}

export default function Home() {
  const [stories, setStories] = useState<EditableStory[]>([])
  const [loaded, setLoaded] = useState(false)
  const [update, setUpdate] = useState(Math.random())

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editing, setEditing] = useState(false)

  const edit = (i: number) => {
    if (editing) return
    const tmpState = [...stories]
    tmpState[i].editing = true
    setTitle(tmpState[i].title)
    setDescription(tmpState[i].description)
    setEditing(true)
    setStories(tmpState)
  }

  const save = (i: number) => {
    const currentStory = stories[i]
    updateStory(currentStory.id, title, description)

    const tmpState = [...stories]
    tmpState[i].editing = false
    tmpState[i].title = title
    tmpState[i].description = description
    setTitle('')
    setDescription('')
    setEditing(false)
    setStories(tmpState)
    setUpdate(Math.random())
  }

  useEffect(() => {
    setLoaded(false)
    getStories()
      .then((stories) =>
        setStories(
          stories.map((story) => {
            return {
              id: story.id,
              title: story.title,
              description: story.description,
              editing: false,
            } as EditableStory
          })
        )
      )
      .then(() => setLoaded(true))
  }, [update])
  return (
    <div>
      <Head>
        <title>Marnix Hage Portfolio</title>
      </Head>
      <Bar />
      <Authorized>
        <div>
          {!loaded ? (
            <div className='text-center mt-20'>
              <HashLoader loading={true} color='#6D28D9'></HashLoader>
            </div>
          ) : (
            <div className='max-w-5xl mx-auto'>
              <table className='table-auto border-2'>
                <thead className='border-4'>
                  <tr className='border-4'>
                    <th className='font-semibold text-gray-800'>Title</th>
                    <th className='font-semibold text-gray-800'>Description</th>
                    <th className='font-semibold text-gray-800 overflow-hidden whitespace-nowrap'>
                      Actions
                      <Button
                        onClick={() => {
                          setLoaded(false)
                          addStory().then(() => setUpdate(Math.random()))
                        }}
                        className='py-0'
                      >
                        +
                      </Button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story, i) => (
                    <tr key={i}>
                      <td className='border-2'>
                        {story.editing ? (
                          <Input type='text' state={[title, setTitle]} />
                        ) : (
                          <p>{story.title}</p>
                        )}
                      </td>
                      <td className='border-2'>
                        {story.editing ? (
                          <Input
                            type='text'
                            state={[description, setDescription]}
                          />
                        ) : (
                          <p>{story.description}</p>
                        )}
                      </td>
                      <td className='text-center border-2 overflow-hidden whitespace-nowrap'>
                        <Button
                          className='mx-1'
                          onClick={
                            story.editing ? () => save(i) : () => edit(i)
                          }
                        >
                          {story.editing ? 'Save' : 'Edit'}
                        </Button>
                        <Button
                          className='mx-1'
                          bgClass='bg-red-600'
                          onClick={() => {setLoaded(false);deleteStory(story.id).then(()=>setUpdate(Math.random()))}}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Authorized>
    </div>
  )
}
