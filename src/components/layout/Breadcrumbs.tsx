import { For, Show } from "solid-js";
import styles from "./Breadcrumbs.module.scss";
import { A } from "@solidjs/router";
import { MdIcon } from "../assets/MdIcon";
import { Font } from "../content/Font";
import _ from "lodash";

type Breadcrumb = {
  label: string | undefined;
  path?: string | undefined;
};

type Props = {
  paths: Breadcrumb[];
};

export function Breadcrumbs(props: Props) {
  return (
    <div class={styles.Breadcrumbs}>
      <For each={props.paths}>
        {({ label, path }) => (
          <Show
            when={!_.isNil(path)}
            fallback={
              <p class={styles.Label}>
                <Font type="detail">{_.truncate(label, { length: 20 })}</Font>
              </p>
            }
          >
            <A class={styles.Link} href={path!}>
              <Font strong type="detail">
                {_.truncate(label, { length: 20 })}
              </Font>
            </A>
            <MdIcon class={styles.Icon} icon="chevron_right" />
          </Show>
        )}
      </For>
    </div>
  );
}
