import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { defineStore } from 'pinia';

type menuItems = NavMenuItem[];

export const useNavMenuItemStore = defineStore({
  id: 'navMenuItems',  
  state: () => ({
    navMenutItems: [] as menuItems,
  }),

  getters: {
    getMenuItems: (state) => (isLoggedIn: boolean): NavMenuItem[] | void => {
      return state.navMenutItems.forEach(menuItem => menuItem.isLoggedIn === isLoggedIn)
    },
  },
  
  actions: {
    add(menuItem: NavMenuItem) {
      this.navMenutItems.push(menuItem);
    },
  }
});
