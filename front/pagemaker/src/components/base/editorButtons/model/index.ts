type EditorButtonTypes = 'list' | 'iconList' | 'plusMinus' | 'basic';

interface EditorButtonBase {
  name: string;
  tooltip: string;
  displayIcon: string;
  buttonType: EditorButtonTypes;
};

interface SelectListIcon {
  icon: string;
  classToApply: string;
  tooltip: string;
}

interface EditorButtonSelectList extends EditorButtonBase {
  listValues: SelectListIcon[];
};


export type { EditorButtonBase, EditorButtonSelectList, SelectListIcon };


