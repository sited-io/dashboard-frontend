import { createSignal } from "solid-js";

import { clickOutside } from "~/directives/click-outside";
import { TKEYS } from "~/locales";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { Font } from "../content/Font";
import { EditableField } from "./EditableField";
import { EditDetailsDialog } from "./EditDetailsDialog";

false && clickOutside; // eslint-disable-line

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditDetails(props: Props) {
  const [showEditName, setShowEditName] = createSignal(false);

  function handleShowEditName() {
    setShowEditName(true);
  }

  function handleCloseEditName() {
    setShowEditName(false);
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <EditableField onClick={handleShowEditName}>
        <Font type="title">{props.offer.name}</Font>
        <Font
          active
          type="label"
          key={TKEYS.offers["offer-type"][props.offer.type]}
        />
      </EditableField>

      <EditDetailsDialog
        show={showEditName()}
        offer={props.offer}
        onUpdate={handleUpdate}
        onClose={handleCloseEditName}
      />
    </>
  );
}
