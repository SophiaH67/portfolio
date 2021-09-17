import express, { Application, Request, Response } from "express"
import { Story } from './classes/story'
import { sequelize } from "./db"

require('dotenv').config()

const app: Application = express()
const port = 3000

app.get('/getStories', async (_req: Request, res: Response)=> {
  res.send(await Story.findAll())
})

// DEV: to test database
app.get('/addOne', async (_req: Request, res: Response) => {
  const i = Math.random()
  const newStory = await Story.create({title: `Some Title${i}`, description: `Some long *markdown* enabled description about a story with the title of ${i}`})
  await newStory.save()
  await sequelize.sync()
  res.send(newStory).status(200)
})

app.listen(port,()=>{
  console.log(`Running on port ${port}`)
});