import type { ToolbarComponentItem } from '@/components/core/toolbar/model';
import { useToolbarStore } from '@/stores/toolbars.store';
import { axiosClient } from '../httpService';

const BASE_ROUTE = '/private/toolbar/';

function toolbarService() {
  const store = useToolbarStore();

  async function fetchToolBarItems() {
    try {
      const toolbarItems = await axiosClient().get<ToolbarComponentItem[]>(`${BASE_ROUTE}`);
      if (toolbarItems.length > 0) {
        store.clear();
        store.setItems(toolbarItems);
      }
    } catch (error) {
      throw (error);
    }
  }

  function getToolbarItems() {
    return store.toolbarItems;
  }

  async function postToolbarItem(toolbarItem: ToolbarComponentItem) {
    await axiosClient().post<ToolbarComponentItem, ToolbarComponentItem>(BASE_ROUTE, toolbarItem);
  }

  async function patchToolbarItem(toolbarItem: ToolbarComponentItem) {
    console.log('%c⧭', 'color: #ffa280', toolbarItem);
    await axiosClient().put<ToolbarComponentItem, ToolbarComponentItem>(BASE_ROUTE, toolbarItem);
  }

  return {
    fetchToolBarItems,
    getToolbarItems,
    postToolbarItem,
    patchToolbarItem,
  }
}

export { toolbarService };
