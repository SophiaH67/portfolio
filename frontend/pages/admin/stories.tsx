import Head from 'next/head'
import { useEffect, useState } from 'react'
import Authorized from '../../components/authorized'
import Bar from '../../components/bar'
import StoryInterface from '../../interfaces/story'
import { getStories } from '../../lib/api'
import HashLoader from 'react-spinners/HashLoader'

export default function Home() {
  const [stories, setStories] = useState<StoryInterface[]>([])

  useEffect(() => {
    getStories().then(setStories)
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
            <div className="max-w-7xl mx-auto">
              <table className='table-auto'>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stories.map((story) => (
                    <tr>
                      <td>{story.title}</td>
                      <td>{story.description}</td>
                      <td><button>Edit</button></td>
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
