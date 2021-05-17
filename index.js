
import { ApolloServer, gql } from 'apollo-server'
import resolvers from './resolvers/'

const typeDefs = gql`

  type Article {
    title: String
    description: String
    publisher: String
    byline: String
    image: String
    publishedAt: Date
    shares: [Tweet]
  }

  type Tweet {
    text: String
    author: Author
    publishedAt: Date
  }

  type Author {
    name: String
    handle: String
    image: String
  }
`

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})