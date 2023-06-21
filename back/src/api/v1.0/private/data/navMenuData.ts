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
    id: 5,
    navText: 'Admin Commands',
    navLink: '/command-editor',
    isVisible: true,
    isLoggedIn: true,
  },
  {
    id: 7,
    navText: 'Command Structure',
    navLink: '/command-structure',
    isVisible: true,
    isLoggedIn: true,
  },
  { 
    id: 8, 
    navText: 'Component Editor',
    isVisible: true,
    isLoggedIn: true,
    navLink: '/component-editor',
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
