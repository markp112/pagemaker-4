import type { CssStyleNames } from '@/classes/cssStyles';
import type { StyleTags } from '@/components/page/model/pageElement/pageElement';

type EditorButtonTypes = 'list' | 'iconList' | 'plusMinus' | 'basic';

interface EditorButtonBase {
  name: string;
  tooltip: string;
  displayIcon: string;
  buttonType: EditorButtonTypes;
  cssStyleName: CssStyleNames
};

interface SelectListIcon {
  icon: string;
  classToApply: StyleTags;
  tooltip: string;
}

interface EditorButtonSelectList extends EditorButtonBase {
  listValues: SelectListIcon[];
};


export type { EditorButtonBase, EditorButtonSelectList, SelectListIcon };


