"use client";

import { useId } from "react";
import {useSliceFoo, useSliceFooImmer} from "@/zustand-demo/store-slice-foo-middleware";
import styles from "./bear.module.css";

export const BearComponentSlice = () => {
  const bears = useSliceFoo((state) => state.bears);
  const addBear = useSliceFoo((state) => state.addBear);

  const id1 = useId();
  const id2 = useId();

  console.count("BearComponentSlice render");
  console.log('useSliceFoo ',useSliceFoo.foo);
  console.log('useSliceFooImmer ',useSliceFooImmer.foo);
  return (
    <div className={styles.container}>
      <h1>BearComponent</h1>
      <label htmlFor={id1}>bears</label>
      <p id={id1}>{bears}</p>

      <button
        onClick={() => {
          addBear();
        }}
      >
        addBear
      </button>
    </div>
  );
};
