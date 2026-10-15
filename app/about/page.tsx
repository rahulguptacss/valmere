import type { ReactNode } from 'react';
import Header from '../../components/sections/Header';
import Footer from '../../components/sections/Footer';
import Breadcrumb from '../../components/sections/Breadcrumb';
import About from '../../components/sections/About';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import Testimonials from '../../components/sections/Testimonials';
import Faq from '../../components/sections/Faq';
import BackToTop from '../../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../../components/types';

export const metadata = {
  title: pages.about.metadata.title,
  description: pages.about.metadata.description,
};

export default function AboutPage() {
  const sectionMap: Record<string, ReactNode> = {
    Breadcrumb: <Breadcrumb data={pages.about.breadcrumb!} />,
    About: <About data={sections.about} showButton={false} />,
    WhyChooseUs: <WhyChooseUs data={sections.why_choose_us} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
    Faq: <Faq data={sections.faq} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.about.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
