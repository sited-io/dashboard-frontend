import { MdLoading } from "../content/MdLoading";
import styles from "./ContentLoading.module.scss";

export function ContentLoading() {
  return (
    <div class={styles.ContentLoading}>
      <MdLoading />
    </div>
  );
}
