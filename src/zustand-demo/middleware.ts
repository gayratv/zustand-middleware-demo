import {
  StateCreator,
  StoreMutatorIdentifier,
  Mutate,
  StoreApi,
} from "zustand";


// Replace middlewareOptions with the name of what you want to see when creating a store
//
// the field name here should be exactly the same as the field name in line 35.
// --->--->--->--->--->--->--->--->--->--->
// don't forget to change export const foo at the end

const MiddlewareField = "foo" as const;

type Write<T extends object, U extends object> = Omit<T, keyof U> & U;

type Cast<S, U> = S extends U ? S : U;

type MiddlewareConstructor = <
  T,
  A,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  storeInitializer: StateCreator<T, [...Mps, [typeof MiddlewareField, A]], Mcs>,
  middlewareOptions: A,
) => StateCreator<T, Mps, [[typeof MiddlewareField, A], ...Mcs]>;

declare module "zustand" {
  interface StoreMutators<S, A> {
    // Here you should write the name of the field exactly as in the MiddlewareField constant
    // --->--->--->--->--->--->--->--->--->--->
    [MiddlewareField]: Write<Cast<S, object>, { foo: A }>;
  }
}

type MiddlewareImplementation = <T, A>(
  storeInitializer: StateCreator<T, [], []>,
  middlewareOptions: A,
) => StateCreator<T, [], []>;

const middlewareImplementation: MiddlewareImplementation =
  (storeInitializer, middlewareOptions) => (set, get, _store) => {
    // just typing to add a MiddlewareField
    const store = _store as Mutate<
      StoreApi<ReturnType<typeof storeInitializer>>,
      [[typeof MiddlewareField, typeof middlewareOptions]]
    >;

    store[MiddlewareField] = middlewareOptions;

    return storeInitializer(set, get, _store);
  };

export const foo = middlewareImplementation as unknown as MiddlewareConstructor;
