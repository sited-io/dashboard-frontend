import { ParentProps, Show } from "solid-js";

import styles from "./SectionTitle.module.scss";
import { Font } from "../content/Font";

type Props = {
  title?: string;
  key?: string;
  type?: "headline" | "display" | "title" | "label" | "body" | "detail";
} & ParentProps;

export function SectionTitle(props: Props) {
  return (
    <div class={styles.SectionTitle}>
      <Show
        when={props.key}
        fallback={<Font type={props.type || "headline"}>{props.title}</Font>}
      >
        <Font type={props.type || "headline"} key={props.key} />
      </Show>

      <Show when={props.children}>
        <div>{props.children}</div>
      </Show>
    </div>
  );
}
