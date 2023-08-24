import FeaturedPosts from '@/components/ui/FeaturedPosts'
import { fetchGraphQL } from '@/lib/graphql-utils';
import React from 'react'

export const revalidate = true

async function getPosts() {
  const query = `
  query Posts {
    posts {
      createdAt
      content {
        text
      }
      title
      publishedAt
      updatedAt
      createdBy {
        name
      }
      id
    }
  }
`;

  const data = await fetchGraphQL(query);
  return data;
}

const page = async () => {
  const { posts } = await getPosts();
  return (
    <div>
      <FeaturedPosts data={posts} />
    </div>
  )
}

export default page