import type { EditorButtonSelectList } from '../../model';

const buttonDataMock: EditorButtonSelectList = {
  buttonType: 'iconList',
  cssStyleName:'border',
  displayIcon: 'right-blue-24.png',
  name: 'test-1',
  tooltip: 'test1',
  listValues: [
    {
      classToApply: 'solid',
      icon: 'down-24.png',
      tooltip: 'button -1',
    },
    {
      classToApply: 'dashed',
      icon: 'left-blue-24.png',
      tooltip: 'button -2',
    },
  ]
};

export { buttonDataMock };