import { onCleanup } from "solid-js";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      clickOutside: () => void;
    }
  }
}

export function clickOutside(element: Element, accessor: () => () => void) {
  function onClick(e: Event) {
    return !element.contains(e.target as Node) && accessor()?.();
  }

  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}
