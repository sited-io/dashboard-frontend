import _ from "lodash";
import { Show, createResource, createSignal } from "solid-js";

import { TKEYS } from "~/locales";
import { shippingRateService } from "~/services/commerce";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { Font } from "../content/Font";
import { Price } from "../content/Price";
import { EditShippingRatesDialog } from "./EditShippingRatesDialog";
import { EditableField } from "./EditableField";

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditShippingRates(props: Props) {
  const [shippingRate] = createResource(
    () => props.offer.offerId,
    fetchShippingRate,
  );

  async function fetchShippingRate(offerId: string) {
    try {
      const shippingRate = await shippingRateService.getShippingRate({
        offerId,
      });

      if (!_.isNil(shippingRate)) {
        return shippingRate;
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  const [showEditShippingRates, setShowEditShippingRates] = createSignal(false);

  function handleShowEditShippingRates() {
    setShowEditShippingRates(true);
  }

  function handleCloseEditShippingRates() {
    setShowEditShippingRates(false);
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <EditableField onClick={handleShowEditShippingRates}>
        <Font type="label" key={TKEYS["shipping-rate"]["shipping-rate"]} />
        <Show when={!_.isNil(shippingRate())}>
          <div style={{ "text-align": "end" }}>
            <Price
              unitAmount={shippingRate()?.amount}
              currency={shippingRate()?.currency}
              small
            />
          </div>
        </Show>
      </EditableField>

      <Show when={shippingRate.state === "ready"}>
        <EditShippingRatesDialog
          show={showEditShippingRates()}
          offer={props.offer}
          shippingRate={shippingRate()}
          onClose={handleCloseEditShippingRates}
          onUpdate={handleUpdate}
        />
      </Show>
    </>
  );
}
