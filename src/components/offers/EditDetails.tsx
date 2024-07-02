import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { Show, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

import { clickOutside } from "~/directives/click-outside";
import { TKEYS } from "~/locales";
import { offerService } from "~/services/commerce";
import {
  OfferResponse,
  UpdateOfferRequest,
} from "~/services/sited_io/commerce/v1/offer_pb";
import { Font } from "../content/Font";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdTextField } from "../form/MdTextField";
import { EditableField } from "./EditableField";
import { EditDetailsDialog } from "./EditDetailsDialog";

false && clickOutside;

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditDetails(props: Props) {
  const [showEditName, setShowEditName] = createSignal(false);

  function handleShowEditName() {
    setShowEditName(true);
  }

  function handleCloseEditName() {
    setShowEditName(false);
  }

  function handleUpdate() {
    props.onUpdate();
  }

  return (
    <>
      <EditableField onClick={handleShowEditName}>
        <Font type="title">{props.offer.name}</Font>
        <Font
          active
          type="label"
          key={TKEYS.offers["offer-type"][props.offer.type]}
        />
      </EditableField>

      <EditDetailsDialog
        show={showEditName()}
        offer={props.offer}
        onUpdate={handleUpdate}
        onClose={handleCloseEditName}
      />
    </>
  );
}
