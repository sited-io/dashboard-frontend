import { ComponentProps, Show, splitProps } from "solid-js";

import { MdIcon } from "../assets/MdIcon";
import styles from "./EditableField.module.scss";

type Props = {
  readonly openInNew?: boolean | undefined;
} & ComponentProps<"div">;

export function EditableField(props: Props) {
  const [extra, others] = splitProps(props, ["children", "openInNew"]);

  return (
    <div {...others} classList={{ [styles.EditableField]: true }}>
      <div class={styles.Content}>{extra.children}</div>

      <Show
        when={Boolean(extra.openInNew)}
        fallback={<MdIcon class={styles.EditIcon} icon="edit" />}
      >
        <MdIcon class={styles.EditIcon} icon="open_in_new" />
      </Show>
    </div>
  );
}
