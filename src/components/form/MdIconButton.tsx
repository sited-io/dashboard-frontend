import "@material/web/icon/icon";
import "@material/web/iconbutton/icon-button";

import { ComponentProps, ParentProps, splitProps } from "solid-js";

type Props = ComponentProps<"button"> & {
  readonly href?: string;
} & ParentProps;

export function MdIconButton(props: Props) {
  const [local, others] = splitProps(props, ["children"]);

  return <md-icon-button {...others}>{local.children}</md-icon-button>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-icon-button": Omit<Props, "icon">;
    }
  }
}
