// Pixel size of each local gallery photo (01–37), read from the files, so layouts can reserve space.
const sizes: [number,number][] = [[1152,864],[300,225],[300,225],[300,169],[300,225],[300,225],[300,169],[300,169],[300,169],[1280,719],[1280,914],[1152,864],[1280,622],[1280,850],[1280,756],[1280,502],[1280,853],[1152,864],[300,225],[300,225],[300,169],[300,225],[300,169],[300,169],[300,169],[1328,747],[1152,864],[300,225],[300,169],[300,169],[1280,720],[1152,532],[1280,853],[1280,960],[480,318],[1280,960],[1280,960]];

export const galleryImages = sizes.map(([width, height], index) => {
  const number = String(index + 1).padStart(2, '0');
  return {
    title: `Konark Global gallery photo ${number}`,
    image: `/images/gallery/${number}.jpg`,
    width,
    height,
  };
});
