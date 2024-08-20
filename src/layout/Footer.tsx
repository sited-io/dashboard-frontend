import { A } from "@solidjs/router";

export function Footer() {
  return (
    <>
      <div class="flex justify-between p-2 bg-gray-200">
        <div></div>
        <A href="https://sited.io" target="__blank">
          sited.io
        </A>
      </div>
    </>
  );
}
