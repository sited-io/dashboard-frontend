import "@material/web/select/select-option";

import { ComponentProps, splitProps } from "solid-js";

type Props = ComponentProps<"option"> & {};

export function MdSelectOption(props: Props) {
  const [local, other] = splitProps(props, ["children"]);

  return <md-select-option {...other}>{local.children}</md-select-option>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-select-option": Props;
    }
  }
}
