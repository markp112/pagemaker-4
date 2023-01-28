import type { EditorButtonSelectList } from '../../model';

const borderButtonDataMock: EditorButtonSelectList = {
  buttonType: 'iconList',
  commandName:'border',
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

const lineStyleButtonMock: EditorButtonSelectList = {
  buttonType: 'iconList',
  commandName:'line-style',
  displayIcon: 'sketch-32.png',
  name: 'line styles',
  tooltip: 'Line Style',
  listValues: [
    {
      classToApply: 'solid',
      icon: 'solid-line-32.png',
      tooltip: 'Solid line',
    },
    {
      classToApply: 'dotted',
      icon: 'dotted-line-32.png',
      tooltip: 'Dotted line',
    },
    {
      classToApply: 'dashed',
      icon: 'dashed-line-32.png',
      tooltip: 'Dashed line',
    },
    {
      classToApply: 'double',
      icon: 'double-line-32.png',
      tooltip: 'Double line',
    },
    {
      classToApply: 'inset',
      icon: 'inset-32.png',
      tooltip: 'Inset line',
    },
    {
      classToApply: 'outset',
      icon: 'outset-32.png',
      tooltip: 'Outset line',
    },
    {
      classToApply: 'ridge',
      icon: 'ridge-32.png',
      tooltip: 'Ridge',
    },
    {
      classToApply: 'groove',
      icon: 'groove-32.png',
      tooltip: 'Groove',
    },
  ]
}

export { borderButtonDataMock, lineStyleButtonMock };