import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Flex, Pagination } from "antd";
import { itemStore } from "../store/store";
import styles from "../styles/PaginationComponent.module.css";

export const PaginationComponent: React.FC = observer(() => {
  const handleChange = (newPage: number) => {
    itemStore.loadMore(newPage);
    itemStore.items = [];
  };
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const threshold = 133;
    itemStore.setPaginationFixed(scrollTop > threshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Flex
      align="center"
      vertical
      className={itemStore.isPaginationFixed ? styles.fixedPagination : ""}
    >
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
