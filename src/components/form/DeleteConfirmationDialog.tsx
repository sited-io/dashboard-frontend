import { Trans } from "@mbarzda/solid-i18next";
import { JSX, Show } from "solid-js";
import _ from "lodash";

import { TKEYS } from "../../locales";
import { MdDialog } from "../layout/MdDialog";
import { Font } from "../content/Font";
import { MdButton } from "./MdButton";

type Props = {
  readonly show: boolean | undefined;
  readonly children?: JSX.Element | undefined;
  readonly item?: string;
  readonly itemName?: string | undefined;
  readonly onConfirmation: (() => void) | (() => Promise<void>);
  readonly onCancel: () => void;
};

export function DeleteConfirmationDialog(props: Props) {
  return (
    <MdDialog open={Boolean(props.show)} onClose={props.onCancel}>
      <div slot="headline">
        <Trans key={TKEYS.form.action["Confirm-Deletion?"]} />
      </div>

      <div slot="content">
        <Show when={!_.isNil(props.item) && !_.isNil(props.itemName)}>
          <Font
            type="body"
            key={TKEYS.form.action["Are-you-sure-you-want-to-delete-the-item"]}
            options={{
              item: props.item,
              name: props.itemName,
            }}
          />
        </Show>

        <Show when={!_.isNil(props.children)}>{props.children}</Show>
      </div>

      <div slot="actions">
        <MdButton type="text" onClick={props.onCancel}>
          <Trans key={TKEYS.form.action.Cancel} />
        </MdButton>

        <MdButton type="filled" danger onClick={props.onConfirmation}>
          <Trans key={TKEYS.form.action.Delete} />
        </MdButton>
      </div>
    </MdDialog>
  );
}
