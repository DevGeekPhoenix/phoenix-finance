

import User from '../../models/user'
import Tag from '../../models/tag'
import authorizeUser from '../../lib/auth'

export default {
  root: {
    
  },
  Query: {

  },
  Mutation: {
    create_tag: async (_, { data }, { user }) => {
      try {
        
        const thisUser = await authorizeUser(user)

        await Tag.create({
          userId: thisUser._id,
          ...data
        })

        return {
          status: 200,
          msg: 'ok'
        }

      } catch (error) {
        throw error
      }
    },
    edit_tag: async (_, { _id, data }, { user }) => {
      try {
        
        const thisUser = await authorizeUser(user)

        await Tag.findByIdAndUpdate({ _id, userId: thisUser._id, data })
        
        return {
          msg: 'ok',
          status: 200
        }

      } catch (error) {
        throw error
      }
    }
  }
}