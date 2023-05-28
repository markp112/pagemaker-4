import { htmlGenerator } from '../../../../../src/api/v1.0/buildPage/htmlTemplate/htmlTemplate';

describe('createHtmlStructure', () => {
  describe('createOpeningTags', () => {
    it('should create the opening html tags for a web page', () => {
      const PAGE_TITLE = 'test page';
      const result = htmlGenerator().createOpeningTags(PAGE_TITLE);
      expect(result).toContain('<!DOCTYPE html>');
      expect(result).toContain('<body>');
      expect(result).toContain(`<title>${PAGE_TITLE}</title>`);
      expect(result).not.toContain('</body>');
    });
  });

  describe('createClosingTags', () => {
    it('should return a string closing the body and html tags', () => {
      const closingTags = htmlGenerator().getClosingTags();
      expect(closingTags).toContain('</body>');
      expect(closingTags).toContain('</html>');
    });
  });

})