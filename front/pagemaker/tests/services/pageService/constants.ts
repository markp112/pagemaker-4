import { surfacePalette } from '../../views/pageBuilder/mocks/componentFactory.mocks';
import { getDefaultPage } from '@/components/page/model/pageElement/constants';

export const NEW_SITE_ID = '1';
export const PAGE = getDefaultPage(NEW_SITE_ID, surfacePalette.colours[0].hexColourBackground, surfacePalette.colours[0].hexColourText);
