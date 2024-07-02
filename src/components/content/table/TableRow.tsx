import { ComponentProps, Show, splitProps } from "solid-js";

import styles from "./Table.module.scss";
import { createSortable } from "@thisbeyond/solid-dnd";
import _ from "lodash";

type Sortable = ReturnType<typeof createSortable>;

type Props = {
  sortable?: Sortable;
} & ComponentProps<"div">;

export function TableRow(props: Props) {
  const [extra, others] = splitProps(props, ["children", "sortable"]);
  const { sortable } = extra;

  return (
    <Show
      when={!_.isNil(sortable)}
      fallback={
        <div {...others} classList={{ [styles.TableRow]: true }}>
          {extra.children}
        </div>
      }
    >
      <div use:sortable {...others} classList={{ [styles.TableRow]: true }}>
        {extra.children}
      </div>
    </Show>
  );
}
