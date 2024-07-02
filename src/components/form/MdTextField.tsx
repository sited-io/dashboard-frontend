import "@material/web/textfield/filled-text-field";
import "@material/web/textfield/outlined-text-field";

import { ComponentProps, Show, JSX as SolidJSX, splitProps } from "solid-js";

import styles from "./Form.module.scss";

type Props = ComponentProps<"input"> & {
  readonly label?: string | undefined;
  readonly filled?: boolean;
  readonly prefixText?: string | undefined;
  readonly rows?: number | undefined;
  readonly cols?: number | undefined;
  readonly onValue: (value: any) => void;
  readonly error?: boolean | undefined;
  readonly errorText?: string | string[] | undefined;
  readonly supportingText?: string | string[] | undefined;
  readonly children?: SolidJSX.Element | undefined;
};

export function MdTextField(props: Props) {
  const [local, others] = splitProps(props, [
    "class",
    "value",
    "onValue",
    "prefixText",
    "errorText",
    "supportingText",
  ]);

  function innerProps() {
    return {
      ...others,
      value: local.value || "",
      class: local.class || styles.DefaultField,
      onInput: (event) => local.onValue(event.target.value),
      "prefix-text": local.prefixText,
      "error-text": local.errorText,
      "supporting-text": local.supportingText,
    } as MdTextFieldProps;
  }

  return (
    <Show
      when={props.filled}
      fallback={<md-outlined-text-field {...innerProps()} />}
    >
      <md-filled-text-field {...innerProps()} />
    </Show>
  );
}

type MdTextFieldProps = {} & ComponentProps<"input">;

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-outlined-text-field": MdTextFieldProps;
      "md-filled-text-field": MdTextFieldProps;
    }
  }
}
