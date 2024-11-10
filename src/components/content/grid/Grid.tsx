import { ComponentProps, splitProps } from "solid-js";

import styles from "./Grid.module.scss";

type Props = {} & ComponentProps<"div">;

export function Grid(props: Props) {
  const [, others] = splitProps(props, []);

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
