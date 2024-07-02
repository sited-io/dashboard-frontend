import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { TKEYS } from "~/locales";
import {
  CreateWebsiteRequest,
  WebsiteResponse,
} from "~/services/sited_io/websites/v1/website_pb";
import { websiteService } from "~/services/website";
import { Font } from "../content/Font";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdTextField } from "../form/MdTextField";
import { MdDialog } from "../layout/MdDialog";

type Props = {
  readonly show: boolean;
  readonly onClose: () => void;
  readonly onUpdate: (createdWebsite: WebsiteResponse) => void;
};

export function CreateWebsiteDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    name: "",
  } as CreateWebsiteRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    name: [] as string[],
  });

  function resetErrors() {
    setErrors({ name: [] });
  }

  function handleNameInput(name: string) {
    resetErrors();
    setRequest("name", name);
  }

  function handleClose() {
    setRequest(_.clone(emptyRequest));
    props.onClose();
  }

  function handleUpdate(website: WebsiteResponse) {
    handleClose();
    props.onUpdate(website);
  }

  async function handleCreateWebsite() {
    try {
      const createdWebsite = await websiteService.createWebsite(request);
      handleUpdate(createdWebsite);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.websites["create-website"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleCreateWebsite}>
            <MdTextField
              style={{ width: "100%" }}
              type="text"
              value={request.name}
              required
              label={trans(TKEYS.websites.labels.name)}
              onValue={handleNameInput}
              error={!_.isEmpty(errors.name)}
              errorText={errors.name}
            />
          </Form>
        </div>

        <div slot="actions">
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit onClick={handleCreateWebsite}>
            <Trans key={TKEYS.form.action.Create} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
