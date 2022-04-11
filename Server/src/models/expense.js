

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import path from 'path'

import { UID } from '../lib'

import Tag from './tag'

const userDirectory = path.join(process.cwd(), '/src/db/users')

class ExpenseSchema {

  constructor() {}

  async create({ amount, tags, geo, userId, date }) {
    try {
      if (!amount || !tags || !Array.isArray(tags) || !geo || !geo.lat || !geo.lon || !userId) throw new Error('bad input')
      const data = { amount, tags, geo, date, _id: UID() }

      const userTags = await Tag.findUserTags(userId)

      const cache = {}

      userTags.forEach(item => cache[item.id] = item)

      const doIContinue = tags.every(item => !!cache[item])

      if (!doIContinue) throw new Error('invalid tags')
      
      const dest = `${userDirectory}/${userId}/expenses`

      if (!existsSync(dest)) {
        mkdirSync(dest)
      }


      writeFileSync(`${dest}/${data._id}.txt`, JSON.stringify(data), "utf8")

      return data

    } catch (error) {
      throw error
    }
  }


  async findUserExpenses(_id) {
    try {

      if (!existsSync(`${userDirectory}/${_id}/expenses`)) return []

      const x = readdirSync(`${userDirectory}/${_id}/expenses`)
        .reduce((acc, cur, i) => acc + `${i == 0 ? '' : ','}`+ readFileSync(path.join(`${userDirectory}/${_id}/expenses`, `/${cur}`), { encoding: "utf8" }), '[')
      const y = `${x}]`

      const result = JSON.parse(y)

      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async findById({ _id, userId }) {
    try {

      const x = readFileSync(path.join(userDirectory, `/${userId}/expenses/${_id}.txt`), { encoding: "utf8" })

      return JSON.parse(x)

    } catch (error) {
      throw error
    }
  }

}

const Expense = new ExpenseSchema()

export default Expense