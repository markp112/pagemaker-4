function getUserAndSiteId(userId: string, siteId: string, path?: string) {
  return path ? `${userId}${siteId}::${path}` : `${userId}${siteId}`; 
}

export { getUserAndSiteId };
