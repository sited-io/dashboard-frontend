import { Show, createSignal } from "solid-js";

import { TKEYS } from "~/locales";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { Font } from "../content/Font";
import { EditVisibilityDialog } from "./EditVisibilityDialog";
import { EditableField } from "./EditableField";

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditVisibility(props: Props) {
  const [showEditVisibility, setShowEditVisibility] = createSignal(false);

  function handleShowEditVisibility() {
    setShowEditVisibility(true);
  }

  function handleCloseEditVisibility() {
    setShowEditVisibility(false);
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <EditableField onClick={handleShowEditVisibility}>
        <Show
          when={props.offer.isActive}
          fallback={
            <Font type="body" key={TKEYS.offers["is-not-active-info"]} />
          }
        >
          <Font type="body" key={TKEYS.offers["is-active-info"]} />
        </Show>
      </EditableField>

      <EditVisibilityDialog
        show={showEditVisibility()}
        offer={props.offer}
        onClose={handleCloseEditVisibility}
        onUpdate={handleUpdate}
      />
    </>
  );
}
