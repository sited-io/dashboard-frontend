import { JSX, splitProps } from "solid-js";

import styles from "./Section.module.scss";

type Props = JSX.HTMLAttributes<HTMLDivElement> & {
  readonly bordered?: boolean | undefined;
  readonly danger?: boolean | undefined;
  readonly warn?: boolean | undefined;
  readonly active?: boolean | undefined;
  readonly flat?: boolean | undefined;
  readonly padded?: boolean | undefined;
  readonly narrow?: boolean | undefined;
  readonly centered?: boolean | undefined;
};

export function Section(props: Props) {
  const [local, other] = splitProps(props, [
    "bordered",
    "danger",
    "warn",
    "active",
    "flat",
    "padded",
    "narrow",
    "centered",
    "children",
  ]);

  return (
    <div
      {...other}
      classList={{
        [styles.Section]: true,
        [styles.Bordered]: Boolean(local.bordered),
        [styles.Active]: Boolean(local.active),
        [styles.Danger]: Boolean(local.danger),
        [styles.Warn]: Boolean(local.warn),
        [styles.Flat]: Boolean(local.flat),
        [styles.Padded]: Boolean(local.padded),
        [styles.Narrow]: Boolean(local.narrow),
        [styles.Centered]: Boolean(local.centered),
      }}
    >
      {local.children}
    </div>
  );
}
