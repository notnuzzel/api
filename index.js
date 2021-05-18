
import { ApolloServer, gql } from 'apollo-server'
import { getSession } from 'next-auth/client'
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

  type Query {
    today(): [Article]
    yesterday(): [Article]
    pastWeek(): [Article]
    pastHours(n: Int): [Article]
  }
}
`

const context = ({ req }) => {
  return getSession()
}

const server = new ApolloServer({ typeDefs, resolvers, context })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})