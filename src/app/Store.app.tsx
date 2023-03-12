import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { localeDict } from '../configs/locale/locale.config';
import { LocaleDictLanguage } from '../configs/locale/locale.type';
import { createI18nContext, I18nContext } from '../hooks/usei18n/usei18n.hook';
import { Setting } from '../models/Setting.model';
import { UserStore } from '../models/User.model';

// #region INTERFACES
export type AppStore = {
  user: UserStore | null;
  setting: Setting;
};

export type AppAction = Readonly<{
  resetUser?: () => void;
  updateUser?: (_user: UserStore) => void;
}>;

export type Theme =
  | 'light'
  | 'dark'
  | 'cupcake'
  | 'bumblebee'
  | 'emerald'
  | 'corporate'
  | 'synthwave'
  | 'retro'
  | 'cyberpunk'
  | 'valentine'
  | 'halloween'
  | 'garden'
  | 'forest'
  | 'aqua'
  | 'lofi'
  | 'pastel'
  | 'fantasy'
  | 'wireframe'
  | 'black'
  | 'luxury'
  | 'dracula'
  | 'cmyk'
  | 'autumn'
  | 'business'
  | 'acid'
  | 'lemonade'
  | 'night'
  | 'coffee'
  | 'winter';
// #endregion

const initialState = {
  user: null,
  setting: {
    showNotification: true,
  },
} satisfies AppStore;

export const [appStore, setAppStore] = createStore<AppStore>(initialState);

// #region PROVIDERS
const I18nProvider: ParentComponent<{
  dict?: Record<string, Record<string, unknown>>;
  locale?: LocaleDictLanguage;
}> = (props) => {
  // eslint-disable-next-line solid/reactivity
  const value = createI18nContext(props.dict, props.locale);

  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>;
};

export const AppContext = createContext<[AppStore, AppAction]>([initialState, {}]);
export const useAppContext = () => useContext(AppContext);

export const AppProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<AppStore>(initialState);

  const action = {
    resetUser: () => setStore('user', null),
    updateUser: (_user) => setStore('user', _user),
  } satisfies AppAction;

  return (
    <AppContext.Provider value={[store, action]}>
      <I18nProvider dict={localeDict}>{props.children}</I18nProvider>
    </AppContext.Provider>
  );
};
// #endregion

export function createLocalStore<T extends object>(
  name: string,
  init: T,
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(localState ? (JSON.parse(localState) as T) : init);

  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));

  return [state, setState];
}
