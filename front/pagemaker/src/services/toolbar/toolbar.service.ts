import type { Toolbar } from '@/components/core/toolbar/model';
import { useToolbarStore } from '@/stores/toolbars.store';
import { axiosClient } from '../httpService';

function toolbarService() {
  const baseRoute = '/private/toolbar/';
  const store = useToolbarStore();

  async function getToolBarItems() {
    try {
      const toolbar = await axiosClient().get<Toolbar[]>(`${baseRoute}`);
      if (toolbar.length > 0) {
        store.clear();
        // toolbar.forEach(toolbarItem => store.add(toolbarItem));
        store.setItems(toolbar);
      }
    } catch (error) {
      console.log('%c⧭', 'color: #1d3f73', error);
      throw (error);
    }
  }

  return {
    getToolBarItems,

  }
}

export { toolbarService };
