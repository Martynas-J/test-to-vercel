import { fetchGraphQL } from '@/lib/utils/graphqlUtils';
import { home } from '@/queries/home';
import { ourProjects } from '@/queries/ourProjects';
import { allServices } from '@/queries/services';
import { allPosts } from '@/queries/posts';
import HomePage from '@/components/ui/HomePage';
import OurProjects from '@/components/ui/OurProjects';
import Services from '@/components/ui/Services';
import FeaturedPosts from '@/components/ui/Posts';
import RecentBlogPosts from '@/components/ui/RecentBlogPosts';
import Testimonials from '@/components/ui/testimonials';
import { allTestimonials } from '@/queries/testimonials';

export default async function Home() {
  const { homePage } = await fetchGraphQL(home);
  const ourProjectsData = await fetchGraphQL(ourProjects);
  const { aboutCard } = await fetchGraphQL(allServices);
  const { testimonials } = await fetchGraphQL(allTestimonials);
  // const { posts } = await fetchGraphQL(allPosts, { next: { tags: ['posts'] } });

  return (
    <div className='flex  lg:w-full xl:flex  flex-col self-stretch'>
      <main>
        <HomePage data={homePage} />
        <OurProjects data={ourProjectsData} />
        <Services data={aboutCard} />
        <div className='px-10 flex flex-col items-center mx-auto max-w-7xl  lg:px-10 py-24'>
          <RecentBlogPosts />
        </div>
        <Testimonials testimonials={testimonials} />
      </main>
    </div>
  );
}
