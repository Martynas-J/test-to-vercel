import Notification from '@/components/Notification';
import FeaturedPosts from '@/components/ui/FeaturedPosts'
import { fetchGraphQL } from '@/lib/graphql-utils';

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

  const data = await fetchGraphQL(query, {next: { tags: ["post"] }})
  console.log(data)
  return data;
}
export default async function Page() {
  const { posts } = await getPosts();
  <Notification />
  return (
    <div>
      <FeaturedPosts data={posts} />
    </div>
  )
}

