import { createSignal } from "solid-js";
import { Text } from "./Text";

type Props = {};

export function PageEditor(props: Props) {
  const [blocks, setBlocks] = createSignal([]);

  function handleInput(value: string) {
    console.log(value);
  }

  function handleNewBlock() {}

  return (
    <>
      <div class="w-full mx-auto">
        <Text onValue={handleInput} onNewBlock={handleNewBlock} />
      </div>
    </>
  );
}
