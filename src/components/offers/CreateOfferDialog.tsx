import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import { ShopResponse } from "~/services/sited_io/commerce/v1/shop_pb";
import { MdDialog } from "../layout/MdDialog";
import { Font } from "../content/Font";
import { TKEYS } from "~/locales";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import {
  CreateOfferRequest,
  OfferType,
} from "~/services/sited_io/commerce/v1/offer_pb";
import { createStore } from "solid-js/store";
import _ from "lodash";
import { useNavigate } from "@solidjs/router";
import { offerDetailPath } from "~/routes/offers/[offerId]/(offerId)";
import { offerService } from "~/services/commerce";
import { MdTextField } from "../form/MdTextField";
import { getEnumVariants } from "~/lib/request-helpers";
import { MdSelect } from "../form/MdSelect";

type Props = {
  readonly show: boolean;
  readonly shop: ShopResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function CreateOfferDialog(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  const emptyRequest = {
    shopId: props.shop.shopId,
    name: undefined as string | undefined,
    type: OfferType.PHYSICAL,
  } as CreateOfferRequest;

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

  function handleNameInput(value: string) {
    resetErrors();
    setRequest("name", value);
  }

  function handleOfferTypeSelect(type: string) {
    resetErrors();
    setRequest("type", _.toInteger(type));
  }

  async function handleCreateOffer(event: SubmitEvent) {
    event.preventDefault();

    try {
      const offer = await offerService.createOffer(request);
      handleClose();

      navigate(offerDetailPath(offer.offerId));
    } catch (err: any) {
      console.error(err);
    }
  }

  function handleClose() {
    props.onClose();
    setRequest(_.clone(emptyRequest));
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.offers["create-offer"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleCreateOffer}>
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
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit onClick={handleCreateOffer}>
            <Trans key={TKEYS.form.action.Create} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
