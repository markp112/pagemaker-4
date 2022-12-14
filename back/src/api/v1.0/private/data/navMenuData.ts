import { NavMenuItemInterface } from './navMenuModel';

export const navMenu: NavMenuItemInterface[] = [
  {
    id: 0,
    navText: 'Profile',
    navLink: '/profile',
    isVisible: true,
    isLoggedIn: true,
  },
  {
    id: 1,
    navText: 'Settings',
    navLink: '/settings',
    isVisible: true,
    isLoggedIn: true,
  },
  {
    id: 2,
    navText: 'Admin',
    navLink: '/iconEditor',
    isVisible: true,
    isLoggedIn: true,
  },
  {
    id: 3,
    navText: 'Image Library',
    navLink: '/imageLibrary',
    isVisible: true,
    isLoggedIn: true,
  },
  {
    id: 0,
    navText: 'Login',
    navLink: '/login',
    isVisible: true,
    isLoggedIn: false,
  },
  {
    id: 1,
    navText: 'Register',
    navLink: '/register',
    isVisible: true,
    isLoggedIn: false,
  },
  {
    id: 3,
    navText: 'About',
    navLink: '/about',
    isVisible: true,
    isLoggedIn: false,
  },
  
];
