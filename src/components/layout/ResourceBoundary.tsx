import _ from "lodash";
import { ParentProps, Resource, Show, Suspense } from "solid-js";
import { ContentLoading } from "./ContentLoading";

type Props = {
  resource: Resource<any>;
} & ParentProps;

export function ResourceBoundary(props: Props) {
  return (
    <>
      <Suspense fallback={<ContentLoading />}>
        <Show when={!_.isNil(props.resource())}>{props.children}</Show>
      </Suspense>
    </>
  );
}
