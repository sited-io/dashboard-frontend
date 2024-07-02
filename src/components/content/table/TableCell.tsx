import { ParentProps } from "solid-js";

import styles from "./Table.module.scss";

type Props = {
  header?: boolean;
  justifyEnd?: boolean;
} & ParentProps;

export function TableCell(props: Props) {
  return (
    <div
      class={styles.TableCell}
      classList={{
        [styles.Header]: Boolean(props.header),
        [styles.JustifyEnd]: Boolean(props.justifyEnd),
      }}
    >
      {props.children}
    </div>
  );
}
