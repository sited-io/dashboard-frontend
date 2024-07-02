import "@material/web/select/_filled-select.scss";
import "@material/web/select/_outlined-select.scss";
import "@material/web/select/filled-select";
import "@material/web/select/outlined-select";
import _ from "lodash";

import {
  ComponentProps,
  For,
  Match,
  Show,
  JSX as SolidJSX,
  Switch,
  splitProps,
} from "solid-js";
import { MdSelectOption } from "./MdSelectOption";

export type SelectKey = string | number | boolean;

export type Option = {
  key: SelectKey;
  name: string;
};

type Props = Omit<ComponentProps<"select">, "onChange"> & {
  readonly type: "outlined" | "filled";
  readonly label?: string | undefined;
  readonly menuPositioning?: "absolute" | "fixed" | undefined;
  readonly children?: SolidJSX.Element;
  readonly options?: () => Option[] | undefined;
  readonly selected?: () => SelectKey | Option | undefined;
  readonly onChange?: (_value: string) => void;
};

export function MdSelect(props: Props) {
  const [local, other] = splitProps(props, [
    "type",
    "menuPositioning",
    "children",
    "options",
    "selected",
    "onChange",
  ]);

  function isSelected(currentOption: SelectKey | Option) {
    const selected = local.selected?.();
    if (_.isNil(selected)) {
      return false;
    }

    let currentKey: SelectKey;
    let selectedKey: SelectKey;

    if (
      _.isString(currentOption) ||
      _.isNumber(currentOption) ||
      _.isBoolean(currentOption)
    ) {
      currentKey = currentOption;
    } else {
      currentKey = currentOption.key;
    }

    if (_.isString(selected) || _.isNumber(selected) || _.isBoolean(selected)) {
      selectedKey = selected;
    } else {
      selectedKey = selected.key;
    }

    return currentKey === selectedKey;
  }

  return (
    <>
      <Switch>
        <Match when={local.type === "outlined"}>
          <md-outlined-select
            {...other}
            menu-positioning={local.menuPositioning}
            onChange={(event) => local.onChange?.(event.target.value)}
          >
            <Show when={_.isNil(local.children)} fallback={local.children}>
              <For each={local.options?.()}>
                {(option) => (
                  <MdSelectOption
                    selected={isSelected(option)}
                    value={option.key.toString()}
                  >
                    <div slot="headline">{option.name}</div>
                  </MdSelectOption>
                )}
              </For>
            </Show>
          </md-outlined-select>
        </Match>
        <Match when={local.type === "filled"}>
          <md-filled-select
            {...other}
            menu-positioning={local.menuPositioning}
            onChange={(event) => local.onChange?.(event.target.value)}
          >
            <Show when={_.isNil(local.children)} fallback={local.children}>
              <For each={local.options?.()}>
                {(option) => (
                  <MdSelectOption
                    selected={isSelected(option)}
                    value={option.key.toString()}
                  >
                    <div slot="headline">{option.name}</div>
                  </MdSelectOption>
                )}
              </For>
            </Show>
          </md-filled-select>
        </Match>
      </Switch>
    </>
  );
}

declare module "solid-js" {
  namespace JSX {
    interface IntrinsicElements {
      "md-outlined-select": ComponentProps<"select"> & {};
      "md-filled-select": ComponentProps<"select"> & {};
    }
  }
}
