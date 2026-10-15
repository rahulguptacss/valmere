import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import Testimonials from '../../components/sections/Testimonials';
import Cta from '../../components/sections/Cta';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

export const metadata = {
  title: pages.testimonials.metadata.title,
  description: pages.testimonials.metadata.description,
};

export default function TestimonialsPage() {
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={pages.testimonials.breadcrumb!} />,
    Testimonials: (
      <Testimonials
        data={(sections as any).testimonials_page || sections.testimonials}
        variant="grid"
      />
    ),
    Cta: <Cta data={sections.cta} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.testimonials.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
