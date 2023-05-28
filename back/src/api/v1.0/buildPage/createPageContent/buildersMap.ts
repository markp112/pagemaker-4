import { ButtonElement, ImageElement, PageContainerInterface } from '@api/v1.0/pages/model/model';
import { ImageBuilder } from './imageBuilder';
import { ContainerBuilder } from './containerBuilder';
import { ButtonBuilder } from './buttonBuilder';

const elementBuilders = {
  imageElement: (element: ImageElement) => new ImageBuilder(element),
  jumbo: (element: PageContainerInterface) => new ContainerBuilder(element),
  buttonElement: (element: ButtonElement) => new ButtonBuilder(element),
};

export { elementBuilders };
