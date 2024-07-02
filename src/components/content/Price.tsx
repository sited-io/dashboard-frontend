import _ from "lodash";
import { centsToDecimal } from "~/lib/string-manipulation";
import { TKEYS } from "~/locales";
import { Currency } from "~/services/sited_io/commerce/v1/price_pb";
import styles from "./Price.module.scss";
import { useTransContext } from "@mbarzda/solid-i18next";

type Props = {
  readonly unitAmount: number | undefined;
  readonly currency: Currency | undefined;
  readonly small?: boolean;
};

export function Price(props: Props) {
  const [trans] = useTransContext();

  function priceDecimal() {
    const unitAmount = props.unitAmount;
    if (!_.isNil(unitAmount)) {
      return centsToDecimal(unitAmount, trans(TKEYS.price["decimal-point"]));
    }
  }

  function currencyCode() {
    const currency = props.currency;
    if (!_.isNil(currency)) {
      return trans(TKEYS.price.currency[currency]);
    }
  }

  return (
    <>
      <span
        class={styles.Price}
        classList={{ [styles.PriceSmall]: Boolean(props.small) }}
      >
        {priceDecimal()} {currencyCode()}{" "}
      </span>
    </>
  );
}
