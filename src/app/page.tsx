import { BearComponentSlice } from "@/zustand-demo/bear-slice";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>

      <BearComponentSlice />
    </main>
  );
}
