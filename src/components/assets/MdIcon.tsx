import "@material/web/icon/icon";

import { ComponentProps, splitProps } from "solid-js";

type Props = ComponentProps<"i"> & {
  readonly icon: string;
  readonly slot?: string | undefined;
};

export function MdIcon(props: Props) {
  const [local, others] = splitProps(props, ["icon"]);

  return <md-icon {...others}>{local.icon}</md-icon>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-icon": Omit<Props, "icon">;
    }
  }
}
