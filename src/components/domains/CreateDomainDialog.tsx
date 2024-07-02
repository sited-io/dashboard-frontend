import { Trans, useTransContext } from "@mbarzda/solid-i18next";
import _ from "lodash";
import { createStore } from "solid-js/store";
import { CreateDomainRequest } from "~/services/sited_io/websites/v1/domain_pb";
import { WebsiteResponse } from "~/services/sited_io/websites/v1/website_pb";
import { MdDialog } from "../layout/MdDialog";
import { Font } from "../content/Font";
import { TKEYS } from "~/locales";
import { Form } from "../form/Form";
import { domainService } from "~/services/website";
import { MdTextField } from "../form/MdTextField";
import { MdButton } from "../form/MdButton";

type Props = {
  readonly show: boolean;
  readonly website: WebsiteResponse;
  readonly onClose: () => void;
  readonly onUpdate: () => void;
};

export function CreateDomainDialog(props: Props) {
  const [trans] = useTransContext();

  const emptyRequest = {
    websiteId: props.website.websiteId,
    domain: "",
  } as CreateDomainRequest;

  const [request, setRequest] = createStore(_.clone(emptyRequest));

  const [errors, setErrors] = createStore({
    domain: [] as string[],
  });

  function resetErrors() {
    setErrors({ domain: [] });
  }

  function handleDomainInput(domain: string) {
    resetErrors();
    setRequest("domain", domain);
  }

  function handleClose() {
    setRequest(_.clone(emptyRequest));
    props.onClose();
  }

  function handleUpdate() {
    handleClose();
    props.onUpdate();
  }

  async function handleCreateDomain() {
    try {
      await domainService.createDomain(request);
      handleUpdate();
    } catch (err: any) {
      console.error(err);
      setErrors("domain", [err.rawMessage]);
    }
  }

  return (
    <>
      <MdDialog open={props.show} onClose={handleClose}>
        <div slot="headline">
          <Font type="title" key={TKEYS.domain["add-domain"]} />
        </div>

        <div slot="content">
          <Form onSubmit={handleCreateDomain}>
            <MdTextField
              type="domain"
              value={request.domain}
              required
              label={trans(TKEYS.domain.labels.domain)}
              onValue={handleDomainInput}
              error={!_.isEmpty(errors.domain)}
              errorText={errors.domain}
            />
          </Form>
        </div>

        <div slot="actions">
          <MdButton onClick={handleClose} type="text">
            <Trans key={TKEYS.form.action.Close} />
          </MdButton>
          <MdButton submit onClick={handleCreateDomain}>
            <Trans key={TKEYS.form.action.Create} />
          </MdButton>
        </div>
      </MdDialog>
    </>
  );
}
