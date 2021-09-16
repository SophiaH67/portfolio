import React, { useEffect, useState } from 'react'
import StoryInterface from '../../interfaces/story'
import Section from './section'
import Story from './story'

export default function Sections() {
  const [stories, setStories] = useState<StoryInterface[]>([])
  useEffect(() => {
    console.log('Fetching api data...')
    setStories(
      Array.from(Array(10).keys()).map((n) => ({
        title: `Title${n}`,
        description: `Long description about ${n} and it's functionality`,
      }))
    )
  }, [])
  console.log(stories)
  return (
    <div>
      {stories.map((story, i) => (
        <Section key={i} alt={i % 2 == 1}>
          <Story
            darkBackground={i % 2 == 1}
            title={story.title}
            text={story.description}
          />
        </Section>
      ))}
    </div>
  )
}
