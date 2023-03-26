import type { ImageElement } from '@/components/page/model/imageElement/imageElement';
import type { PageElement } from '@/components/page/model/pageElement/pageElement';
import { EditorSettingsService } from '@/services/editorSettings/editor.settings.service';
import type { Command } from '../model/command';

export class ImageCommand implements Command {
  constructor(private pageElement: PageElement, private service: EditorSettingsService = new EditorSettingsService()) {}

  execute(imageUrl: string): PageElement {
    if(this.pageElement.type === 'imageElement') {
      this.pageElement.content = imageUrl;
      const img = new Image();
      const imageElement = this.pageElement as ImageElement;
      img.src = imageUrl;
      const imgWidth = img.width;
      const imgHeight = img.height;
      const ratio =  Math.min(imgWidth / imgHeight, imgHeight / imgWidth);
      imageElement.image.naturalSize.width.value = img.naturalWidth;
      imageElement.image.naturalSize.height.value = img.naturalHeight;
      imageElement.ratio = ratio;
    }
    return this.pageElement;  
  }

  undo(imageUrl: string) {
    if(this.pageElement.type === 'imageElement') {
      this.pageElement.content = '';
    }
    return this.pageElement;  
  }
}