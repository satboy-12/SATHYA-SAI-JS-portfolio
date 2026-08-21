// Direct image links from Kommodo Cloud CDN
export const HERO_IMAGE_URL = 'https://plain-apac-prod-public.komododecks.com/202608/20/AJ09hJSafKCxsDeQJbmY/image.jpg';
export const HERO_SHARE_URL = 'https://kommodo.ai/i/AJ09hJSafKCxsDeQJbmY';

// Background 3D scroll animation image & about image
export const SCROLL_3D_BG_IMAGE_URL = 'https://plain-apac-prod-public.komododecks.com/202608/20/Pr5JUdsnyVubOyaQ07mC/image.jpg';
export const ABOUT_IMAGE_URL = 'https://plain-apac-prod-public.komododecks.com/202608/20/Pr5JUdsnyVubOyaQ07mC/image.jpg';
export const ABOUT_SHARE_URL = 'https://kommodo.ai/i/Pr5JUdsnyVubOyaQ07mC';

// Fallback local paths
import localHeroFallback from './images/sathya_hero_new.jpg';
import localFallbackImage from './images/sathya-image-2.jpeg';

export const heroImage = HERO_IMAGE_URL;
export const scroll3dBgImage = SCROLL_3D_BG_IMAGE_URL;
export const profileImage = HERO_IMAGE_URL;

console.log('[Profile Image Link] Hero image:', heroImage);
console.log('[Profile Image Link] 3D Scroll background image:', scroll3dBgImage);

export default heroImage;
export { localHeroFallback, localFallbackImage };
