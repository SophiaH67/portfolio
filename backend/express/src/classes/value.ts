import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../db'

export class Value extends Model {
  key: string
  value: string
}

Value.init(
  {
    key: {
      type: DataTypes.STRING,
      unique: true
    },
    value: DataTypes.STRING,
  },
  { sequelize, modelName: 'value' }
)