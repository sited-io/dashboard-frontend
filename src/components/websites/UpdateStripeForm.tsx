import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { A } from "@solidjs/router";
import _ from "lodash";
import { Match, Show, Switch, createResource, createSignal } from "solid-js";

import { MdIcon } from "~/components/assets/MdIcon";
import { StripeLogo } from "~/components/assets/StripeLogo";
import { Font } from "~/components/content/Font";
import { MdLoading } from "~/components/content/MdLoading";
import { MdButton } from "~/components/form/MdButton";
import { Redirect } from "~/components/navigation/Redirect";
import { TKEYS } from "~/locales";
import { settingsUrl } from "~/routes/settings";
import { stripeService } from "~/services/payment";
import { ShopResponse } from "~/services/sited_io/commerce/v1/shop_pb";
import commonStyles from "./CommonForm.module.scss";
import styles from "./UpdateStripeForm.module.scss";

type Props = {
  readonly shop: ShopResponse | undefined;
  readonly onUpdate: () => void;
};

export function UpdateStripeForm(props: Props) {
  const [trans] = useTransContext();

  const [redirecting, setRedirecting] = createSignal(false);

  const [stripeAccountDetails] = createResource(
    () => props.shop?.shopId,
    async (shopId: string) =>
      stripeService
        .getAccountDetails({ shopId })
        .then((res) => res)
        .catch((err) => {
          console.error(err);
          return;
        }),
  );

  function stripeAccountState() {
    if (stripeAccountDetails.state === "errored") {
      return "errored";
    }
    if (stripeAccountDetails.state === "pending") {
      return "pending";
    }

    if (_.isNil(stripeAccountDetails())) {
      return "missing";
    } else if (
      !stripeAccountDetails()?.details?.chargesEnabled ||
      !stripeAccountDetails()?.details?.detailsSubmitted
    ) {
      return "in-progress";
    } else {
      return "configured";
    }
  }

  async function handleCreateStripeIntegration() {
    const shopId = props.shop?.shopId;
    if (_.isNil(shopId)) {
      return;
    }

    setRedirecting(true);
    try {
      await stripeService.createAccount({ shopId });
      handleContinueStripeIntegration();
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  async function handleContinueStripeIntegration() {
    const shopId = props.shop?.shopId;
    if (_.isNil(shopId)) {
      return;
    }

    setRedirecting(true);

    try {
      const link = await stripeService.createAccountLink({
        shopId,
        refreshUrl: settingsUrl().toString(),
        returnUrl: settingsUrl().toString(),
      });

      location.href = link;
    } catch (err) {
      setRedirecting(false);
      throw err;
    }
  }

  return (
    <>
      <div class={commonStyles.Form}>
        <Font type="label" key={TKEYS.shop.stripe.integration} />

        <div class={commonStyles.Fields}>
          <div class={commonStyles.FieldInfo}>
            <span class={commonStyles.Details}>
              <Trans key={TKEYS.shop.stripe["integration-info-left"]} />{" "}
              <A href={trans(TKEYS.shop.stripe.url)} target="_blank">
                <Trans key={TKEYS.shop.stripe.title} />
                <MdIcon class={styles.OpenInNewIcon} icon="open_in_new" />
              </A>
              <Trans key={TKEYS.shop.stripe["integration-info-right"]} />
            </span>
          </div>

          <Switch
            fallback={
              <span>
                <Trans key={TKEYS.shop["no-shop-yet"]} />
              </span>
            }
          >
            <Match when={stripeAccountState() === "errored"}>
              {/* <ContentError /> */}
              Error
            </Match>
            <Match when={stripeAccountState() === "pending"}>
              <MdButton type="text" disabled>
                <MdLoading style={{ height: "48px" }} />
              </MdButton>
            </Match>
            <Match when={stripeAccountState() === "missing"}>
              <MdButton
                type="filled-tonal"
                onClick={handleCreateStripeIntegration}
              >
                <div class={styles.StripeButton}>
                  <Trans key={TKEYS.shop.stripe["start-integration"]} />
                  <StripeLogo class={styles.StripeLogo} />
                </div>
              </MdButton>
            </Match>
            <Match when={stripeAccountState() === "in-progress"}>
              <MdButton
                type="filled-tonal"
                onClick={handleContinueStripeIntegration}
              >
                <div class={styles.StripeButton}>
                  <Trans key={TKEYS.shop.stripe["continue-integration"]} />
                  <StripeLogo class={styles.StripeLogo} />
                </div>
              </MdButton>
            </Match>
            <Match when={stripeAccountState() === "configured"}>
              <span class={styles.Ok}>
                <Font type="label" key={TKEYS.shop.stripe.connected} />
              </span>
            </Match>
          </Switch>
        </div>
      </div>

      <Show when={redirecting()}>
        <Redirect />
      </Show>
    </>
  );
}
