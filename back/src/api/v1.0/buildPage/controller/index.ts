
interface PageParams {
  userId: string;
  siteId: string;
  pageId: string;
}

function pageBuilderController() {

  function buildPage(pageParams: PageParams) {
    return ''
  }

  return { buildPage };

}

export { pageBuilderController };
