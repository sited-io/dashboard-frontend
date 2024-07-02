import { Trans } from "@mbarzda/solid-i18next";
import { Show } from "solid-js";

import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { Font } from "../content/Font";
import { MdButton } from "../form/MdButton";
import { MdDialog } from "../layout/MdDialog";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditVisibilityDialog(props: Props) {
  async function handleUpdateVisibility(event: SubmitEvent) {
    event.preventDefault();

    try {
      await offerService.updateOffer({
        offerId: props.offer.offerId,
        isActive: !props.offer.isActive,
      });
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  function handleClose() {
    props.onClose();
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Show
            when={props.offer.isActive}
            fallback={<Font type="label" key={TKEYS.offers["make-active"]} />}
          >
            <Font type="label" key={TKEYS.offers["make-inactive"]} />
          </Show>
        </div>

        <div slot="content"></div>

        <div slot="actions">
          <MdButton type="text" onClick={handleClose}>
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton type="filled" submit onClick={handleUpdateVisibility}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
