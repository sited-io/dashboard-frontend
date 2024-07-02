import _ from "lodash";
import { Show } from "solid-js";

import styles from "./ProgressBar.module.scss";

type Props = {
  readonly total?: number;
  readonly current?: () => number | undefined;
};

export function ProgressBar(props: Props) {
  return (
    <Show
      when={!_.isNil(props.total) && !_.isNil(props.current?.())}
      fallback={<progress class={styles.ProgressBar} />}
    >
      <progress
        class={styles.ProgressBar}
        max={props.total}
        value={props.current!()}
      />
    </Show>
  );
}
