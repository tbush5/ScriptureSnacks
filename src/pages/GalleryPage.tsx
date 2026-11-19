
export const GalleryPage = () => {
  return (
    <main aria-labelledby="gallery-heading" className="min-h-[85vh] flex items-center justify-center bg-[#fffaf4] px-6 py-16 text-[#49352e] sm:py-20 lg:px-8">
      <div className="mx-auto w-full max-w-7xl text-center">
        <h1 id="gallery-heading" className="font-serif text-4xl sm:text-5xl">Gallery</h1>
        <div aria-hidden="true" className="mx-auto mt-5 h-1 w-16 rounded-full bg-light-purple" />
      </div>
    </main>
  );
};

export default GalleryPage;
