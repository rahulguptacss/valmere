import { type ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Header from '../../../components/sections/Header';
import Footer from '../../../components/sections/Footer';
import Breadcrumb from '../../../components/sections/Breadcrumb';
import RoomDetails from '../../../components/sections/RoomDetails';
import Faq from '../../../components/sections/Faq';
import BackToTop from '../../../components/ui/BackToTop';
import { common, pages, sections, type RoomItem, type PageComponent, type LinkType } from '../../../components/types';

export function generateStaticParams() {
  return (sections.room_details.items as RoomItem[]).map((item: RoomItem) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = (sections.room_details.items as RoomItem[]).find((room: RoomItem) => room.slug === slug);
  return {
    title: item ? `${item.title} | Valmere Resort` : 'Suite Details | Valmere Resort',
    description: item ? item.description : 'Experience unparalleled comfort in our luxurious resort suites.',
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = (sections.room_details.items as RoomItem[]).find((room: RoomItem) => room.slug === slug);
  if (!item) notFound();

  const breadcrumb = pages.room_details.breadcrumb!;
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: (
      <Breadcrumb
        data={{
          ...breadcrumb,
          items: (breadcrumb.items as LinkType[]).map((link: LinkType, index: number) =>
            index === breadcrumb.items.length - 1 ? { ...link, name: item.title, href: `/rooms/${item.slug}` } : link
          ),
        }}
      />
    ),
    RoomDetails: <RoomDetails data={item} />,
    Faq: <Faq data={sections.faq} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.room_details.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
