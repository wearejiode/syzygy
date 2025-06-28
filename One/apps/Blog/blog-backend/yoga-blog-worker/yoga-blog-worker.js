import { createYoga } from 'graphql-yoga'
import { schema } from './yoga-schema.js'

export default {
  async fetch(request, env, ctx) {
    const yoga = createYoga({
      schema,
      graphqlEndpoint: '/graphql',
      context: async () => ({
        db: env.DB, // Correctly structured context object
      }),
      fetchAPI: {
        Request,
        Response,
      },
    })

    return yoga.fetch(request, env, ctx)
  },
}
