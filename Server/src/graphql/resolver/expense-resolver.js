


import Expense from '../../models/expense'
import authorizeUser from '../../lib/auth'

import Tag from '../../models/tag'

export default {
  root: {
    Me: {
      myExpenses: async (_, data, {user}) => {
        try {
          const thisUser = await authorizeUser(user)
          return Expense.findUserExpenses(thisUser._id)
        } catch (error) {
          return []
        }
      },
      myTags: async (_, data, { user }) => {


        
        try {
  
          const thisUser = await authorizeUser(user)

          return await Tag.findUserTags(thisUser._id)

        } catch (error) {
          return []
        }
      }
    },
    Expense: {
      tags: async ({ tags }, _, {user}) => {
        try {
          const thisUser = await authorizeUser(user)

          const userTags = await Tag.findUserTags(thisUser._id)

          // const zxc = await Promise.all(findUserTags.map(_id => ))
          return tags.map(_id => userTags.find(item => item._id == _id))

        } catch (error) {
          throw error
        }
      }
    }
  },
  Query: {

  },
  Mutation: {
    create_expense: async (_, {data}, {user}) => {
      try {
        
        const thisUser = await authorizeUser(user)

        await Expense.create({ userId: thisUser._id, ...data })
        
        return {
          status: 200,
          msg: 'ok'
        }



      } catch (error) {
        throw error
      }
    }
  }
}