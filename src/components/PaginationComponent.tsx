import React from "react";
import { observer } from "mobx-react-lite";
import { Flex, Pagination } from "antd";
import { itemStore } from "../store/store";

export const PaginationComponent: React.FC = observer(() => {
  const handleChange = (newPage: number) => {
    itemStore.loadMore(newPage);
    itemStore.items = [];
  };

  return (
    <Flex align="center" vertical>
      <Pagination
        current={itemStore.page}
        total={itemStore.totalCount}
        onChange={handleChange}
        pageSize={itemStore.pageSize}
        showSizeChanger={false}
      />
    </Flex>
  );
});
