import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { defineStore } from 'pinia';
import { axiosClient } from '@/services/httpService';

type menuItems = NavMenuItem[];

export const useNavMenuItemStore = defineStore({
  id: 'navMenuItems',  
  state: () => ({
    navMenutItems: [] as menuItems,
  }),

  getters: {
    getMenuItems: (state) => {
      return state.navMenutItems;
    },
  },
  
  actions: {
    add(menuItem: NavMenuItem) {
      this.navMenutItems.push(menuItem);
    },

    async fetchMenuItems(isLoggedIn: boolean) {
      const route = `/private/menus/navmenu/${isLoggedIn}`;
      try {
        const menu = await axiosClient().get<NavMenuItem[]>(route)
          this.$state.navMenutItems = menu;
      } catch(err) {
        console.log(err);
        throw(err);
      }
    }
  }
});