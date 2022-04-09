// import '@lib/global'
import runServer from './server/run-server'
import buildSchema from './graphql/schema'
import resolvers from './graphql/resolver'

const typeDefs = buildSchema()

runServer({ typeDefs, resolvers, port: 80 })