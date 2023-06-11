import type { Units } from '@/components/page/model/model';
import type { LineStyle, PageElement, Style, StyleTags } from '@/components/page/model/pageElement/pageElement';
import { useEditorSettingsStore } from '@/stores/editorSettings.store';
import { useImagesStore } from '@/stores/images.store';
import { usePageStore } from '@/stores/page.store';
import { FileUploadService } from '@/services/fileUpload/fileUpload.service';
import { userService } from '@/services/user/userService';
import { useAuthStore } from '@/stores/auth.store';
import type { PageContainerInterface } from '@/components/page/model/pageContainer/container';
import type { ActiveElements } from '@/components/page/model/imageElement/imageElement';
import { useActiveElementStore } from '@/stores/activeElement.store';

class EditorSettingsService {

  constructor( private readonly settingsStore = useEditorSettingsStore(),
    private readonly activeElementStore = useActiveElementStore(),
    private readonly imagesStore = useImagesStore(),
    private readonly fileUploadService = FileUploadService(),
    private readonly authStore = useAuthStore(),
    private readonly useUserService = userService(),
    private readonly pageStore = usePageStore(),
  ) {}

  getLineStyle(): LineStyle {
    return this.settingsStore.borderLineStyle; 
  }

  setLineStyle(lineStyle: LineStyle) {
    this.settingsStore.setBorderLineStyle(lineStyle);
  }

  setLineThickness(byAmount: number) {
    this.settingsStore.setLineThickness(byAmount);
  }

  lineThickness(): number {
    return this.settingsStore.getLineThickness;
  }

  setBorderElement(borderElement: StyleTags | '') {
    this.settingsStore.setBorderElement(borderElement);
  }

  getBorderElement(): StyleTags | '' {
    return this.settingsStore.borderElement;
  }

  getUnits(): Units {
    return this.settingsStore.units;
  }

  setUnits(units: Units) {
    this.settingsStore.setUnits(units);
  }

  setColour(colour: string) {
    this.settingsStore.setCurrentColour(colour);
  }

  getColour(): string {
    return this.settingsStore.currentColour;
  }

  setColourAppliesTo(appliesTo: string) {
    this.settingsStore.setColourAppliesTo(appliesTo)
  }

  getColourAppliesTo() {
    return this.settingsStore.colourAppliesTo;
  }

  setActiveElement(element: ActiveElements) {
    if(this.activeElementStore.activeElement === undefined || element === undefined) {
      this.activeElementStore.setActiveElement(element);
      return;
    } 
    if(this.activeElementStore.activeElement.ref === element.ref) {
      this.activeElementStore.setActiveElement(undefined);
      return;
    } 
    this.activeElementStore.setActiveElement(element);
  }

  getActiveElement() {
    return this.activeElementStore.activeElement;
  }

  getActiveElementType() {
    return this.activeElementStore.getActiveElementType;
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
    return this.fileUploadService.uploadFile(file, this.authStore.userUid);
  }

  applyStyle(style: Style) {
    const styles = this.activeElementStore.getStyles.filter((currentStyle: Style) => currentStyle.style !== style.style);
    if(styles) {
      styles?.push(style);
      this.activeElementStore.setStyles(styles);
    }
  }

  applyClass(className: string, classNameStem: string) {
    const CLASS_NAME_SEPARATOR = ' ';
    if (this.activeElementStore.activeElement) {
      let classes = this.activeElementStore.getClasses.split(CLASS_NAME_SEPARATOR);
      classes = classes.filter((className: string) => !className.includes(classNameStem));
      classes.push(className);
      this.activeElementStore.setClasses(classes.join(CLASS_NAME_SEPARATOR))
    }
  }

  deleteElement(elementRef: string) {
    if (this.activeElementStore.activeElement) {
      const pageElements: PageElement[] = <PageElement[]>this.pageStore.pageElements;
      this.findAndDeleteElement(elementRef, pageElements)
    }
  }

  findAndDeleteElement(elementRef: string, pageElements: PageElement[]) {
    for (let index = 0; index < pageElements.length; index++) {
      if (pageElements[index].ref === elementRef) {
        pageElements.splice(index, 1);
        break;
      } else {
        if (pageElements[index].isContainer) {
          const container: PageContainerInterface = <PageContainerInterface>pageElements[index];
          this.findAndDeleteElement(elementRef, container.elements);
        }
      }
    }
}

}

export  { EditorSettingsService };
