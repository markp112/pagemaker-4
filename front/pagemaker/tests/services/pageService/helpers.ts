import { createTestingPinia } from '@pinia/testing';
import { setActivePinia } from 'pinia';
import { vi } from 'vitest';
import { usePageStore } from '@/stores/page.store';
import { useSiteStore } from '@/stores/site.store';

export const createTestStore = (stubActions: boolean) => {
  const pinia = createTestingPinia({
    createSpy: vi.fn,
    stubActions,
  });
  setActivePinia(pinia);
  
  const store = usePageStore(pinia);
  const mockSiteStore = useSiteStore(pinia)
  return { store, mockSiteStore };
};
