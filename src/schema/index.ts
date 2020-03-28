import 'graphql-import-node';
import * as typeDefs from './schema.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from '../resolvers';
import { GraphQLSchema } from 'graphql';

const index: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default index;
