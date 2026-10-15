import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
  active?: boolean;
  children?: LinkType[];
}

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text: string;
  button_link: string;
}

export interface FooterData {
  logo: string;
  logo_alt: string;
  headline_line1: string;
  headline_line2: string;
  headline_highlight: string;
  contact_title: string;
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  reservations_title: string;
  reservations: {
    phone: string;
    email: string;
    hours: string;
  };
  copyright_text: string;
  powered_by: { label: string; name: string; href: string };
  socials: { name: string; href: string }[];
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  image_main: string;
  image_side: string;
  image_circle: string;
}

export interface AboutSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2?: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  image_large: string;
  image_top_right: string;
  image_bottom_right: string;
}

export interface SuiteFeature {
  icon: string;
  label: string;
}

export interface SuiteSectionData {
  eyebrow: string;
  watermark?: string;
  title_line1: string;
  title_line2: string;
  features: SuiteFeature[];
  description: string;
  button: { text: string; href: string };
  image_main: string;
  image_secondary: string;
}

export interface RoomItem {
  id: number;
  slug: string;
  category: string;
  title_line1: string;
  title_line2: string;
  title: string;
  watermark: string;
  price: string;
  period: string;
  description: string;
  features: { icon: string; label: string }[];
  button: { text: string; href: string };
  image_main: string;
  image_secondary: string;
  capacity?: string;
  size?: string;
  bed?: string;
  view?: string;
  gallery?: string[];
  amenities?: string[];
}

export interface RoomsSectionData {
  eyebrow: string;
  title: string;
  description: string;
  items: RoomItem[];
}

export interface RoomDetailsData {
  items: RoomItem[];
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating?: number;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  items: TestimonialItem[];
}

export interface FaqSectionData {
  eyebrow?: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
  avatar: string;
  phone_label: string;
  phone: string;
}

export interface CtaSectionData {
  image: string;
  image_alt: string;
  badge_text: string;
  phone: string;
  title: string;
  title_highlight: string;
  description: string;
  button: { text: string; href: string };
}

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category?: string;
}

export interface GallerySectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  categories: string[];
  items: GalleryItem[];
}

export interface ContactSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  info: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
  form: {
    name_placeholder: string;
    email_placeholder: string;
    phone_placeholder: string;
    subject_placeholder: string;
    message_placeholder: string;
    button_text: string;
  };
}

export interface ReservationSectionData {
  eyebrow: string;
  title: string;
  description: string;
  checkin_label: string;
  checkout_label: string;
  guests_label: string;
  room_label: string;
  room_options: string[];
  button_text: string;
}

export interface ThankYouSectionData {
  title: string;
  description: string;
  button: {
    text: string;
    href: string;
  };
}

export interface BreadcrumbData {
  title: string;
  items: LinkType[];
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: { title: string; description?: string };
  components: PageComponent[];
  breadcrumb?: BreadcrumbData;
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Resort.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
