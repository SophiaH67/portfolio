import express, { Application, Request, Response } from 'express'
import { getPasswordHash, hashPassword, setPasswordHash, validatePasswordHash } from './bcrypt'
import { Story } from './classes/story'
import { sequelize } from './db'
import cors from 'cors'

require('dotenv').config()

const app: Application = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

sequelize.sync()

const authorizedRequest = async (req: Request, res: Response): Promise<boolean> => {
  const authorized = await validatePasswordHash((req.headers.authorization || '').split(' ')[1])
  if (authorized) return true
  res.status(401)
  res.end()
  return false
}

app.get('/getStories', async (_req: Request, res: Response) => {
  res.send(await Story.findAll())
})

app.post('/hash', async (req: Request, res: Response) => {
  if (typeof req.body.password != 'string') return res.status(400).end()

  res.send(await hashPassword(req.body.password))
})

app.put('/hash', async (req, res) => {
  let f = await getPasswordHash()
  console.log(JSON.stringify({ value: f }))
  if (await getPasswordHash()) {
    console.log('bruh')
    if (!(await authorizedRequest(req, res))) return
  }
  if (typeof req.body.hash != 'string') return res.status(400).end()
  await setPasswordHash(req.body.hash)
  res.status(200).end()
})

app.post('/validateHash', async (req: Request, res: Response) => {
  if (typeof req.body.hash != 'string') return res.status(400).end()

  res.send(await validatePasswordHash(req.body.hash))
})

// DEV: to test database
app.get('/addOne', async (_req: Request, res: Response) => {
  const i = Math.random()
  const newStory = await Story.create({
    title: `Some Title${i}`,
    description: `Some long *markdown* enabled description about a story with the title of ${i}`,
  })
  await newStory.save()
  await sequelize.sync()
  res.send(newStory).status(200)
})

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
