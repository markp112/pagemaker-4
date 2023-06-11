import type { ActiveElements, ImageElement } from '@/components/page/model/imageElement/imageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';
const IMAGE_ELEMENT = 'imageElement';

export class ImageCommand implements Command {
  constructor(private pageElement: ActiveElements, private service: EditorSettingsService = new EditorSettingsService()) {}

  execute(imageUrl: string): ActiveElements {
    if(this.pageElement.type === IMAGE_ELEMENT) {
      const imageElement = this.pageElement as ImageElement;
      imageElement.content = imageUrl;
      const img = new Image();
      img.src = imageUrl;
      const imgWidth = img.width;
      const imgHeight = img.height;
      const ratio =  Math.min(imgWidth / imgHeight, imgHeight / imgWidth);
      imageElement.image.naturalSize.width.value.value = img.naturalWidth.toString();
      imageElement.image.naturalSize.height.value.value = img.naturalHeight.toString();
      imageElement.ratio = ratio;
    }
    return this.pageElement;  
  }

  undo(imageUrl: string) {
    if(this.pageElement.type === 'imageElement') {
      (this.pageElement as ImageElement).content = '';
    }
    return this.pageElement;  
  }
}