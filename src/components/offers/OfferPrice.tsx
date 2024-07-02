import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show } from "solid-js";

import { centsToDecimal } from "~/lib/string-manipulation";
import styles from "./OfferPrice.module.scss";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { TKEYS } from "~/locales";
import { Price } from "../content/Price";

type Props = {
  readonly offer: OfferResponse;
  readonly class?: string;
  readonly small?: boolean;
};

export function OfferPrice(props: Props) {
  const [trans] = useTransContext();

  function recurringIntervalCount() {
    const intervalCount = props.offer.price?.recurring?.intervalCount;
    if (!_.isNil(intervalCount) && intervalCount > 1) {
      return intervalCount;
    }
  }

  function recurringInterval() {
    const interval = props.offer.price?.recurring?.interval;
    if (!_.isNil(interval)) {
      return trans(TKEYS.price["recurring-interval"][interval], {
        intervalCount: props.offer.price?.recurring?.intervalCount,
      });
    }
  }

  function trialPeriodDays() {
    return props.offer.price?.recurring?.trialPeriodDays;
  }

  return (
    <>
      <div class={props.class || styles.OfferPrice}>
        <Price
          unitAmount={props.offer.price?.unitAmount}
          currency={props.offer.price?.currency}
          small={props.small}
        />

        <Show when={!_.isNil(props.offer.price?.recurring)}>
          <span
            class={styles.Recurring}
            classList={{ [styles.Small]: Boolean(props.small) }}
          >
            / {recurringIntervalCount()} {recurringInterval()}
          </span>
        </Show>

        <Show when={!_.isNil(trialPeriodDays()) && trialPeriodDays()! > 0}>
          <span
            class={styles.TrialPeriod}
            classList={{ [styles.Small]: Boolean(props.small) }}
          >
            {trialPeriodDays()}{" "}
            <Trans
              key={TKEYS.price["days-free"]}
              options={{ periodDays: trialPeriodDays() }}
            />
          </span>
        </Show>
      </div>
    </>
  );
}
