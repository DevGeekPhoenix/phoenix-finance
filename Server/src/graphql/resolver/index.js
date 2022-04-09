import userResolver from "./user-resolver";
import tagResolver from "./tag-resolver";
import expenseResolver from "./expense-resolver";



export default {
  ...userResolver.root,
  ...tagResolver.root,
  ...expenseResolver.root,
  Query: {
    ...userResolver.Query,
    ...tagResolver.Query,
    ...expenseResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation,
    ...tagResolver.Mutation,
    ...expenseResolver.Mutation
  }
}