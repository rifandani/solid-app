import { createContext, createEffect, ParentComponent, useContext } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { localeConfig } from '../configs/locale/locale.config';
import { Availability } from '../configs/locale/locale.type';
import { Setting } from '../models/Setting.model';
import { UserStore } from '../models/User.model';
import { getDefaultLang } from '../utils/helper/helper.util';

// #region INTERFACES
export type AppStore = {
  user: UserStore | null;
  setting: Setting;
};

export type AppAction = Readonly<{
  resetUser?: () => void;
  updateUser?: (_user: UserStore) => void;
  changeLanguage?: (_language: Availability) => void;
  translate?: (_key: string, unique?: string) => string;
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
    currentLanguage: getDefaultLang(),
  },
} satisfies AppStore;

export const [appStore, setAppStore] = createStore<AppStore>(initialState);

// #region CONTEXT
export const AppContext = createContext<[AppStore, AppAction]>([initialState, {}]);
export const useAppContext = () => useContext(AppContext);

export const AppProvider: ParentComponent = (props) => {
  const [store, setStore] = createStore<AppStore>(initialState);

  const action = {
    resetUser: () => setStore('user', null),
    updateUser: (_user) => setStore('user', _user),
    changeLanguage: (_language) => setStore('setting', 'currentLanguage', _language),
    translate: (key: string, unique?: string) => {
      const langMap =
        localeConfig.find((locale) => (unique ? locale.unique === unique : locale.en === key)) ??
        localeConfig.find((locale) => locale.en === key);

      if (langMap && langMap[store.setting.currentLanguage] !== null) {
        // return what's found in the `localeConfig`
        return langMap[store.setting.currentLanguage];
      }

      // return back passed `key`
      return key;
    },
  } satisfies AppAction;

  return <AppContext.Provider value={[store, action]}>{props.children}</AppContext.Provider>;
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
