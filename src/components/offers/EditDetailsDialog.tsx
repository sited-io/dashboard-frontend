import {
  OfferResponse,
  OfferType,
  UpdateOfferRequest,
} from "~/services/sited_io/commerce/v1/offer_pb";
import { MdDialog } from "../layout/MdDialog";
import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { offerService } from "~/services/commerce";
import { Font } from "../content/Font";
import { TKEYS } from "~/locales";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdTextField } from "../form/MdTextField";
import { getEnumVariants } from "~/lib/request-helpers";
import { MdSelect } from "../form/MdSelect";

type Props = {
  readonly show: boolean;
  readonly offer: OfferResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function EditDetailsDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    offerId: props.offer.offerId,
    name: props.offer.name,
    type: props.offer.type,
  } as UpdateOfferRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    name: [] as string[],
  });

  function offerTypeOptions() {
    return getEnumVariants(OfferType).map((t) => ({
      key: t,
      name: trans(TKEYS.offers["offer-type"][t]),
    }));
  }

  function resetErrors() {
    setErrors({ name: [] });
  }

  function handleNameInput(name: string) {
    resetErrors();
    setRequest("name", name);
  }

  function handleOfferTypeSelect(type: string) {
    resetErrors();
    setRequest("type", _.toInteger(type));
  }

  async function handleUpdateOffer(event: SubmitEvent) {
    event.preventDefault();

    try {
      await offerService.updateOffer(request);
      handleUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  function handleUpdate() {
    props.onUpdate();
  }

  function handleClose() {
    resetErrors();
    setRequest("name", props.offer.name);
    props.onClose();
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.offers["edit-details"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleUpdateOffer}>
            <MdTextField
              type="text"
              value={request.name}
              required
              label={trans(TKEYS.offers.labels.name)}
              onValue={handleNameInput}
              error={!_.isEmpty(errors.name)}
              errorText={errors.name}
            />

            <MdSelect
              type="outlined"
              label={trans(TKEYS.offers.labels.type)}
              options={offerTypeOptions}
              selected={() => request.type}
              onChange={handleOfferTypeSelect}
            />
          </Form>
        </div>

        <div slot="actions">
          <MdButton type="text" onClick={handleClose}>
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit type="filled" onClick={handleUpdateOffer}>
            <Trans key={TKEYS.form.action.Save} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
