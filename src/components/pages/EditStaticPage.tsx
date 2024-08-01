import { useTransContext } from "@mbarzda/solid-i18next";
import { useNavigate } from "@solidjs/router";

import { PageResponse } from "~/services/sited_io/websites/v1/page_pb";
import { PageEditor } from "../page-editor/PageEditor";

type Props = {
  readonly page: PageResponse;
};

export function EditStaticPage(props: Props) {
  const navigate = useNavigate();

  const [trans] = useTransContext();

  async function handleSavePage() {}

  return <>{<PageEditor />}</>;
}
