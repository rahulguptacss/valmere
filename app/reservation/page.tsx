import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Reservation from '../../components/sections/Reservation';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

export const metadata = {
  title: pages.reservation.metadata.title,
  description: pages.reservation.metadata.description,
};

export default function ReservationPage() {
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={pages.reservation.breadcrumb!} />,
    Reservation: <Reservation data={sections.reservation} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.reservation.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
