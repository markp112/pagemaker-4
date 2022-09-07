
export interface NavMenuItemInterface {
  id: number;
  navText: string;
  navLink: string;
  isVisible: boolean;
  isLoggedIn: boolean;
};



export class NavMenuItem implements NavMenuItemInterface {
  id: number;
  navText: string;
  navLink: string;
  isVisible: boolean;
  isLoggedIn: boolean;

  constructor(
    menuItem: NavMenuItemInterface
  ) {
    this.id = menuItem.id;
    this.navLink = menuItem.navLink;
    this.navText = menuItem.navText;
    this.isVisible = menuItem.isVisible;
    this.isLoggedIn = menuItem.isLoggedIn;
  }
}
