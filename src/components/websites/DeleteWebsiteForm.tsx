import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createSignal } from "solid-js";
import { TKEYS } from "~/locales";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { websiteService } from "~/services/website";
import { DeleteConfirmationDialog } from "../form/DeleteConfirmationDialog";
import { MdButton } from "../form/MdButton";

type Props = {
  website: WebsiteResponse;
  onUpdate: () => void;
};

export function DeleteWebsiteForm(props: Props) {
  const [trans] = useTransContext();

  const [showDeleteWebsite, setShowDeleteWebsite] = createSignal(false);

  function handleStartDeleteWebsite() {
    setShowDeleteWebsite(true);
  }

  function handleCloseDeleteWebsite() {
    setShowDeleteWebsite(false);
  }

  async function handleDeleteWebsite() {
    const websiteId = props.website.websiteId;
    if (_.isNil(websiteId)) {
      console.error("Could not get websiteId from context");
      return;
    }

    try {
      await websiteService.deleteWebsite({ websiteId });
      props.onUpdate();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <MdButton danger onClick={handleStartDeleteWebsite}>
        <Trans key={TKEYS.websites["delete-website"]} />
      </MdButton>

      <DeleteConfirmationDialog
        show={showDeleteWebsite()}
        item={trans(TKEYS.websites.website)}
        itemName={props.website.name}
        onCancel={handleCloseDeleteWebsite}
        onConfirmation={handleDeleteWebsite}
      />
    </>
  );
}
