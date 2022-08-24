
export interface NavMenuItemInterface {
  id: number;
  navText: string;
  navLink: string;
  isVisible: boolean;
  _isLoggedIn: boolean;
};



export class NavMenuItem implements NavMenuItemInterface {
  _id: number;
  _navText: string;
  _navLink: string;
  _isVisible: boolean;
  _isLoggedIn: boolean;

  constructor(
    menuItem: NavMenuItemInterface
  ) {
    this._id = menuItem.id;
    this._navLink = menuItem.navLink;
    this._navText = menuItem.navText;
    this._isVisible = menuItem.isVisible;
    this._isLoggedIn = menuItem._isLoggedIn;
  }

  get navLink(): string {
    return this._navLink;
  }

  get navText(): string {
    return this._navText;
  }

  get id(): number {
    return this._id;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
}
