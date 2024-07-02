import _ from "lodash";
import { Show, createSignal } from "solid-js";

import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { EditPriceDialog } from "./EditPriceDialog";
import { EditableField } from "./EditableField";
import { OfferPrice } from "./OfferPrice";
import { Font } from "../content/Font";
import { TKEYS } from "~/locales";

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditPrice(props: Props) {
  const [showEditPrice, setShowEditPrice] = createSignal(false);

  function handleShowEditPrice() {
    setShowEditPrice(true);
  }

  function handleCloseEditPrice() {
    setShowEditPrice(false);
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <EditableField onClick={handleShowEditPrice}>
        <Font type="label" key={TKEYS.price.labels.price} />

        <Show
          when={!_.isNil(props.offer.price)}
          fallback={<div>No Price set</div>}
        >
          <OfferPrice offer={props.offer} />
        </Show>
      </EditableField>

      <EditPriceDialog
        show={showEditPrice()}
        offer={props.offer}
        onClose={handleCloseEditPrice}
        onUpdate={handleUpdate}
      />
    </>
  );
}
