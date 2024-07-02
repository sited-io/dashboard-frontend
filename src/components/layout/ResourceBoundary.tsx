import _ from "lodash";
import { ParentProps, Resource, Show, Suspense } from "solid-js";

type Props = {
  resource: Resource<any>;
} & ParentProps;

export function ResourceBoundary(props: Props) {
  return (
    <>
      <Suspense>
        <Show
          when={props.resource.state === "ready" && !_.isNil(props.resource())}
        >
          {props.children}
        </Show>
      </Suspense>
    </>
  );
}