import styles from "./ColorInput.module.scss";

type Props = {
  value: () => string | undefined;
  onValue: (color: string) => void;
};

export function ColorInput(props: Props) {
  return (
    <>
      <div class={styles.ColorInput}>
        <label
          for="color-picker"
          class={styles.ColorInputLabel}
          style={{
            "background-color": props.value(),
          }}
        />

        <input
          id="color-picker"
          class={styles.ColorInputInput}
          type="color"
          value={props.value()}
          onInput={({ target }) => props.onValue(target.value)}
        />
      </div>
    </>
  );
}
