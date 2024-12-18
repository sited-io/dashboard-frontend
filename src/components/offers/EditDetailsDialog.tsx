import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { getEnumVariants } from "~/lib/request-helpers";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import {
  OfferResponse,
  OfferType,
  UpdateOfferRequest,
} from "~/services/sited_io/commerce/v1/offer_pb";
import { Font } from "../content/Font";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdSelect } from "../form/MdSelect";
import { MdTextField } from "../form/MdTextField";
import { MdDialog } from "../layout/MdDialog";

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
    description: props.offer.description,
    type: props.offer.type,
  } as UpdateOfferRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    name: [] as string[],
    description: [] as string[],
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

  function handleDescriptionInput(description: string) {
    resetErrors();
    setRequest("description", description);
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

            <MdTextField
              type="textarea"
              value={request.description}
              label={trans(TKEYS.offers.labels.description)}
              onValue={handleDescriptionInput}
              error={!_.isEmpty(errors.description)}
              errorText={errors.description}
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
