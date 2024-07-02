import "@material/web/button/elevated-button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button";
import "@material/web/button/text-button";

import { ComponentProps, Match, Show, JSX as SolidJSX, Switch } from "solid-js";

import { MdIcon } from "../assets/MdIcon";
import styles from "./MdButton.module.scss";

type Props = {
  readonly type?: "elevated" | "filled" | "filled-tonal" | "outlined" | "text";
  readonly href?: string | undefined;
  readonly submit?: boolean | undefined;
  readonly disabled?: boolean | undefined;
  readonly danger?: boolean | undefined;
  readonly square?: boolean | undefined;
  readonly wide?: boolean | undefined;
  readonly small?: boolean | undefined;
  readonly trailingIcon?: boolean | undefined;
  readonly icon?: string | undefined;
  readonly onClick?: (_event: any) => void;
  readonly children: SolidJSX.Element;
};

export function MdButton(props: Props) {
  function innerProps() {
    return {
      classList: {
        [styles.Danger]: Boolean(props.danger),
        [styles.Square]: Boolean(props.square),
        [styles.Wide]: Boolean(props.wide),
        [styles.Small]: Boolean(props.small),
      },
      type: props.submit ? "submit" : "button",
      disabled: Boolean(props.disabled),
      "trailing-icon": props.trailingIcon,
      href: props.href,
      onClick: props.onClick,
    } as MdButtonProps;
  }

  function innerElements() {
    return (
      <>
        {props.children}
        <Show when={props.icon}>
          <MdIcon slot="icon" icon={props.icon!} />
        </Show>
      </>
    );
  }

  return (
    <Switch
      fallback={
        <md-filled-button {...innerProps()}>{innerElements()}</md-filled-button>
      }
    >
      <Match when={props.type === "elevated"}>
        <md-elevated-button {...innerProps()}>
          {innerElements()}
        </md-elevated-button>
      </Match>
      <Match when={props.type === "filled-tonal"}>
        <md-filled-tonal-button {...innerProps()}>
          {innerElements()}
        </md-filled-tonal-button>
      </Match>
      <Match when={props.type === "outlined"}>
        <md-outlined-button {...innerProps()}>
          {innerElements()}
        </md-outlined-button>
      </Match>
      <Match when={props.type === "text"}>
        <md-text-button {...innerProps()}>{innerElements()}</md-text-button>
      </Match>
    </Switch>
  );
}

type MdButtonProps = {
  href?: string | undefined;
  submit?: string | undefined;
} & ComponentProps<"button">;

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-elevated-button": MdButtonProps;
      "md-filled-button": MdButtonProps;
      "md-filled-tonal-button": MdButtonProps;
      "md-outlined-button": MdButtonProps;
      "md-text-button": MdButtonProps;
    }
  }
}
