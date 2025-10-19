// Central place to register image paths used across the app.
// Put actual image files under the public/images/ directory.
// Then reference them here so components can import from one place.

export type ImageKey =
  | "hero1"
  | "hero2"
  | "hero3"
  | "hero4"
  | "hero5"
  | "logo"
  | "placeholder";

export const IMAGES: Record<ImageKey, string> = {
  // Hero backgrounds (place files in public/images/)
  // Mapped to your files (we'll copy/rename them below)
  hero1:
    "https://bridesideimages.blob.core.windows.net/tbs-website-images/IMG_4112%20(1).HEIC?sp=r&st=2025-10-17T13:03:18Z&se=2025-10-17T21:18:18Z&spr=https&sv=2024-11-04&sr=b&sig=Pwb914OUeDAofs7vknJg3XHiD4LcceK2y82goApeiAs%3D",
  hero2:
    "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5597.jpg?sp=r&st=2025-10-17T13:04:14Z&se=2025-10-17T21:19:14Z&spr=https&sv=2024-11-04&sr=b&sig=0hlwsOq8oZBL5D7nfVr0Go3PMH%2F49pfCP%2Bi6nfHG6bA%3D",
  hero3:
    "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5714.jpg?sp=r&st=2025-10-17T13:04:27Z&se=2025-10-17T21:19:27Z&spr=https&sv=2024-11-04&sr=b&sig=GnmSkUAokO%2F8sCZBW5dpGfVvaEOP8NFD0DWehzq27PU%3D",
  hero4:
    "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5749.jpg?sp=r&st=2025-10-17T13:04:40Z&se=2025-10-17T21:19:40Z&spr=https&sv=2024-11-04&sr=b&sig=0ERfT%2BRq5qTnk%2FCS6u4MIjr%2F%2B3xzb0Fzj%2Bc0UvSm%2FjQ%3D",
  hero5:
    "https://bridesideimages.blob.core.windows.net/tbs-website-images/There%E2%80%99s%20something%20about%20indian%20weddings%20and%20dancing%20on%20Oh%20Ho%20Ho%20Ho%20by%20Sukhbir!%20%F0%9F%98%8D%F0%9F%92%96What%E2%80%99s%20your%20f.jpg?sp=r&st=2025-10-17T13:05:06Z&se=2025-10-17T21:20:06Z&spr=https&sv=2024-11-04&sr=b&sig=HP6Cof0%2F3R6sWqDRkeo2QJt0FmCVbcHXtWLxkPpVd4k%3D",

  // Branding (optional)
  // Set this to your provided logo file path (PNG/SVG) placed under public/images/
  logo: "/images/tbs-logo.png",

  // Generic fallback
  placeholder:
    "https://images.unsplash.com/photo-1601121141735-ca013b7b07dd?q=80&w=1920&auto=format&fit=crop",
};

// Helper: returns only the hero image paths in order for slideshows
export const getHeroImages = (): string[] => [
  // Full list provided by user, in desired order
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/IMG_4112%20(1).HEIC?sp=r&st=2025-10-17T13:03:18Z&se=2025-10-17T21:18:18Z&spr=https&sv=2024-11-04&sr=b&sig=Pwb914OUeDAofs7vknJg3XHiD4LcceK2y82goApeiAs%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5579.jpg?sp=r&st=2025-10-17T13:03:45Z&se=2025-10-17T21:18:45Z&spr=https&sv=2024-11-04&sr=b&sig=BXWQPX8YoXPIeVLY5qKL3DhE2oGe%2Fu77iJvAJyTlTbg%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5591.jpg?sp=r&st=2025-10-17T13:04:02Z&se=2025-10-17T21:19:02Z&spr=https&sv=2024-11-04&sr=b&sig=Gcoq1hAWHpji%2FTRspPGVLtOcYlHPu8xZ%2FCL%2F%2BcPRX9k%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5597.jpg?sp=r&st=2025-10-17T13:04:14Z&se=2025-10-17T21:19:14Z&spr=https&sv=2024-11-04&sr=b&sig=0hlwsOq8oZBL5D7nfVr0Go3PMH%2F49pfCP%2Bi6nfHG6bA%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5714.jpg?sp=r&st=2025-10-17T13:04:27Z&se=2025-10-17T21:19:27Z&spr=https&sv=2024-11-04&sr=b&sig=GnmSkUAokO%2F8sCZBW5dpGfVvaEOP8NFD0DWehzq27PU%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/SHREY%26MAHIMA_WEDDING-5749.jpg?sp=r&st=2025-10-17T13:04:40Z&se=2025-10-17T21:19:40Z&spr=https&sv=2024-11-04&sr=b&sig=0ERfT%2BRq5qTnk%2FCS6u4MIjr%2F%2B3xzb0Fzj%2Bc0UvSm%2FjQ%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/There%E2%80%99s%20something%20about%20indian%20weddings%20and%20dancing%20on%20Oh%20Ho%20Ho%20Ho%20by%20Sukhbir!%20%F0%9F%98%8D%F0%9F%92%96What%E2%80%99s%20your%20f.jpg?sp=r&st=2025-10-17T13:05:06Z&se=2025-10-17T21:20:06Z&spr=https&sv=2024-11-04&sr=b&sig=HP6Cof0%2F3R6sWqDRkeo2QJt0FmCVbcHXtWLxkPpVd4k%3D",
  "https://bridesideimages.blob.core.windows.net/tbs-website-images/Not%20us%20manifesting%20a%20pastel%20lehenga%20%2B%20dreamy%20wedding%20after%20seeing%20Ashwarya%20%26%20Laksh%20live%20the%20lite%20(4).jpg?sp=r&st=2025-10-17T13:05:28Z&se=2025-10-17T21:20:28Z&spr=https&sv=2024-11-04&sr=b&sig=O5zvvQBPr0hGYvxw2f8ILriB5xNtfbbLn%2FJi5vzX9GE%3D",
];


