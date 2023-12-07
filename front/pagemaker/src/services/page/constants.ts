export const PAGE_MESSAGES = {
  'ERROR_PAGE_EXISTS': (pageid: string) => `Page with id ${pageid} already exists`,
  'ERROR_PAGE_NOT_FOUND': (pageid: string) => `Page with id ${pageid} not found`,
  'ERROR_PAGE_NAME_REQUIRED': 'Page name is required',
  'ERROR_PAGE_NAME_EXISTS': (pagename: string) => `Page with name ${pagename} already exists`,
  'PAGE_CREATED': 'Page Created',
  'PAGE_UPDATED': 'Page Updated',
  'PAGE_DELETED': 'Page Deleted',
  'SAVED': 'Saved',

}

export const NEW_PAGE = '-1';
export const BASE_ROUTE = '/pages/';