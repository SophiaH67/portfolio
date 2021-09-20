import Head from 'next/head'
import { useEffect, useState } from 'react'
import Authorized from '../../components/authorized'
import Bar from '../../components/bar'
import StoryInterface from '../../interfaces/story'
import { getStories } from '../../lib/api'
import HashLoader from 'react-spinners/HashLoader'

interface EditableStory extends StoryInterface {
  editing: boolean
}

export default function Home() {
  const [stories, setStories] = useState<EditableStory[]>([])

  useEffect(() => {
    getStories().then((stories) =>
      setStories(
        stories.map(
          (story) =>
            ({
              title: story.title,
              description: story.description,
              editing: false,
            } as EditableStory)
        )
      )
    )
  }, [])
  return (
    <div>
      <Head>
        <title>Marnix Hage Portfolio</title>
      </Head>
      <Bar />
      <Authorized>
        <div>
          {stories.length == 0 ? (
            <div className='text-center mt-20'>
              <HashLoader loading={true} color='#6D28D9'></HashLoader>
            </div>
          ) : (
            <div className='max-w-5xl mx-auto'>
              <table className='table-auto'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story, i) => (
                    <tr key={i}>
                      <td><input type="text" className="w-screen" value={story.title} /></td>
                      <td><input type="text" className="w-96" value={story.description} /></td>
                      <td className='text-center'>
                        <button className='bg-purple-700 p-2 rounded-md text-gray-200' onClick={() => {
                          const newStories = [...stories]
                          newStories[i].editing = !newStories[i].editing
                          setStories(newStories)
                        }}>
                          {story.editing ? 'Save' : 'Edit'}
                        </button>
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
