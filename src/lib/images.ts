import founderPortrait from "../../docs/WhatsApp Image 2026-07-29 at 14.19.36.jpeg";

export const images = {
  logo: {
    src: "/images/bgivs-original-logo.jpeg",
    alt: "Babobiz Global Institute of Value Systems logo",
    width: 911,
    height: 1280,
  },
  circularLogo: {
    src: "/images/bgivs-circular-logo.png",
    alt: "BGIVS circular logo",
    width: 608,
    height: 692,
  },
  shieldSeal: {
    src: "/images/bgivs-shield-seal.jpeg",
    alt: "BGIVS official shield seal",
    width: 1024,
    height: 1024,
  },
  seal: {
    src: "/images/bgivs-institutional-seal.png",
    alt: "BGIVS institutional seal",
    width: 1024,
    height: 1024,
  },
  founder: {
    src: founderPortrait,
    alt: "Dr. Lindunda Wamunyima, Author, Founder and Framework Developer",
    width: founderPortrait.width,
    height: founderPortrait.height,
  },
  publications: {
    bvsdq: {
      src: "/images/publications/bvsdq-csrdq-framework.jpeg",
      alt: "BVSDQ–CSRDQ Framework book cover",
      width: 600,
      height: 900,
    },
    botswana: {
      src: "/images/publications/business-values-botswana.jpeg",
      alt: "Business Values and Corporate Citizenship in Botswana book cover",
      width: 600,
      height: 900,
    },
  },
} as const;
