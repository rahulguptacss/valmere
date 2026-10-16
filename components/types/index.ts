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
  title_line3?: string;
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

export interface RoomInfoItem {
  label: string;
  value: string;
  icon: string;
}

export interface RoomFeatureCard {
  title: string;
  description: string;
  icon: string;
}

export interface RoomAmenityItem {
  label: string;
  icon: string;
}

export interface RoomSupportItem {
  label: string;
  value: string;
  href?: string;
  icon: string;
}

export interface RoomItem {
  id: number;
  slug?: string;
  category?: string;
  title_line1?: string;
  title_line2?: string;
  title: string;
  location?: string;
  watermark?: string;
  price?: string;
  period?: string;
  description?: string;
  features?: { icon: string; label: string }[];
  button?: { text: string; href: string };
  image_main?: string;
  image_secondary?: string;
  image?: string;
  sidebar_image?: string;
  rating?: number;
  reviews?: string;
  href?: string;
  capacity?: string;
  size?: string;
  bed?: string;
  view?: string;
  gallery?: string[];
  information?: RoomInfoItem[];
  included?: string[];
  features_grid?: RoomFeatureCard[];
  amenities?: (string | RoomAmenityItem)[];
  need_help?: {
    title: string;
    support: RoomSupportItem[];
  };
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
  image?: string;
  quote: string;
  author: string;
  role?: string;
  location?: string;
  avatar: string;
  rating?: number;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description?: string;
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

export interface BlogPostItem {
  id: number;
  slug?: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  href?: string;
}

export interface BlogSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  posts_per_page?: number;
  posts: BlogPostItem[];
}

export interface BlogDetailQuote {
  text: string;
  author: string;
}

export interface BlogDetailItem {
  id: number;
  slug: string;
  title: string;
  category?: string;
  date?: string;
  author: string;
  comments_count: string;
  read_time: string;
  image: string;
  paragraphs: string[];
  quote: BlogDetailQuote;
  key_factors_title: string;
  key_factors_image: string;
  key_factors: string[];
}

export interface RecentBlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  image: string;
  href: string;
}

export interface BlogDetailsSectionData {
  recent_posts_title: string;
  recent_posts: RecentBlogPost[];
  items: BlogDetailItem[];
}

export interface ContactSocial {
  name: string;
  href: string;
}

export interface ContactItem {
  type: string;
  title: string;
  lines?: string[];
  socials?: ContactSocial[];
}

export interface ContactFormConfig {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  subtitle_line1: string;
  subtitle_line2: string;
  name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  subject_placeholder: string;
  message_placeholder: string;
  button_text: string;
}

export interface ContactSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  description: string;
  contact_items: ContactItem[];
  image: string;
  image_alt?: string;
  form: ContactFormConfig;
  info?: {
    address: string;
    phone: string;
    email: string;
    hours: string;
  };
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
}

export interface EnquireFormConfig {
  eyebrow: string;
  name_placeholder: string;
  email_placeholder: string;
  phone_placeholder: string;
  checkin_placeholder: string;
  checkout_placeholder: string;
  guests_placeholder: string;
  room_type_placeholder: string;
  room_options: string[];
  special_requests_placeholder: string;
  special_request_options: string[];
  message_placeholder: string;
  button_text: string;
}

export interface EnquiryNowSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  title?: string;
  description: string;
  image: string;
  image_alt?: string;
  form: EnquireFormConfig;
  how_it_works: {
    eyebrow: string;
    steps: ProcessStep[];
  };
  checkin_label?: string;
  checkout_label?: string;
  guests_label?: string;
  room_label?: string;
  room_options?: string[];
  button_text?: string;
}

export type ReservationSectionData = EnquiryNowSectionData;

export interface ThankYouSectionData {
  title: string;
  description: string;
  button: {
    text: string;
    href: string;
  };
}

export interface WhyChooseUsItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionData {
  eyebrow: string;
  title_line1: string;
  title_highlight: string;
  image_left: string;
  image_right: string;
  items: WhyChooseUsItem[];
}

export interface BreadcrumbData {
  title: string;
  items: LinkType[];
  image?: string;
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
