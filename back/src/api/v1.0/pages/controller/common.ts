const pagesCollectionBase = (siteId: string) => `${siteId}::pages`;
const pageCollectionBase = (siteId: string, pageId: string) => `${siteId}${pageId}::pages`;

export { pageCollectionBase, pagesCollectionBase };