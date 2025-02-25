import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S extends UseBoundStore<StoreApi<object>>> = S extends {
  getState: () => infer T;
}
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <
  T extends object,
  S extends UseBoundStore<StoreApi<T>>,
>(
  _store: S
) => {
  const store = _store as WithSelectors<S>;
  store.use = {} as { [K in keyof T]: () => T[K] };

  for (const k of Object.keys(store.getState()) as Array<keyof T>) {
    store.use[k] = () => store((s) => s[k]);
  }

  return store;
};
