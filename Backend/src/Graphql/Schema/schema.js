import { currency, currencyChandle, priceUsd } from "../../models/currency";

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLFloat,
  GraphQLInt
} from "graphql";

const currencyType = new GraphQLObjectType({
  name: "currencys",
  fields: () => ({
    id: { type: GraphQLID },
    tid: { type: GraphQLInt },
    currency: { type: GraphQLString },
    price: { type: GraphQLFloat },
    amount: { type: GraphQLFloat },
    date: { type: GraphQLFloat },
    epoch: { type: GraphQLInt }
  })
});

const currencychandletype = new GraphQLObjectType({
  name: "currencyChandle",
  fields: () => ({
    id: { type: GraphQLID },
    currency: { type: GraphQLString },
    opening: { type: GraphQLFloat },
    closing: { type: GraphQLFloat },
    min: { type: GraphQLFloat },
    max: { type: GraphQLFloat },
    volume: { type: GraphQLFloat },
    date: { type: GraphQLString }
  })
});

const priceUsdType = new GraphQLObjectType({
  name: "priceUsd",
  fields: () => ({
    id: { type: GraphQLID },
    price: { type: GraphQLFloat },
    date: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    currencys: {
      type: new GraphQLList(currencyType),
      resolve(parent, args) {
        return currency.find();
      }
    },
    currencyChandle: {
      type: new GraphQLList(currencychandletype),
      resolve(parent, args) {
        return currencyChandle.find();
      }
    },
    priceUsd: {
      type: new GraphQLList(priceUsdType),
      resolve(parent, args) {
        return priceUsd.find();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
