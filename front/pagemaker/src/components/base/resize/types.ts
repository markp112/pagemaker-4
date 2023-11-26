import { TextElement, ButtonElement, ImageElement } from '@/components/page/model/imageElement/imageElement';
import { PageContainerInterface } from '@/components/page/model/pageContainer/container';

export type DragableElements = TextElement | ButtonElement | PageContainerInterface | ImageElement ;
export type WhichDimension = 'height' | 'width';
export type WhichLocation = 'top' | 'left';