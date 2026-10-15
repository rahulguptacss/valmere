import type { ReactNode } from 'react';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Suites from '../components/sections/Suites';
import Rooms from '../components/sections/Rooms';
import Testimonials from '../components/sections/Testimonials';
import Faq from '../components/sections/Faq';
import Cta from '../components/sections/Cta';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../components/types';

export const metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function Home() {
  const sectionMap: Record<string, ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    Suites: <Suites data={sections.suites} />,
    SuitesReverse: <Suites data={sections.suites_premier} reverse />,
    Rooms: <Rooms data={sections.rooms} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
    Faq: <Faq data={sections.faq} />,
    Cta: <Cta data={sections.cta} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf7] font-sans antialiased text-[#243c30]">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {(pages.home.components as PageComponent[]).map((block: PageComponent) => (
          <div key={block.key}>{sectionMap[block.component]}</div>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop />
    </div>
  );
}
