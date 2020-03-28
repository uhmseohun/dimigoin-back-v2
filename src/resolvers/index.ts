import { IResolvers } from "graphql-tools";
import Query from "./Query";
import Mutation from "./Mutation";
import Models from "./Models";

const resolver: IResolvers = { Query, Mutation, ...Models };

export default resolver;
