import express, { Application, Request, Response } from 'express'
import { hashPassword, validatePasswordHash } from './bcrypt'
import { Story } from './classes/story'
import { sequelize } from './db'
import cors from 'cors'
import assert from 'assert'
import { Value } from './classes/value'

require('dotenv').config()

const app: Application = express()
const port = 3000

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: ['authorization', 'Content-Type', 'body'],
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))
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

app.patch('/stories', async (req: Request, res: Response) => {
  if (!(await authorizedRequest(req, res))) return
  assert(typeof req.body.id == 'number')
  assert(typeof req.body.title == 'string')
  assert(typeof req.body.description == 'string')
  const story = await Story.findOne({where: {id: req.body.id}})
  if(!story) return res.status(404)
  story.title = req.body.title
  story.description = req.body.description
  await story.save()
  return
})

app.post('/stories', async (req: Request, res: Response) => {
  if (!(await authorizedRequest(req, res))) return
  const i = Math.random()
  const newStory = await Story.create({
    title: `Some Title${i}`,
    description: `Some long *markdown* enabled description about a story with the title of ${i}`,
  })
  await newStory.save()
  res.send(newStory).status(200)
})

app.delete('/stories', async (req: Request, res: Response) => {
  if (!(await authorizedRequest(req, res))) return
  assert(typeof req.body.id == 'number')
  const story = await Story.findOne({where: {id: req.body.id}})
  if(!story) return res.status(404)
  await story.destroy()
  return res.status(200).send()
})

app.get('/value', async (req, res) => {
  if (!(await authorizedRequest(req, res))) return
  assert(typeof req.body.key == 'string')
  res.send(await Value.findOne({where: {key: req.body.key}})).status(200)
})

app.put('/value', async (req, res) => {
  if (!(await authorizedRequest(req, res))) return
  assert(typeof req.body.key == 'string')
  assert(typeof req.body.value == 'string')
  const target = await Value.findOne({where: {key: req.body.key}})
  if(!target) return res.status(404).send()
  target.value = req.body.value
  res.status(200).send()
  await target.save()
  return
})

app.post('/validateHash', async (req: Request, res: Response) => {
  if (typeof req.body.hash != 'string') return res.status(400).end()

  res.send(await validatePasswordHash(req.body.hash))
})


app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
