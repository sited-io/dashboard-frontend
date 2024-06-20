import "@material/web/list/list-item";
import { ComponentProps, JSX as SolidJSX, splitProps } from "solid-js";

type Props = {
  readonly class?: string | undefined;
  readonly disabled?: boolean | undefined;
  readonly type?: "text" | "link" | "button" | undefined;
  readonly href?: string | undefined;
  readonly target?: string | undefined;
  readonly children?: SolidJSX.Element;
  readonly onClick?: () => void;
};

export function MdListItem(props: Props) {
  const [local, others] = splitProps(props, ["children"]);

  return <md-list-item {...others}>{local.children}</md-list-item>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-list-item": ComponentProps<"div">;
    }
  }
}
