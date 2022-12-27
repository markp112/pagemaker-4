import type { NavMenuItem } from '@/components/core/navbar/navbar';
import { defineStore } from 'pinia';
import { axiosClient } from '@/services/httpService';

type menuItems = NavMenuItem[];

export const useNavMenuItemStore = defineStore({
  id: 'navMenuItems',  

  state: () => {
    return {
      _navMenuItems: [] as menuItems,
    }
  },

  getters: {
    getMenuItems: (state) => {
      return state._navMenuItems;
    },
  },
  
  actions: {
    add(menuItem: NavMenuItem) {
      this._navMenuItems.push(menuItem);
    },

    async fetchMenuItems(isLoggedIn: boolean) {
      const route = `/private/menus/navmenu/${isLoggedIn}`;
      try {
        this._navMenuItems = await axiosClient().get<NavMenuItem[]>(route)
      } catch(err) {
        console.log(err);
        throw(err);
      }
    }
  }
});