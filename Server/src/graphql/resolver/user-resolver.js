


import User from '../../models/user'
import Tag from '../../models/tag'

import authorizeUser from '../../lib/auth'


export default {
  root: {

  },
  Query: {
    me: async (_, data, {user}) => {
      try {

        const thisuser = await authorizeUser(user)

        return thisuser
      } catch (error) {
        console.log(error)
        throw error
      }
    }
  },
  Mutation: {
    signup: async (_, data) => {
      
      try {
        
        const token = await User.signup(data)
        
        return {
          token
        }

      } catch (error) {
        throw error
      }
    },
    login: async (_, data) => {
      try {
        const token = await User.login(data)
        return {
          token
        }
      } catch (error) {
        throw error
      }
    }
  }
}