import "@material/web/button/elevated-button";
import "@material/web/button/filled-button";
import "@material/web/button/filled-tonal-button";
import "@material/web/button/outlined-button";
import "@material/web/button/text-button";

import { ComponentProps, Match, JSX as SolidJSX, Switch } from "solid-js";

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
  readonly onClick?: (_event: any) => void;
  readonly children: SolidJSX.Element;
};

export function MdButton(props: Props) {
  const classList = {
    [styles.Danger]: Boolean(props.danger),
    [styles.Square]: Boolean(props.square),
    [styles.Wide]: Boolean(props.wide),
    [styles.Small]: Boolean(props.small),
  };

  return (
    <Switch
      fallback={
        <md-filled-button
          classList={classList}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={props.onClick}
        >
          {props.children}
        </md-filled-button>
      }
    >
      <Match when={props.type === "elevated"}>
        <md-elevated-button
          classList={classList}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-elevated-button>
      </Match>
      <Match when={props.type === "filled"}>
        <md-filled-button
          classList={classList}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-filled-button>
      </Match>
      <Match when={props.type === "filled-tonal"}>
        <md-filled-tonal-button
          classList={classList}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-filled-tonal-button>
      </Match>
      <Match when={props.type === "outlined"}>
        <md-outlined-button
          classList={classList}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-outlined-button>
      </Match>
      <Match when={props.type === "text"}>
        <md-text-button
          classList={classList}
          type={props.submit ? "submit" : "button"}
          disabled={Boolean(props.disabled)}
          trailing-icon={props.trailingIcon}
          href={props.href}
          onClick={(event) => props.onClick?.(event)}
        >
          {props.children}
        </md-text-button>
      </Match>
    </Switch>
  );
}

type MdButtonProps = {
  href?: string | undefined;
  submit?: string | undefined;
};

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-elevated-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-filled-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-filled-tonal-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-outlined-button": ComponentProps<"button"> & MdButtonProps & {};
      "md-text-button": ComponentProps<"button"> & MdButtonProps & {};
    }
  }
}
