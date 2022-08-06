import { createSignal, JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { User } from '../models/User.model';

// #region INTERFACES
export type AppStore = {
  user: User | null;
};

type AppProviderProps = {
  children: JSX.Element;
};
// #endregion

export const [appSignal, setAppSignal] = createSignal<AppStore>({
  user: null,
});

export const [appStore, setAppStore] = createStore<AppStore>({
  user: null,
});

// export const AppContext = createContext();

// export const AppProvider: Component<AppProviderProps> = (props) => {
//   const [appStore, setAppStore] = createStore<AppStore>({
//     user: null,
//   });
//   const [appSignal, setAppSignal] = createSignal<AppStore>({
//     user: null,
//   });

//   return (
//     <AppContext.Provider value={[appStore, setAppStore]}>
//       {props.children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () =>
//   useContext(AppContext) as [Accessor<AppStore>, Setter<AppStore>];
