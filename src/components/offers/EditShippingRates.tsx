import { Trans } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import { Show, createResource, createSignal } from "solid-js";
import { TKEYS } from "~/locales";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { EditShippingRatesDialog } from "./EditShippingRatesDialog";
import styles from "./EditShippingRates.module.scss";
import { EditableField } from "./EditableField";
import { Font } from "../content/Font";
import { shippingRateService } from "~/services/commerce";
import _ from "lodash";
import { ResourceBoundary } from "../layout/ResourceBoundary";
import { Price } from "../content/Price";

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditShippingRates(props: Props) {
  const [shippingRate, { refetch }] = createResource(
    () => props.offer.offerId,
    fetchShippingRate
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
      // console.error(err);
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
