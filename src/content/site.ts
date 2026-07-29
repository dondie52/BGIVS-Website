export const siteConfig = {
  name: "Babobiz Global Institute of Value Systems",
  shortName: "BGIVS",
  tagline: "From Metrics to Meaning",
  description:
    "Babobiz Global Institute of Value Systems advances research, training, consulting, publishing, governance, corporate responsibility, and sustainable institutional transformation through the BVSDQ–CSRDQ Framework.",
  email: "kabisoilw@gmail.com",
  phone: "+267 73 251 171",
  phoneDisplay: "+267 73 251 171",
  phoneHref: "tel:+26773251171",
  emailHref: "mailto:kabisoilw@gmail.com",
  location: "Gaborone, Botswana",
  frameworkName: "BVSDQ–CSRDQ Framework",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bgivs-website.vercel.app",
  mission:
    "To advance the science and practice of integrated value systems through the development of frameworks that align performance with purpose, the training of institutions to achieve sustainable excellence, and the publication of knowledge that transforms governance and leadership.",
  vision:
    "To become a globally recognized center of excellence in value systems research, institutional transformation, and sustainable development.",
  institutionalStatement:
    "Babobiz Global Institute of Value Systems is a research, training, consulting, and publishing institution dedicated to advancing integrated value systems for sustainable organizational and societal development.",
  whatWeDo:
    "BGIVS transforms organizations from performance-driven systems into value-driven systems.",
  publisher: "Babobiz Knowledge Press",
} as const;

export type SiteConfig = typeof siteConfig;
