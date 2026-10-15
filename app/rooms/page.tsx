import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Rooms from '../../components/sections/Rooms';
import Faq from '../../components/sections/Faq';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

export const metadata = {
  title: pages.rooms.metadata.title,
  description: pages.rooms.metadata.description,
};

export default function RoomsPage() {
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={pages.rooms.breadcrumb!} />,
    Rooms: <Rooms data={sections.rooms} />,
    Faq: <Faq data={sections.faq} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.rooms.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
