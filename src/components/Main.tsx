import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ItemList } from "./ItemList";
import { Flex, Select } from "antd";
import { itemStore } from "../store/store";
import { PaginationComponent } from "./PaginationComponent";
import { LoadingIndicator } from "./LoadingIndicator";

export const Main: React.FC = observer(() => {
  useEffect(() => {
    itemStore.loadItems();
    const handleScroll = () => {
      if (
        !itemStore.isLoading &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      ) {
        itemStore.loadMore(itemStore.page + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSortOrderChange = (value: string) => {
    itemStore.setSortOrder(value);
  };

  return (
    <Flex style={{ width: "100%" }} align="stretch" vertical gap="small">
      {itemStore.items.length > 0 ? (
        <>
          <Flex>
            <Select
              style={{ minWidth: "7.5rem" }}
              placeholder="Sort"
              onChange={handleSortOrderChange}
            >
              <Select.Option value="asc">Ascending</Select.Option>
              <Select.Option value="desc">Descending</Select.Option>
            </Select>
          </Flex>
          <PaginationComponent />
          <ItemList />
          {itemStore.isLoading && <LoadingIndicator />}
        </>
      ) : (
        <LoadingIndicator />
      )}
    </Flex>
  );
});
