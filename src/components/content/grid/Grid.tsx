import { ComponentProps, ParentProps, splitProps } from "solid-js";

import styles from "./Grid.module.scss";

type Props = {} & ComponentProps<"div">;

export function Grid(props: Props) {
  const [extra, others] = splitProps(props, []);

  return (
    <>
      <div
        {...others}
        classList={{
          [styles.Grid]: true,
        }}
      />
    </>
  );
}
