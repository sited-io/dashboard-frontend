import _ from "lodash";

import styles from "./Pagination.module.scss";
import {
  PaginationRequest,
  PaginationResponse,
} from "~/services/sited_io/pagination/v1/pagination_pb";
import { PartialMessage } from "@bufbuild/protobuf";
import { MdIconButton } from "../form/MdIconButton";
import { MdIcon } from "../assets/MdIcon";

type Props = {
  readonly pagination: () => PaginationResponse | undefined;
  readonly onValue: (next: PartialMessage<PaginationRequest>) => void;
};

export function Pagination(props: Props) {
  function handlePagination(increment: number) {
    const pagination = props.pagination();

    if (!_.isNil(pagination)) {
      const nextPage = pagination.page + increment;
      const maxPage = Math.ceil(pagination.totalElements / pagination.size);

      if (nextPage > 0 && nextPage <= maxPage) {
        props.onValue({
          page: nextPage,
          size: pagination.size,
        });
      }
    }
  }

  function totalPages() {
    const pagination = props.pagination();

    if (!_.isNil(pagination)) {
      return Math.ceil(pagination.totalElements / pagination.size);
    }
  }

  return (
    <div class={styles.Pagination}>
      <MdIconButton onClick={() => handlePagination(-1)}>
        <MdIcon icon="chevron_left" />
      </MdIconButton>
      <span>
        {props.pagination()?.page} / {totalPages()}
      </span>
      <MdIconButton onClick={() => handlePagination(+1)}>
        <MdIcon icon="chevron_right" />
      </MdIconButton>
    </div>
  );
}
