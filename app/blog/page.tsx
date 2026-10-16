import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Blog from '../../components/sections/Blog';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

export const metadata = {
  title: pages.blog?.metadata?.title || 'Blogs | Valmere Luxury Resort',
  description:
    pages.blog?.metadata?.description ||
    'Explore our latest stories, travel guides and expert tips to make your stay more enjoyable and memorable.',
};

export default function BlogPage() {
  const blogBreadcrumb = pages.blog?.breadcrumb || {
    title: 'Blogs',
    image: '/img/breadcrumb.webp',
    items: [
      { name: 'HOME', href: '/' },
      { name: 'BLOGS', href: '/blog' },
    ],
  };

  const blogSectionData = (sections as any).blog;

  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={blogBreadcrumb} />,
    Blog: <Blog data={blogSectionData} />,
  };

  const components = (pages.blog?.components as PageComponent[]) || [
    { key: 'BreadcrumbSection', component: 'Breadcrumb' },
    { key: 'BlogSection', component: 'Blog' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {components.map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
