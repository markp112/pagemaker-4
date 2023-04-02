import type { Command, CommandButtonTypes } from '@/classes/commandButtons/model';
import { axiosClient } from '@/services/httpService';
import { useAdminStore } from '@/stores/admin.store';

const BASE_ROUTE = '/private/admin/commands';

function AdminCommands() {
  const store = useAdminStore();

  async function fetchAllCommands() {
    const allCommands = await axiosClient().get<Command>(BASE_ROUTE);
    store.setCommands(allCommands);
  }

  async function postCommand(key: string, command: CommandButtonTypes ) {
    const commandToPost = { ...command, key };
    await axiosClient().post<{},{}>(BASE_ROUTE, commandToPost);
    store.addCommand(key, command);
}

  return { fetchAllCommands, postCommand };
}

export { AdminCommands };
