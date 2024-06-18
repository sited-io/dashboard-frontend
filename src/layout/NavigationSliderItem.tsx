import { JSX } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { Font } from "../components/content/Font";
import styles from "./NavigationSliderItem.module.scss";

type Props = {
  readonly type: "body" | "label";
  readonly icon?: string | undefined;
  readonly key?: string | undefined;
  readonly label?: string | undefined;
  readonly onClick?: () => void;
  readonly active?: boolean | undefined;
  readonly danger?: boolean | undefined;
  readonly children?: JSX.Element | undefined;
};

export function NavigationSliderItem(props: Props) {
  const icon = props.icon || "article";

  return (
    <>
      <button
        class={styles.NavigationSliderItem}
        classList={{
          [styles.Active]: Boolean(props.active),
          [styles.Danger]: Boolean(props.danger),
        }}
        onClick={props.onClick}
      >
        <div class={styles.Inner}>
          <MdIcon
            class={styles.Icon}
            classList={{
              [styles.Active]: Boolean(props.active),
              [styles.Danger]: Boolean(props.danger),
            }}
            icon={icon!}
          />

          <Font
            class={styles.Label}
            classList={{
              [styles.Active]: Boolean(props.active),
              [styles.Danger]: Boolean(props.danger),
            }}
            type={props.type}
            key={props.key}
          >
            {props.label}
          </Font>
        </div>
      </button>
    </>
  );
}
