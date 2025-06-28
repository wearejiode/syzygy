// yoga-schema.js
import { createSchema } from 'graphql-yoga';

export const schema = createSchema({
  typeDefs: `
    type Post {
      id: ID!
      title: String!
      slug: String!
      excerpt: String
      content: String!
      date: String!
      edited: String
      cover: String
      readingTime: Int
      tags: [String!]
      categories: [String!]
    }

    type Query {
      hello: String
      posts: [Post!]!
      post(id: ID!): Post
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'Hello from Yoga 🧘‍♀️',
      posts: async (_, __, context) => {
        const { results } = await context.db.prepare('SELECT * FROM posts').all();
        return results;
      },
      post: async (_, { id }, context) => {
        const { results } = await context.db
          .prepare('SELECT * FROM posts WHERE id = ?')
          .bind(id)
          .all();
        return results[0];
      },
    },

    Post: {
      tags: async (parent, _, context) => {
        const { results } = await context.db
          .prepare(`
            SELECT name FROM tags
            JOIN post_tags ON tags.id = post_tags.tag_id
            WHERE post_tags.post_id = ?
          `)
          .bind(parent.id)
          .all();
        return results.map(r => r.name);
      },
      categories: async (parent, _, context) => {
        const { results } = await context.db
          .prepare(`
            SELECT name FROM categories
            JOIN post_categories ON categories.id = post_categories.category_id
            WHERE post_categories.post_id = ?
          `)
          .bind(parent.id)
          .all();
        return results.map(r => r.name);
      },
    },
  },
});