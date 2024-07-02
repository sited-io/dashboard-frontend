import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";

import { Font } from "~/components/content/Font";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { MdSelect } from "~/components/form/MdSelect";
import { PriceField } from "~/components/form/PriceField";
import { MdDialog } from "~/components/layout/MdDialog";
import { getEnumVariants } from "~/lib/request-helpers";
import { TKEYS } from "~/locales";
import { shippingRateService } from "~/services/commerce";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { Currency } from "~/services/sited_io/commerce/v1/price_pb";
import {
  PutShippingRateRequest,
  ShippingRateResponse,
} from "~/services/sited_io/commerce/v1/shipping_rate_pb";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse;
  readonly shippingRate: ShippingRateResponse | undefined;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditShippingRatesDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    offerId: props.offer.offerId,
    amount: props.shippingRate?.amount || 0,
    currency: props.shippingRate?.currency || Currency.EUR,
    allCountries: props.shippingRate?.allCountries || true,
    specificCountries: props.shippingRate?.specificCountries || undefined,
  } as PutShippingRateRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    amount: [] as string[],
    currency: [] as string[],
  });

  function resetErrors() {
    setErrors({ amount: [], currency: [] });
  }

  function currencyOptions() {
    return getEnumVariants(Currency).map((c) => ({
      name: trans(TKEYS.price.currency[c]),
      key: c,
    }));
  }

  function handleAmountInput(value: number) {
    resetErrors();
    setRequest("amount", value);
  }

  function handleCurrencyChange(value: string) {
    resetErrors();
    if (_.isString(value)) {
      setRequest("currency", _.toInteger(value));
    }
  }

  async function handleCreateShippingRate(event: SubmitEvent) {
    event.preventDefault();

    resetErrors();

    try {
      await shippingRateService.putShippingRate(request);
      handleUpdate();
    } catch (err: any) {
      console.error(err);
    }
  }

  async function handleDeleteShippingRate() {
    const shippingRateId = props.shippingRate?.shippingRateId;
    if (!_.isNil(shippingRateId)) {
      await shippingRateService.deleteShippingRate({
        shippingRateId,
      });
      handleUpdate();
    }
  }

  function handleCloseDialog() {
    props.onClose();
  }

  function handleUpdate() {
    props.onClose();
    props.onUpdate();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleCloseDialog}>
        <div slot="headline">
          <Font
            type="title"
            key={TKEYS["shipping-rate"]["update-shipping-rate"]}
          />
        </div>

        <div slot="content">
          <Form onSubmit={handleCreateShippingRate}>
            <PriceField
              label={trans(TKEYS.price.labels.price)}
              required
              value={request.amount}
              onValue={handleAmountInput}
              errors={errors.amount}
            />

            <MdSelect
              type="outlined"
              menuPositioning="fixed"
              label={trans(TKEYS.price.currency.title)}
              options={currencyOptions}
              selected={() => request.currency}
              onChange={handleCurrencyChange}
            />
          </Form>
        </div>

        <div slot="actions">
          <MdButton type="text" onClick={handleCloseDialog}>
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>

          <Show when={!_.isNil(props.shippingRate)}>
            <MdButton danger onClick={handleDeleteShippingRate}>
              <Trans key={TKEYS.form.action.Delete} />
            </MdButton>
          </Show>

          <MdButton type="filled" onClick={handleCreateShippingRate}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
