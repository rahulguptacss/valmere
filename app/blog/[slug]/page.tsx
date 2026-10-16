import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import BlogDetails from '../../../components/sections/BlogDetails';
import BackToTop from '../../../components/ui/BackToTop';
import {
  common,
  pages,
  sections,
  type BlogDetailItem,
  type RecentBlogPost,
} from '../../../components/types';

export function generateStaticParams() {
  const items = (sections.blog_details.items as BlogDetailItem[]) || [];
  return items.map((item: BlogDetailItem) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = (sections.blog_details.items as BlogDetailItem[]) || [];
  const item = items.find((b: BlogDetailItem) => b.slug === slug);

  return {
    title: item ? `${item.title} | Valmere Resort Blogs` : 'Blogs Details | Valmere Resort',
    description: item ? (item.paragraphs?.[0] || item.title) : 'Blogs Details | Valmere Resort',
  };
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = (sections.blog_details.items as BlogDetailItem[]) || [];
  const item = items.find((b: BlogDetailItem) => b.slug === slug);

  if (!item) {
    notFound();
  }

  const breadcrumbData = (pages as any).blog_details?.breadcrumb || {
    title: 'Blogs Details',
    image: '/img/breadcrumb.webp',
    items: [
      { name: 'HOME', href: '/' },
      { name: 'BLOGS DETAILS', href: '/blog-details' },
    ],
  };

  const recentPosts: RecentBlogPost[] = sections.blog_details.recent_posts || [];
  const recentPostsTitle: string = sections.blog_details.recent_posts_title || 'Recent Posts';

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        <Breadcrumb data={breadcrumbData} />
        <BlogDetails
          data={item}
          recentPosts={recentPosts}
          recentPostsTitle={recentPostsTitle}
        />
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
