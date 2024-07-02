import { Trans } from "@mbarzda/solid-i18next";

import { TKEYS } from "../../locales";
import { MdLoading } from "../content/MdLoading";
import styles from "./Redirect.module.scss";

type Props = {};

export function Redirect(props: Props) {
  return (
    <div class={styles.Redirect}>
      <div class={styles.Container}>
        <div class={styles.Header}>
          {/* <Show when={!props.noLogo}>
            <A href={indexUrl().toString()}>
              <MainLogo class={styles.Logo} />
            </A>
          </Show> */}
        </div>

        <div class={styles.Loading}>
          <MdLoading />
        </div>

        <div class={styles.Footer}>
          <span class={styles.Headline}>
            <Trans key={TKEYS.navigation.redirecting} />
            ...
          </span>
        </div>
      </div>
    </div>
  );
}
