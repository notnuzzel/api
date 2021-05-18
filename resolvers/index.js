
import prisma from '@notnuzzel/prisma'

const findArticles = async (date, { user }) => {
  const results = await prisma.crawl.findMany({
    where: {
      userId: user.id,
      tweet: {
        publishedAt: date
      }
    }
  }).groupBy({
    by: ['articleId'],
    count: {
      articleId: true,
    },
    orderBy: {
      _count: {
        articleId: 'desc'
      }
    }
  })
  return results
}

const dateToISO = (date) => { // strips time
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const dt = date.getDate()
  if (dt < 10) dt = '0' + dt
  if (month < 10) month = '0' + month
  return new Date(`${year}-${month}-${dt}`)
}

const today = (_,_, context) => {
  return findArticles({
    gte: dateToISO(Date.now())
  }, context)
}

const yesterday = (_,_, context) => {
  const today = new Date()
  const yesterday = new Dates(today)
  yesterday.setDate(yesterday.getDate() - 1)
  return findArticles({
    gte: dateToISO(yesterday),
    lt: dateToISO(today)
  }, context)
}

const pastWeek = (_,_, context) => {
  const week = Date.now()
  week.setDate(week.getDate() - 7)
  return findArticles({
    gte: dateToISO(week)
  }, context)
}

const pastHours = (_, [n], context) => {
  const hour = 60 * 60 * 1000
  const time = Date.now() - (n * hour)
  return findArticles({
    gte: time.toISOString()
  }, context)
}

const resolvers = {
  Query: { 
    today,
    yesterday,
    pastWeek,
    pastHours
  }
}

export default resolvers