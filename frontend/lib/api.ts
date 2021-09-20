import StoryInterface from "../interfaces/story"

const request = (method: string, endpoint: string, body?: any, hash?: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE}${endpoint}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    ...(body && {body: JSON.stringify(body)}),
    ...(hash && {authorization:  'bearer' + hash }),
  })

export const hashPassword = async (password: string) => 
  await (await request('POST', '/hash', {password: password})).text()

export const validateHash = async (hash: string) =>
  (await (await request('POST', '/validateHash', {hash: hash})).text()) == 'true'

export const getStories = async (): Promise<StoryInterface[]> => 
  await (await request('GET', '/getStories')).json()

export const changeHash = async(currentHash: string, newHash: string) =>
  await request('PUT', '/hash', {hash: newHash}, currentHash )
