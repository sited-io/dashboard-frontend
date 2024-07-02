import { ParentProps } from "solid-js";

import styles from "./Table.module.scss";

type Props = {
  cols: number;
} & ParentProps;

export function Table(props: Props) {
  return (
    <div
      class={styles.Table}
      style={{
        "grid-template-columns": "repeat(" + props.cols + ",auto)",
      }}
    >
      {props.children}
    </div>
  );
}
