// Central place to register image paths used across the app.
// Put actual image files under the public/images/ directory.
// Then reference them here so components can import from one place.

export type ImageKey =
  | "hero1"
  | "hero2"
  | "hero3"
  | "hero4"
  | "hero5"
  | "shreyMahimaWedding"
  | "shreyMahimaWedding2"
  | "photographyCategory"
  | "makeupCategory"
  | "planningCategory"
  | "blogPhotography"
  | "blogMakeup"
  | "blogTraditions"
  | "blogEvents"
  | "planningFormBackground"
  | "logo"
  | "placeholder";

export const IMAGES: Record<ImageKey, string> = {
  // Hero backgrounds - Using Lorem Picsum for reliable images
  hero1: "https://picsum.photos/800/600?random=1", // Indian wedding ceremony
  hero2: "https://picsum.photos/800/600?random=2", // Indian bridal makeup
  hero3: "https://picsum.photos/800/600?random=3", // Indian wedding decor
  hero4: "https://picsum.photos/800/600?random=4", // Indian wedding photography
  hero5: "https://picsum.photos/800/600?random=5", // Indian wedding dance

  // Real wedding images
  shreyMahimaWedding: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5714.jpg",
  shreyMahimaWedding2: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5776.jpg",

  // Photography category image
  photographyCategory: "https://bridesideimages.blob.core.windows.net/tbs-website-images/Notusmanifestingapastelleheng.jpg",

  // Makeup category image
  makeupCategory: "https://bridesideimages.blob.core.windows.net/tbs-website-images/IMG_4112(1).HEIC",

  // Planning & Decor category image
  planningCategory: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5749.jpg",

  // Blog images
  blogPhotography: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5591.jpg",
  blogMakeup: "https://bridesideimages.blob.core.windows.net/tbs-website-images/Notusmanifestingapastellehenga7.jpg",
  blogTraditions: "https://bridesideimages.blob.core.windows.net/tbs-website-images/Notusmanifestingapastellehenga5.jpg",
  blogEvents: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5591.jpg",

  // Planning form background image
  planningFormBackground: "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5714.jpg",

  // Branding (optional)
  // Set this to your provided logo file path (PNG/SVG) placed under public/images/
  logo: "/images/tbs-logo.png",

  // Generic fallback - Using Lorem Picsum
  placeholder: "https://picsum.photos/800/600?random=99",
};

// Helper: returns only the hero image paths in order for slideshows
export const getHeroImages = (): string[] => [
  // Hero section - 5 wedding images for slideshow
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5776.jpg", // First image (existing)
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5579.jpg", // Second image
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5597.jpg", // Third image (updated)
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_MEHENDI&HALDI1164.jpg", // Fourth image
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY&MAHIMA_WEDDING-5714.jpg", // Fifth image
];


