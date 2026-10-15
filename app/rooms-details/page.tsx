import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import RoomDetails from '../../components/sections/RoomDetails';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent, type RoomItem } from '../../components/types';

export const metadata = {
  title: pages.room_details.metadata.title,
  description: pages.room_details.metadata.description,
};

export default function RoomDetailsPage() {
  const defaultRoom = (sections.room_details.items as RoomItem[])[0];

  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={pages.room_details.breadcrumb!} />,
    RoomDetails: <RoomDetails data={defaultRoom} />,
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
