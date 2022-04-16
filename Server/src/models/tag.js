

import { writeFileSync, appendFileSync, existsSync, mkdirSync, readFileSync, readdirSync } from 'fs'
import path from 'path'

import { UID, removeLastCharacter, removeFirstCharacter} from '../lib'

const userDirectory = path.join(process.cwd(), '/src/db/users')

class TagSchema {

  constructor() {

  }

  async create({ userId, name, color }) {
    try {
      if (!userId || !name || !color) throw new Error('bad input')
      const data = { userId, name, color , _id: UID() }


      const dest = `${userDirectory}/${userId}/tags`

      if (!existsSync(dest)) {
        mkdirSync(dest)
      }

      writeFileSync(`${dest}/${data._id}.txt`, JSON.stringify(data), "utf8")

      return data

    } catch (error) {
      throw error
    }
  }

  async findUserTags(_id) {
    try {

      if (!existsSync(`${userDirectory}/${_id}/tags`)) return []

      const x = readdirSync(`${userDirectory}/${_id}/tags`)
        .reduce((acc, cur, i) => acc + `${i == 0 ? '' : ','}`+ readFileSync(path.join(`${userDirectory}/${_id}/tags`, `/${cur}`), { encoding: "utf8" }), '[')
      const y = `${x}]`

      const result = JSON.parse(y)

      return result
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async findById({_id, userId}) {
    try {

      const x = readFileSync(path.join(userDirectory, `/${userId}/tags/${_id}.txt`), { encoding: "utf8" })

      return JSON.parse(x)

    } catch (error) {
      throw error
    }
  }

  async findByIdAndUpdate({_id, userId, data}) {

    try {

      const realData = {name: data.name, color: data.color}

      const thatTag = await this.findById({_id, userId})

      if (!thatTag || !thatTag._id) throw new Error('bad request')

      Object.entries(realData).forEach(([key, value]) => thatTag[key] = value)

      writeFileSync(`${userDirectory}/${userId}/tags/${_id}.txt`, JSON.stringify(thatTag), "utf8")

      return true

    } catch (error) {
      throw error
    }
    
  }
}

const Tag = new TagSchema()

export default Tag