import _ from "lodash";
import { Show } from "solid-js";

import { PlaceholderAdd } from "../assets/PlaceholderAdd";
import { ContentLoading } from "../layout/ContentLoading";
import { FileInput } from "./FileInput";
import styles from "./ImageInput.module.scss";

type Props = {
  onValue: (value: FileList | null) => void;
  loading: () => boolean;
  imageUrl?: string | undefined;
};

export function ImageInput(props: Props) {
  return (
    <>
      <label class={styles.ImageInput}>
        <div class={styles.LogoLink}>
          <Show
            when={!_.isEmpty(props.imageUrl)}
            fallback={<PlaceholderAdd class={styles.PlaceholderAdd} />}
          >
            <Show when={!props.loading()} fallback={<ContentLoading />}>
              <img class={styles.Logo} src={props.imageUrl} alt="" />
            </Show>
          </Show>
        </div>

        <FileInput class={styles.Input} image onValue={props.onValue} />
      </label>
    </>
  );
}
