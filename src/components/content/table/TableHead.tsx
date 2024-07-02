import { ComponentProps, ParentProps, splitProps } from "solid-js";
import styles from "./Table.module.scss";

type Props = ComponentProps<"div"> & ParentProps;

export function TableHead(props: Props) {
  const [extra, other] = splitProps(props, ["children"]);
  return (
    <div
      {...other}
      classList={{
        [styles.TableHead]: true,
      }}
    >
      {extra.children}
    </div>
  );
}
