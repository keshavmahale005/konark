export const galleryImages = Array.from({ length: 37 }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    title: `Konark Global gallery photo ${number}`,
    image: `/images/gallery/${number}.jpg`,
  };
});
