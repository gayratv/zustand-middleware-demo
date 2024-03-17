// https://docs.pmnd.rs/zustand/guides/typescript#slices-pattern
// Slices pattern

import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import {foo} from "@/zustand-demo/middleware";

interface BearSlice {
  bears: number;
  addBear: () => void;
}

const createBearSlice: StateCreator<
  BearSlice, // T
  [["zustand/immer", never], ["foo", string]],
  [],
  BearSlice
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 }), false),
});

export const useSliceFooImmer = create<BearSlice>()(
  immer(
    foo(
      (...a) => ({
        ...createBearSlice(...a),
      }),
      "foo-hello immer",
    ),
  ),
);

export const useSliceFoo = create<BearSlice>()(
  foo(
    (...a) => ({
      ...createBearSlice(...a),
    }),
    "foo-hello2",
  ),
);

console.log(useSliceFoo.foo);
console.log(useSliceFooImmer.foo);
