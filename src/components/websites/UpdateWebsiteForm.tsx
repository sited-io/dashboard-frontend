import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";

import { Font } from "~/components/content/Font";
import { Form } from "~/components/form/Form";
import { MdButton } from "~/components/form/MdButton";
import { MdTextField } from "~/components/form/MdTextField";
import { TKEYS } from "~/locales";
import {
  UpdateWebsiteRequest,
  WebsiteResponse,
} from "~/services/sited_io/websites/v1/website_pb";
import { websiteService } from "~/services/website";
import commonStyles from "./CommonForm.module.scss";

type Props = {
  website: WebsiteResponse;
  onUpdate: () => void;
};

export function UpdateWebsiteForm(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    websiteId: props.website.websiteId,
    name: props.website.name,
  } as UpdateWebsiteRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    name: [] as string[],
  });

  function resetErrors() {
    setErrors("name", []);
  }

  function handleUpdate() {
    resetErrors();
    setRequest(_.clone(emptyRequest));
    props.onUpdate();
  }

  function handleNameInput(name: string) {
    resetErrors();
    setRequest("name", name);
  }

  async function handleUpdateWebsite() {
    try {
      await websiteService.updateWebsite(request);
      handleUpdate();
    } catch (err: any) {
      console.error(err);
      setErrors("name", err.rawMessage);
    }
  }

  return (
    <>
      <div class={commonStyles.Fields}>
        <Font
          class={commonStyles.Label}
          type="label"
          key={TKEYS.websites.labels.name}
        />

        <Form
          onSubmit={handleUpdateWebsite}
          actions={
            <MdButton onClick={handleUpdateWebsite}>
              <Trans key={TKEYS.form.action.Update} />
            </MdButton>
          }
        >
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
    </>
  );
}
