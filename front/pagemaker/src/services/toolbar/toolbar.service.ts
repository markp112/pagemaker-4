import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import { useToolbarStore } from '@/stores/toolbars.store';
import { axiosClient } from '../httpService';

function toolbarService() {
  const baseRoute = '/private/toolbar/';
  const store = useToolbarStore();

  async function getToolBarItems() {
    try {
      const toolbarItems = await axiosClient().get<ToolbarComponentItem[]>(`${baseRoute}`);
      console.log('%c⧭', 'color: #735656', toolbarItems);
      if (toolbarItems.length > 0) {
        store.clear();
        store.setItems(toolbarItems);
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
