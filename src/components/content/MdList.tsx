import "@material/web/list/list";
import { ComponentProps, JSX as SolidJSX } from "solid-js";

type Props = {
  class?: string | undefined;
  children?: SolidJSX.Element;
};

export function MdList(props: Props) {
  return <md-list class={props.class}>{props.children}</md-list>;
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-list": ComponentProps<"div">;
    }
  }
}
