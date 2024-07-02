import { For } from "solid-js";
import styles from "./Breadcrumbs.module.scss";
import { A } from "@solidjs/router";
import { MdIcon } from "../assets/MdIcon";
import { Font } from "../content/Font";
import _ from "lodash";

type Breadcrumb = {
  label: string;
  path: string;
};

type Props = {
  paths: Breadcrumb[];
};

export function Breadcrumbs(props: Props) {
  return (
    <div class={styles.Breadcrumbs}>
      <For each={props.paths}>
        {({ label, path }) => (
          <>
            <A class={styles.Link} href={path}>
              <Font strong type="detail">
                {_.truncate(label, { length: 20 })}
              </Font>
            </A>
            <MdIcon class={styles.Icon} icon="chevron_right" />
          </>
        )}
      </For>
    </div>
  );
}
