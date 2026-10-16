import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import EnquiryNow from '../../components/sections/EnquiryNow';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

export const metadata = {
  title: pages.enquiry_now.metadata.title,
  description: pages.enquiry_now.metadata.description,
};

export default function EnquiryNowPage() {
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={pages.enquiry_now.breadcrumb!} />,
    EnquiryNow: <EnquiryNow data={sections.enquiry_now} />,
    EnquiryNowSection: <EnquiryNow data={sections.enquiry_now} />,
    Reservation: <EnquiryNow data={sections.enquiry_now} />,
    ReservationSection: <EnquiryNow data={sections.enquiry_now} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.enquiry_now.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component] || sectionMap[block.key]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
