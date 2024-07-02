import { ParentProps } from "solid-js";

import styles from "./Grid.module.scss";

type Props = {} & ParentProps;

export function GridItem(props: Props) {
  return (
    <>
      <div class={styles.GridItem}>{props.children}</div>
    </>
  );
}
