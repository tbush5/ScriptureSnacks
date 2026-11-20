import { galleryImages } from '../data/galleryImages';

type GallerySlot = (typeof galleryImages)[number] | null;

const slots: GallerySlot[] = [...galleryImages];
// Center a single final photo; a final pair stays in the left and middle columns.
if (slots.length % 3 === 1) slots.splice(slots.length - 1, 0, null);
const columns = [0, 1, 2].map(column => {
  const photos = slots.filter((_, index) => index % 3 === column);
  // Empty final positions must not add height below the last actual photo.
  while (photos[photos.length - 1] === null) photos.pop();
  return photos;
});

export const GalleryPage = () => {
  return (
    <main aria-label="Gallery" className="min-h-[85vh] overflow-hidden bg-[#fffaf4] px-4 py-8 text-[#49352e] sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto grid max-w-4xl grid-cols-3 items-start gap-3 sm:gap-6 lg:gap-8">
          {columns.map((photos, column) => (
            <ul
              key={column}
              aria-label={`Gallery column ${column + 1}`}
              className={`space-y-3 sm:space-y-6 lg:space-y-8 ${column === 1 ? '' : 'pt-[66.6667%]'}`}
            >
              {photos.map((photo, index) => {
                if (!photo) return <li key={`empty-${index}`} aria-hidden="true" className="aspect-[3/4]" />;
                return (
                  <li key={photo.src} className="aspect-[3/4] overflow-hidden rounded-xl shadow-sm sm:rounded-2xl">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-full w-full object-cover object-center"
                    />
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </main>
  );
};

export default GalleryPage;
