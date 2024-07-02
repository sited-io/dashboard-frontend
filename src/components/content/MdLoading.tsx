import "@material/web/progress/circular-progress";

import { ComponentProps } from "solid-js";

type Props = {} & ComponentProps<"progress">;

export function MdLoading(props: Props) {
  return (
    <md-circular-progress
      {...props}
      indeterminate
      style={{
        "--md-circular-progress-size": "32px",
      }}
    />
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-circular-progress": ComponentProps<"progress"> & {
        indeterminate?: boolean | undefined;
      };
    }
  }
}
