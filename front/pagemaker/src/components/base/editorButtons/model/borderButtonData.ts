import type { ComponentTypesString } from '@/components/page/model/pageElement/pageElement';
import type { EditorButtonBase, EditorButtonNumericSelectList, EditorButtonSelectList, EditorComponentButtons } from '.';

const borderButtonDataMock: EditorButtonSelectList = {
  buttonType: 'iconList',
  commandName: 'border',
  commandType: 'direct',
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
  commandType: 'indirect',
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
};

const lineThicknessButton: EditorButtonBase = {
  buttonType: 'plusMinus',
  commandName: 'line-thickness',
  commandType: 'indirect',
  displayIcon: 'thickness-32.png',
  name: 'LineThickness',
  tooltip: 'Line thickness'
};

const borderRadius: EditorButtonNumericSelectList = {
  displayIcon: 'bezier-32.png',
  buttonType: 'numericWithSelect',
  commandName: 'border-radius',
  commandType: 'indirect',
  listValues: ['px', 'em', '%'],
  name: 'BorderRadius',
  tooltip: 'Border radius',
};

const flexRow: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'flex-row',
  commandType: 'direct',
  displayIcon: 'row-32.png',
  name: 'flexRow',
  tooltip: 'align items on horizontal axis'
};

const flexColumn: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'flex-col',
  commandType: 'direct',
  displayIcon: 'column-32.png',
  name: 'flexColumn',
  tooltip: 'align items on vertical axis'
};

const justifyStart: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'justify-start',
  commandType: 'direct',
  displayIcon: 'align_horizontal_left-32.png',
  name: 'justifyStart',
  tooltip: 'Align content to the start'
};

const justifyCenter: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'justify-center',
  commandType: 'direct',
  displayIcon: 'align_horizontal_center-32.png',
  name: 'justifyStart',
  tooltip: 'Align content to the Center'
};

const justifyEnd: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'justify-end',
  commandType: 'direct',
  displayIcon: 'align_horizontal_right-32.png',
  name: 'justifyEnd',
  tooltip: 'Align content to the end'
};

const justifyBetween: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'justify-between',
  commandType: 'direct',
  displayIcon: 'space_between_horizontal-32.png',
  name: 'justifyBetween',
  tooltip: 'space between'
};

const justifyEvenly: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'justify-evenly',
  commandType: 'direct',
  displayIcon: 'space_evenly_horizontal-32.png',
  name: 'justifyEvenly',
  tooltip: 'space evenly'
};

const justifyAround: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'justify-around',
  commandType: 'direct',
  displayIcon: 'space_around_horizontal-32.png',
  name: 'justifyAround',
  tooltip: 'space around'
};

const itemsStart: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'items-start',
  commandType: 'direct',
  displayIcon: 'align_vertical_top-32.png',
  name: 'alignTop',
  tooltip: 'align items to start'
};

const itemsCenter: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'items-center',
  commandType: 'direct',
  displayIcon: 'align_vertical_center-32.png',
  name: 'alignTop',
  tooltip: 'align items to center'
};

const itemsEnd: EditorButtonBase = {
  buttonType: 'basic',
  commandName: 'items-end',
  commandType: 'direct',
  displayIcon: 'align_vertical_bottom-32.png',
  name: 'alignTop',
  tooltip: 'align items to end'
};

const imageButtons: EditorComponentButtons = {
  id: 'ImageEditorButtons',
  tabNames: ['Borders', 'Colours', 'Image'],
  tabElements: ['BordersContainer', 'ColoursContainer', 'ImagesContainer']
};
const containerButtons: EditorComponentButtons = {
  id: 'ContainerEditorButtons',
  tabNames: ['Borders', 'Colours', 'Layout'],
  tabElements: ['BordersContainer', 'ColoursContainer', 'LayoutContainer']
};
type EditorKey = {[key in ComponentTypesString]: EditorComponentButtons }

const editorComponentButtons: EditorKey = {
  'imageElement': imageButtons,
  'jumbo': containerButtons,
  'buttonElement': containerButtons,
  'container': containerButtons,
  'navBar': containerButtons,
  'page': containerButtons,
  'pageTemplate': containerButtons,
  'rootContainer': containerButtons,
  'text': imageButtons,
};

export { 
  borderButtonDataMock,
  lineStyleButtonMock,
  lineThicknessButton,
  borderRadius,
  imageButtons,
  containerButtons,
  editorComponentButtons,
  justifyStart,
  justifyEnd,
  justifyCenter,
  justifyBetween,
  justifyEvenly,
  justifyAround,
  flexColumn,
  flexRow,
  itemsStart,
  itemsCenter,
  itemsEnd,
};