import type { AnActionEvent } from '@/classes/actionEvent';
import type { ADimension, Dimension } from '@/classes/dimension';
import type { ALocation } from '@/classes/location';
import type { ValueAndUnit } from '@/classes/units';
import type { ComponentTypesString } from '@/components/core/toolbar/model';
import type { PageElement, Style, StyleTags } from '../../model/pageElement/pageElement';
import type { PageContainer } from '../pageContainer';

export class APageElement implements PageElement {

  constructor(pageElementBuilder: PageElementBuilder) {
    this._name = pageElementBuilder.name;
    this._ref = pageElementBuilder.ref;
    this._componentHTMLTag = pageElementBuilder.componentHTMLTag;
    this._isContainer = pageElementBuilder.isContainer;
    this._styles = pageElementBuilder.styles;
    this._parent = pageElementBuilder.parent;
    this._parentRef = pageElementBuilder.parentRef;
    this._classDefinition = pageElementBuilder.classDefinition;
    this._type = pageElementBuilder.type;
    this._dimension = pageElementBuilder.dimension;
    this._location = pageElementBuilder.location;
    this._actionEvent = pageElementBuilder.actionEvent;
    this.classList = pageElementBuilder.classDefinition.split(" ");
    this._content = pageElementBuilder.content;
    this._isAbsolute = pageElementBuilder.isAbsolute;
  }

  private _name: string; //** name of the component  */
  private _ref: string; //**  unique ref of this component sin the Dom */
  private _componentHTMLTag: string; //** component tag */
  private _isContainer: boolean; //** can contain  other elements */
  private _styles: Style[]; //** css styles */
  private _parent!: PageContainer; //** parent Object */
  private _parentRef: string; //** string ref to the parent */
  private _classDefinition: string; //** String of tailwind classes to be applied to an element */
  private _type: ComponentTypesString; //** what is this component as in image text etc */
  private _dimension: ADimension;
  private _location: ALocation;
  private _actionEvent: AnActionEvent; //** if this component support events ActionEvent defines the event type and action */
  private _content: string;
  private classList: string[] = [];
  private _isAbsolute = false;

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    this._name = newName;
  }

  get ref(): string {
    return this._ref;
  }

  set ref(newRef: string) {
    this._ref = newRef;
  }

  get componentHTMLTag(): string {
    return this._componentHTMLTag;
  }

  set componentHTMLTag(newComponent: string) {
    this._componentHTMLTag = newComponent;
  }

  get isContainer(): boolean {
    return this._isContainer;
  }

  set isContainer(newValue: boolean) {
    this._isContainer = newValue;
  }

  get styles(): Style[] {
    return this._styles;
  }

  get type(): ComponentTypesString {
    return this._type;
  }

  set type(type: ComponentTypesString) {
    this._type = type;
  }

  get classDefinition(): string {
    return this.classList.join(' ').trim();
  }

  set classDefinition(definition: string) {
    this._classDefinition = definition;
  }

  get parent(): PageContainer {
    return this._parent;
  }

  set parent(newParent: PageContainer) {
    this._parent = newParent;
  }

  get parentRef(): string {
    return this._parentRef;
  }

  set parentRef(parentRef: string) {
    this._parentRef = parentRef;
  }

  get dimension(): ADimension {
    return this._dimension;
  }

  get location(): ALocation {
    return this._location;
  }

  get actionEvent(): AnActionEvent {
    return this._actionEvent;
  }

  set actionEvent(actionEvent: AnActionEvent) {
    this._actionEvent = actionEvent;
  }

  get id(): number {
    const index = this._ref.indexOf("::");
    return parseInt(this._ref.substring(index + 1));
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get isAbsolute(): boolean {
    return this._isAbsolute;
  }

  set isAbsolute(isAbsolute: boolean) {
    this._isAbsolute = isAbsolute;
  }

  public reSize(boxdimension: Dimension): void {
    this._dimension.height = boxdimension.height;
    this._dimension.width = boxdimension.width;
  }

  public setLocation(top: ValueAndUnit, left: ValueAndUnit): void {
    this._location.top = top;
    this._location.left = left;
  }

  public updateLocation(newX: number, newY: number): void {
    this.location.top.value = newY;
    this.location.left.value = newX;
  }

  constructStyle(styleName: StyleTags, value: string): Style {
    const style: Style = {
      style: styleName,
      value: value
    };
    return style;
  }

  setDefaultStyle() {
    // to be implemented in inherited classes
  }

  addStyle(newStyle: Style) {
    if (newStyle.style === 'transparency') {
      const backgroundColour = this._styles.filter(el => el.style === 'background-color');
      if (backgroundColour.length > 0) {
        const currentStyle = backgroundColour[0];
        const hexValue = parseInt(newStyle.value).toString(16);
        currentStyle.value = `${currentStyle.value.substring(0,7)}${hexValue}`;
        currentStyle.style = 'background-color'
      }
    }
    this._styles = this._styles.filter(el => el.style !== newStyle.style);
    this._styles.push(newStyle);
  }

  addStyles(styles: Style[]) {
    this._styles = [...styles];
  }

  removeStyle(styleToRemove: string) {
    this._styles = this._styles.filter(el => !el.style.includes(styleToRemove));
  }

  public updateRefWithNewId(id: string) {
    const index = this._ref.indexOf("::");
    const newRef = this._ref.substring(0, index + 1);
    this._ref = `${newRef}${id}`;
  }

  addClass(classDef: string): void {
    const stem = !classDef.includes("-")
      ? classDef
      : classDef.substr(0, classDef.indexOf("-") + 1);
    this.removeClass(stem);
    this.classList.push(classDef);
  }

  getStylesToString(): string {
    let style = "";
    const styles: Style[] = this.styles;
    if (styles.length > 0) {
      styles.forEach(element => {
        style += `${element.style}:${element.value};`;
      });
    }
    style += `${this._dimension.toStyle()};`;
    if (this.isAbsolute) {
      style += `${this._location.toStyle()};`;
    }
    return style;
  }

  /** removeClass removes a class from the component, but it must be the full class name */
  removeClass(classDef: string): void {
    const tempClassList = this.classList.filter(
      className => !className.includes(classDef)
    );
    this.classList = tempClassList;
  }
}