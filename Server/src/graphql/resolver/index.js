import userResolver from "./user-resolver";
import tagResolver from "./tag-resolver";
import expenseResolver from "./expense-resolver";
import { GraphQLUpload } from "graphql-upload";

export default {
  Upload: GraphQLUpload,
  ...userResolver.root,
  ...tagResolver.root,
  ...expenseResolver.root,
  Query: {
    ...userResolver.Query,
    ...tagResolver.Query,
    ...expenseResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...tagResolver.Mutation,
    ...expenseResolver.Mutation,
  },
};
