import { AppAction, AppStore } from '@shared/types/store.type';
import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

const appStoreInitialState = {
  setting: {
    showNotification: true,
  },
} satisfies AppStore;

/**
 * This creates a AppStoreContext.
 * It's extracted into a function to be able to type the Context before it's even initialized.
 */
export const createAppStoreContext = (init: AppStore = appStoreInitialState) => {
  const [store, setStore] = createStore(init);

  const actions: AppAction = {
    /**
     * Toggle global notifications
     */
    toggleNotif: () => setStore('setting', 'showNotification', (prev) => !prev),
    /**
     * Enable global notifications
     */
    enableNotif: () => setStore('setting', 'showNotification', true),
    /**
     * Disable global notifications
     */
    disableNotif: () => setStore('setting', 'showNotification', false),
  };

  return [store, actions] as const;
};

export type AppStoreContextInterface = ReturnType<typeof createAppStoreContext>;

export const AppStoreContext = createContext<AppStoreContextInterface>(
  {} as AppStoreContextInterface,
);

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore: cannot find the AppStoreContext');
  }

  return context;
};
