import StoryInterface from '../interfaces/story'
import { getHash } from './hashState'

const request = (
  method: string,
  endpoint: string,
  body?: any,
  auth?: boolean
) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && { authorization: `bearer ${getHash()}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
  })

export const hashPassword = async (password: string) =>
  await (await request('POST', '/hash', { password: password })).text()

export const validateHash = async (hash: string) =>
  (await (await request('POST', '/validateHash', { hash: hash })).text()) ==
  'true'

export const getStories = async (): Promise<StoryInterface[]> =>
  (
    (await (await request('GET', '/getStories')).json()) as StoryInterface[]
  ).sort(({ id: a }, { id: b }) => b - a)

export const changeValue = async (key:string, value: string) =>
  await request('PUT', '/value', { key: key, value: value }, true)

export const addStory = async() =>
  await request('POST', '/stories', {}, true)

export const deleteStory = async(id: number) =>
    await request('DELETE', '/stories', {id: id}, true)

export const updateStory = async (
  id: number,
  title: string,
  description: string
) =>
  await request(
    'PATCH',
    '/stories',
    { id: id, title: title, description: description },
    true
  )
