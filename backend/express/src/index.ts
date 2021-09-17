import express, { Application, Request, Response } from "express"
require('dotenv').config()

const app: Application = express()
const port = 3000

app.get('/', (req: Request, res: Response)=> {
  res.send(`Hello ${req.ip}`)
}) 

app.listen(port,()=>{
  console.log(`Running on port ${port}`)
});