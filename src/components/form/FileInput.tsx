import _ from "lodash";
import { ComponentProps, JSX, createEffect, splitProps } from "solid-js";

type Props = {
  readonly onValue: (_value: FileList | null) => void;
  readonly multiple?: boolean | undefined;
  readonly children?: JSX.Element;
  readonly image?: boolean | undefined;
} & ComponentProps<"input">;

export function FileInput(props: Props) {
  const [extra, others] = splitProps(props, ["onValue", "image"]);

  return (
    <input
      {...others}
      type="file"
      accept={extra.image ? "image/*" : "*"}
      onInput={(event) => extra.onValue(event.currentTarget.files)}
    />
  );
}
