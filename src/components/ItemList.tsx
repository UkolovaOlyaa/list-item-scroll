import React from "react";
import { observer } from "mobx-react-lite";
import { Item } from "./Item";
import { itemStore } from "../store/store";

export const ItemList: React.FC = observer(() => {
  return (
    <ul>
      {itemStore.items.map((item: any) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
});
