import _ from "lodash";
import { ComponentProps, JSX, Show, splitProps } from "solid-js";

import styles from "./Form.module.scss";

type Props = {
  readonly actions?: JSX.Element;
} & ComponentProps<"form">;

export function Form(props: Props) {
  const [extra, others] = splitProps(props, ["children", "actions"]);

  return (
    <form {...others} classList={{ [styles.Form]: true }}>
      {extra.children}
      <Show when={!_.isEmpty(extra.actions)}>
        <div class={styles.Actions}>{extra.actions}</div>
      </Show>
    </form>
  );
}
