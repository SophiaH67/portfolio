import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

export class Story extends Model {
  title: string
  description: string
}

Story.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  { sequelize, modelName: 'story' }
)
