import imageVariants from '../data/responsiveImages.json';

const variants: Record<string, { src: string; width: number }[]> = imageVariants;

// Images added without generated variants still load normally through src.
export function photoSrcSet(src: string) {
  return variants[src]?.map(image => `${image.src} ${image.width}w`).join(', ');
}

// Match the rendered widths so high-density screens can request sharper photos.
export const homePhotoSizes = '(min-width: 475px) 320px, calc(75vw - 36px)';
export const menuPhotoSizes = '(min-width: 390px) 304px, 78vw';
export const galleryPhotoSizes = '(min-width: 1024px) 277.33px, (min-width: 944px) 282.67px, (min-width: 640px) calc((100vw - 96px) / 3), calc((100vw - 56px) / 3)';
