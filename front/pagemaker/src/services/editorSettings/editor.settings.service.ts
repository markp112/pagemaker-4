import type { Units } from '@/components/page/model/model';
import type { LineStyle, PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';
import { useImagesStore } from '@/stores/images.store';
import { FileUploadService } from '@/services/fileUpload/fileUpload.service';
import { userService } from '@/services/user/userService';
import { useAuthStore } from '@/stores/auth.store';

class EditorSettingsService {

  constructor(private store = useEditorSettingsStore(), 
    private imagesStore = useImagesStore(),
    private fileUploadService = FileUploadService(),
    private authStore = useAuthStore(),
    private useUserService = userService()
  ) {}

  getLineStyle(): LineStyle {
    return this.store.borderLineStyle; 
  }

  setLineStyle(lineStyle: LineStyle) {
    this.store.setBorderLineStyle(lineStyle);
  }

  setLineThickness(byAmount: number) {
    this.store.setLineThickness(byAmount);
  }

  lineThickness(): number {
    return this.store.getLineThickness;
  }

  setBorderElement(borderElement: StyleTags | '') {
    this.store.setBorderElement(borderElement);
  }

  getBorderElement(): StyleTags | '' {
    return this.store.borderElement;
  }

  getUnits(): Units {
    return this.store.units;
  }

  setUnits(units: Units) {
    this.store.setUnits(units);
  }

  setColour(colour: string) {
    this.store.setCurrentColour(colour);
  }

  getColour(): string {
    return this.store.currentColour;
  }

  setColourAppliesTo(appliesTo: string) {
    this.store.setColourAppliesTo(appliesTo)
  }

  getColourAppliesTo() {
    return this.store.colourAppliesTo;
  }

  setActiveElement(element: PageElement) {
    if(this.store.activeElement === undefined) {
      this.store.setActiveElement(element);
      return;
    } 
    if(this.store.activeElement.ref === element.ref) {
      this.store.setActiveElement(undefined);
      return;
    } 
    this.store.setActiveElement(element);
  }


  getActiveElement() {
    return this.store.activeElement;
  }

  async showImageLibrary(show: boolean) {
    if(this.imagesStore.imageDisplayList.length === 0) {
      await this.useUserService.retrieveImages();
    }
    this.imagesStore.setShowGallery();
  }

  getImagesForGallery() {
    return this.imagesStore.imageDisplayList;
  }

  async uploadImageFile(file: File) {
    return await this.fileUploadService.uploadFile(file, this.authStore.userUid);
  }

  applyStyle(style: Style) {
    const styles = this.store.getStyles.filter(currentStyle => currentStyle.style !== style.style);
    if(styles) {
      styles?.push(style);
      this.store.setStyles(styles);
    }
  }

}

export  { EditorSettingsService };
