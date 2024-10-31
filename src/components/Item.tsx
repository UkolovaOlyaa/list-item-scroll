import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import { Button, Input, Flex } from "antd";
import { itemStore } from "../store/store";
import styles from "../styles/ListItem.module.css";

export const Item: React.FC<{ item: any }> = observer(({ item }) => {
  const inputRef = useRef<any>({});

  const handleEdit = () => {
    if (itemStore.editingItem === null) {
      itemStore.startEditing(item.id);
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const handleSave = () => {
    if (itemStore.editingItem === item.id) {
      itemStore.saveChanges(item.id);
    }
  };

  const handleCancel = () => {
    if (itemStore.editingItem === item.id) {
      itemStore.cancelEditing();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    itemStore.setTemporaryName(e.target.value);
  };

  const handleDelete = () => {
    itemStore.deleteItem(item.id);
  };
  return (
    <li className={styles.listItem}>
      <Input
        className={styles.editInput}
        ref={inputRef}
        value={
          itemStore.editingItem === item.id
            ? itemStore.temporaryName
            : item.name
        }
        onChange={handleChange}
        readOnly={!itemStore.editingItem || itemStore.editingItem !== item.id}
        variant="borderless"
      />
      <Flex gap="small" vertical={false}>
        {itemStore.editingItem === item.id ? (
          <>
            <Button onClick={handleSave} type="primary">
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete} danger>
              Delete
            </Button>
          </>
        )}
      </Flex>
    </li>
  );
});
