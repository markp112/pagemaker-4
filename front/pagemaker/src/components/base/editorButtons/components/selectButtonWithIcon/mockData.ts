import type { EditorButtonSelectList } from '../../model';

const buttonDataMock: EditorButtonSelectList = {
  buttonType: 'iconList',
  cssStyleName:'border',
  displayIcon: 'border_all-32.png',
  name: 'Borders',
  tooltip: 'Borders',
  listValues: [
    {
      classToApply: 'border',
      icon: 'border_outside-32.png',
      tooltip: 'border all round',
    },
    {
      classToApply: 'border-top',
      icon: 'border_top-32.png',
      tooltip: 'border top',
    },
    {
      classToApply: 'border-bottom',
      icon: 'border_bottom-32.png',
      tooltip: 'border bottom',
    },
    {
      classToApply: 'border-right',
      icon: 'border_right-32.png',
      tooltip: 'border right',
    },
    {
      classToApply: 'border-left',
      icon: 'border_left-32.png',
      tooltip: 'border left',
    },
    {
      classToApply: 'border-none',
      icon: 'border_none-32.png',
      tooltip: 'remove border',
    },
  ]
};

export { buttonDataMock };