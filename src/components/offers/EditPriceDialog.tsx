import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";
import { createStore } from "solid-js/store";

import { getEnumVariants } from "~/lib/request-helpers";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import {
  OfferResponse,
  PutPriceToOfferRequest,
} from "~/services/sited_io/commerce/v1/offer_pb";
import {
  Currency,
  Price,
  PriceBillingScheme,
  PriceType,
  Recurring,
  RecurringInterval,
} from "~/services/sited_io/commerce/v1/price_pb";
import { Font } from "../content/Font";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdSelect } from "../form/MdSelect";
import { MdTextField } from "../form/MdTextField";
import { PriceField } from "../form/PriceField";
import { MdDialog } from "../layout/MdDialog";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditPriceDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    offerId: props.offer.offerId,
    price: {
      unitAmount: props.offer.price?.unitAmount || 0.0,
      priceType: props.offer.price?.priceType || PriceType.ONE_TIME,
      currency: props.offer.price?.currency || Currency.EUR,
      billingScheme:
        props.offer.price?.billingScheme || PriceBillingScheme.PER_UNIT,
      recurring: props.offer.price?.recurring,
    },
  } as PutPriceToOfferRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  function priceTypeOptions() {
    return getEnumVariants(PriceType).map((p) => ({
      key: p,
      name: trans(TKEYS.price["price-type"][p]),
    }));
  }

  function currencyOptions() {
    return getEnumVariants(Currency).map((c) => ({
      key: c,
      name: trans(TKEYS.price.currency[c]),
    }));
  }

  function recurringIntervalOptions() {
    return getEnumVariants(RecurringInterval).map((i) => ({
      key: i,
      name: trans(TKEYS.price["recurring-interval"][i], {
        intervalCount: request.price?.recurring?.intervalCount || 1,
      }),
    }));
  }

  function handlePriceTypeSelect(input: string) {
    const priceType = _.toInteger(input);
    const price = {
      ...request.price,
      priceType,
    } as Price;

    if (
      request.price?.priceType === PriceType.ONE_TIME &&
      priceType === PriceType.RECURRING
    ) {
      price.recurring = {
        intervalCount: 1,
        interval: RecurringInterval.MONTH,
      } as Recurring;
    }
    if (
      request.price?.priceType === PriceType.RECURRING &&
      priceType === PriceType.ONE_TIME
    ) {
      price.recurring = undefined;
    }

    setRequest("price", price);
  }

  function handlePriceInput(unitAmount: number) {
    setRequest("price", {
      ...request.price,
      unitAmount,
    });
  }

  function handleCurrencySelect(currency: string) {
    setRequest("price", {
      ...request.price,
      currency: _.toInteger(currency),
    });
  }

  function handleRecurringIntervalCountInput(intervalCount: string) {
    setRequest("price", {
      ...request.price,
      recurring: {
        ...request.price?.recurring,
        intervalCount: _.toInteger(intervalCount),
      } as Recurring,
    });
  }

  function handleRecurringIntervalChange(interval: string) {
    setRequest("price", {
      ...request.price,
      recurring: {
        ...request.price?.recurring,
        interval: _.toInteger(interval),
      } as Recurring,
    });
  }

  async function handleUpdatePrice(event: SubmitEvent) {
    event.preventDefault();

    try {
      await offerService.putPriceToOffer(request);
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleRemovePrice() {
    try {
      await offerService.removePriceFromOffer({ offerId: request.offerId });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  function handleUpdate() {
    props.onUpdate();
  }

  function handleClose() {
    setRequest(_.clone(emptyRequest));
    props.onClose();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.price["update-price"]} />
        </div>

        <div slot="content">
          <Form>
            <MdSelect
              type="outlined"
              label={trans(TKEYS.price.labels["price-type"])}
              options={priceTypeOptions}
              selected={() => request.price?.priceType}
              onChange={handlePriceTypeSelect}
            />

            <PriceField
              label={trans(TKEYS.price.labels.price)}
              value={request.price?.unitAmount}
              onValue={handlePriceInput}
            />

            <MdSelect
              type="outlined"
              options={currencyOptions}
              selected={() => request.price?.currency}
              onChange={handleCurrencySelect}
            />

            <Show when={request.price?.priceType === PriceType.RECURRING}>
              <Font
                type="label"
                key={TKEYS.common["per-or-every"]}
                options={{
                  count: request.price?.recurring?.intervalCount,
                }}
              />

              <MdTextField
                type="number"
                min={1}
                label={trans(TKEYS.price.labels["billing-period"])}
                value={request.price?.recurring?.intervalCount}
                onValue={handleRecurringIntervalCountInput}
              />

              <MdSelect
                type="outlined"
                options={recurringIntervalOptions}
                selected={() => request.price?.recurring?.interval}
                onChange={handleRecurringIntervalChange}
              />
            </Show>
          </Form>
        </div>

        <div slot="actions">
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <Show when={!_.isNil(request.price)}>
            <MdButton danger onClick={handleRemovePrice}>
              <Trans key={TKEYS.form.action.Delete} />
            </MdButton>
          </Show>
          <MdButton submit onClick={handleUpdatePrice}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
