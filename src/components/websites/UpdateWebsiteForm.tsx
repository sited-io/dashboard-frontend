import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { TKEYS } from "~/locales";
import { Font } from "../content/Font";
import { Form } from "../form/Form";
import { MdButton } from "../form/MdButton";
import { MdTextField } from "../form/MdTextField";
import {
  UpdateWebsiteRequest,
  WebsiteResponse,
} from "~/services/sited_io/websites/v1/website_pb";
import { createStore } from "solid-js/store";
import { websiteService } from "~/services/website";

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
      <Font type="label" key={TKEYS.websites.labels.name} />
      <Form onSubmit={handleUpdateWebsite}>
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

        <MdButton onClick={handleUpdateWebsite}>
          <Trans key={TKEYS.form.action.Update} />
        </MdButton>
      </Form>
    </>
  );
}
