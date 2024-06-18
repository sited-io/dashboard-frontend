import { JSX } from "solid-js";

import { MdIconButton } from "~/components/form/MdIconButton";
import { clickOutside } from "~/directives/click-outside";
import styles from "./NavigationSlider.module.scss";
import { MdIcon } from "~/components/assets/MdIcon";
import _ from "lodash";

false && clickOutside;

type Props = {
  readonly children?: JSX.Element | undefined;
  readonly show: boolean;
  readonly onClose: () => void;
};

export function NavigationSlider(props: Props) {
  return (
    <>
      <div
        class={styles.NavigationSlider}
        classList={{
          [styles.SlideIn]: props.show,
        }}
        use:clickOutside={props.onClose}
      >
        <div class={styles.Menu}>
          <MdIconButton onClick={props.onClose}>
            <MdIcon icon="close" />
          </MdIconButton>
        </div>

        <div class={styles.Border} />

        <div class={styles.Links}>{props.children}</div>
      </div>
    </>
  );
}
