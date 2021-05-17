
import { ApolloServer, gql } from 'apollo-server'
import resolvers from './resolvers/'

const typeDefs = gql`

  type Article {
    title: String
    description: String
    publisher: String
    byline: String
    image: String
    publishedAt: String
    shares: [Tweet]
  }

  type Tweet {

  }
`

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})