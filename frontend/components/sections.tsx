import React, { useEffect, useState } from 'react'
import StoryInterface from '../interfaces/story'
import Section from './section'
import Story from './story'
import HashLoader from 'react-spinners/HashLoader'

export default function Sections() {
  const [stories, setStories] = useState<StoryInterface[]>([])
  useEffect(() => {
    console.log('Fetching api data...')
    fetch('/api/getStories')
      .then((res) => res.json())
      .then(setStories)
  }, [])
  return (
    <div>
      {!stories.length ? (
        <div className='text-center mt-20'>
          <HashLoader loading={true} color='#6D28D9'></HashLoader>
        </div>
      ) : (
        stories.map((story, i) => (
          <Section key={i} alt={i % 2 == 1}>
            <Story
              darkBackground={i % 2 == 1}
              title={story.title}
              text={story.description}
            />
          </Section>
        ))
      )}
    </div>
  )
}
