import _ from "lodash";
import { Show } from "solid-js";

import { useNavigate } from "@solidjs/router";
import { offerImagesPath } from "~/routes/offers/[offerId]/images";
import { OfferResponse } from "~/services/sited_io/commerce/v1/offer_pb";
import { PlaceholderAdd } from "../assets/PlaceholderAdd";
import styles from "./EditOfferImages.module.scss";
import { EditableField } from "./EditableField";

type Props = {
  readonly offer: OfferResponse;
  readonly onUpdate: () => void;
};

export function EditOfferImages(props: Props) {
  const navigate = useNavigate();

  function handleEditImages() {
    navigate(offerImagesPath(props.offer.offerId));
  }

  return (
    <>
      <EditableField openInNew onClick={handleEditImages}>
        <div class={styles.EditImages}>
          <Show
            when={!_.isEmpty(props.offer.images)}
            fallback={<PlaceholderAdd class={styles.PlaceholderImage} />}
          >
            <img
              class={styles.Image}
              src={_.first(props.offer.images)!.imageUrl}
              alt=""
            />
          </Show>
        </div>
      </EditableField>
    </>
  );
}
