import _ from "lodash";
import { ParentProps } from "solid-js";
import { CreateWebsiteDialog } from "~/components/websites/CreateWebsiteDialog";
import { useWebsiteContext } from "~/contexts/WebsiteContext";

export function WebsiteGuard() {
  const { websites } = useWebsiteContext();

  function handleUpdate() {
    location.reload();
  }

  return (
    <>
      <CreateWebsiteDialog
        show={websites.state === "ready" && _.isEmpty(websites())}
        onClose={() => {}}
        onUpdate={handleUpdate}
      />
    </>
  );
}
