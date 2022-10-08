export type PageElementClasses =
  | ButtonElement
  | TextElement
  | ImageElement
  | PageContainer;

export const ROOT = 'ROOT';

export class PageContainer extends PageElement
implements PageContainerInterface {

  private _elements: PageElementClasses[];

  constructor(pageElementBuilder: PageElementBuilder) {
    super(pageElementBuilder);
    this._elements = [];
  }

  checkDimensionRelativeToContainerElements(
    string: string,
    dimensionToCheck: number
  ) {
    let totalDimensionOfOtherComponent = 0;
    let totalHeightOrWidth = 0;
    if (this.containerOrientation === 'row') {
      totalHeightOrWidth = this.dimension.width.value;
      this.elements
        .filter(element => { element.ref !== string })
        .forEach(element => {
          const dimension = element.dimension;
          const units = dimension.width.unit;
          if (units === '%') {
            const divisor: number = dimension.width.value / 100;
            totalDimensionOfOtherComponent +=
              this.dimension.width.value * divisor;
          } else {
            totalDimensionOfOtherComponent +=
              element.dimension.width.value;
          }
        });
    } else {
      totalHeightOrWidth = this.dimension.height.value;
      this.elements
        .filter(element => {
          return element ? element.ref !== string : undefined;
        })
        .forEach(element =>
            totalDimensionOfOtherComponent += element.dimension.height.value
        );
    }
    return dimensionToCheck + totalDimensionOfOtherComponent >=
      totalHeightOrWidth
      ? totalHeightOrWidth - totalDimensionOfOtherComponent - 4
      : dimensionToCheck;
  }

  getWidthOfAllComponents(): number {
    let width = 0;
    this._elements.forEach(element =>
        width += element.dimension.width.value
    );
    return width;
  }

  getHeightOfAllComponents(): number {
    let height = 0;
    this._elements.forEach(element =>
        height += element.dimension.width.value
    );
    return height;
  }

  get elements(): PageElementClasses[] {
    return this._elements;
  }

  set elements(pageElements: PageElementClasses[]) {
    this._elements = pageElements;
  }

  get containerOrientation(): ContainerOrientation {
    return this.classDefinition.includes('flex-row') ? 'row' : 'column';
  }

  setDefaultStyle() {
    if (this.styles.length === 0) {
      const siteDefaults = SiteDefaults.getInstance();
      this.addStyle(
        this.constructStyle('font-family', siteDefaults.typography.fontName)
      );
      this.addStyle(
        this.constructStyle('font-size', siteDefaults.typography.fontSizeBody)
      );
      const siteColours = siteDefaults.colours;
      this.addStyle(
        this.constructStyle('background-color', siteColours.surface)
      );
      this.addStyle(this.constructStyle('color', siteColours.textOnSurface));
    }
  }

  addNewElement(newElement: PageElementClasses) {
    if (newElement) {
      const existingElement = this._elements.filter(element =>
        element.ref === newElement.ref
        )[0];
      if (!existingElement) {
        this._elements.push(newElement);
      } else {
        this._elements = this._elements.filter(element =>
            element.ref !== newElement.ref
        );
        this._elements.push(newElement);
      }
    }
  }

  getAnElement(ref: string): PageElementClasses {
    return this._elements.filter(element => element.ref === ref)[0];
  }

  deleteElement(ref: string) {
    this._elements = this._elements.filter(element => element.ref !== ref);
  }

  getElementContent(): FirebasePageDataTypes {
    return Object.assign(this.getBaseElementContent(), {
      elements: this._elements
    });
  }
}