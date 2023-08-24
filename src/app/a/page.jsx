import FeaturedPosts from '@/components/ui/FeaturedPosts'
import { fetchGraphQL } from '@/lib/graphql-utils';

export const revalidate = 0;  

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

  const data = await fetchGraphQL(query)
  return data;
}

export default async function Page() {
  const { posts } = await getPosts();
  return (
    <div>
      <FeaturedPosts data={posts} />
    </div>
  )
}

