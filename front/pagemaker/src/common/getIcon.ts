const getImageUrl = (name: string) => {
  return new URL(`../assets/icons/${name}`, import.meta.url).href
};

export { getImageUrl };