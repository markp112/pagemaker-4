const openingTags = (pageTitle: string): string =>  `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
  </head>
<body>`;

const CLOSING_TAGS = '</body></html>';
export function htmlGenerator() {

  function createOpeningTags(pageTitle: string) {
    return openingTags(pageTitle);
  }

  function getClosingTags() {
    return CLOSING_TAGS;
  }

  return {
    createOpeningTags,
    getClosingTags,
  }
}