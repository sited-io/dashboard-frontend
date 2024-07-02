import "@material/web/checkbox/checkbox";

import { ComponentProps, Show, JSX as SolidJSX, splitProps } from "solid-js";

import styles from "./MdCheckbox.module.scss";
import { Font } from "../content/Font";

type Props = ComponentProps<"input"> & {
  readonly label?: string | undefined;
  readonly onValue?: (_value: boolean) => void;
  readonly children?: SolidJSX.Element | undefined;
};

export function MdCheckbox(props: Props) {
  const [local, other] = splitProps(props, ["label", "onValue", "children"]);

  return (
    <>
      <label class={other.class || styles.MdCheckBox}>
        <Font type="label" inline>
          <Show when={Boolean(local.label)} fallback={local.children}>
            {local.label}
          </Show>
        </Font>

        <md-checkbox
          {...other}
          aria-label={local.label}
          touch-target="wrapper"
          onChange={({ target }) => local.onValue?.(target.checked)}
        />
      </label>
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-checkbox": Props;
    }
  }
}
