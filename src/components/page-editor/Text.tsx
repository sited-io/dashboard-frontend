import { createSignal, onMount } from "solid-js";
import { MdIcon } from "../assets/MdIcon";
import "./Text.css";

type Props = {
  readonly onValue: (value: string) => void;
  readonly onNewBlock: () => void;
};

export function Text(props: Props) {
  let textAreaEl: HTMLTextAreaElement | undefined;

  let initialHeightPx = 0;

  onMount(() => {
    if (textAreaEl) {
      initialHeightPx = textAreaEl.offsetHeight;
    }
  });

  function resize(el: HTMLTextAreaElement) {
    el.style.height = initialHeightPx + "px";
    if (el.scrollHeight > initialHeightPx) {
      el.style.height = el.scrollHeight + "px";
    }
  }

  function handleOpenMenu() {}

  function handleInput(el: HTMLTextAreaElement) {
    resize(el);
    props.onValue(el.value);
  }

  return (
    <>
      <div class="group">
        <textarea
          ref={textAreaEl}
          class="block p-2.5 w-full h-auto min-h-32 resize-none text-sm text-gray-900 bg-gray-50 border-2 rounded-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Type your text here ..."
          onInput={({ target }) => handleInput(target)}
        ></textarea>
        <div
          id="editor"
          contentEditable
          class="block p-2.5 w-full h-auto min-h-32 resize-none text-sm text-gray-900 bg-gray-50 border-2 rounded-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          data-placeholder="Type your text here ..."
          onInput={(event) => console.log(event)}
          onSelect={(event) => console.log(event)}
        ></div>
        <div class="w-full p-0.5 invisible group-focus-within:visible">
          <button
            class="border rounded-lg hover:border-gray-400 hover:bg-gray-200"
            onClick={handleOpenMenu}
          >
            <MdIcon icon="menu" class="text-xs" />
          </button>
        </div>
      </div>
    </>
  );
}
