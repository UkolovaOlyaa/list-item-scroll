import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Item } from "../components/Item";
import { itemStore } from "../store/store";

jest.mock("../store/store", () => ({
  itemStore: {
    editingItem: null,
    temporaryName: "",
    startEditing: jest.fn(),
    saveChanges: jest.fn(),
    cancelEditing: jest.fn(),
    setTemporaryName: jest.fn(),
    deleteItem: jest.fn(),
  },
}));

describe("Item Component", () => {
  const item = { id: 1, name: "Test Item" };
  const renderItem = () => render(<Item item={item} />);

  beforeEach(() => {
    jest.clearAllMocks();
    itemStore.editingItem = null;
    itemStore.temporaryName = item.name;
  });

  test("renders item name", () => {
    renderItem();
    expect(screen.getByDisplayValue(item.name)).toBeInTheDocument();
  });

  test("focuses input when edit button is clicked", async () => {
    renderItem();

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    expect(itemStore.startEditing).toHaveBeenCalledWith(item.id);
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Item")).toHaveFocus();
    });
  });

  test("calls saveChanges when save button is clicked", () => {
    itemStore.editingItem = item.id;
    renderItem();

    const saveButton = screen.getByText("Save");
    fireEvent.click(saveButton);

    expect(itemStore.saveChanges).toHaveBeenCalledWith(item.id);
  });

  test("calls cancelEditing when cancel button is clicked", () => {
    itemStore.editingItem = item.id;
    renderItem();

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(itemStore.cancelEditing).toHaveBeenCalled();
  });

  test("updates temporary name on input change", () => {
    renderItem();

    const input = screen.getByDisplayValue("Test Item");
    fireEvent.change(input, { target: { value: "New Name" } });

    expect(itemStore.setTemporaryName).toHaveBeenCalledWith("New Name");
  });

  test("calls deleteItem when delete button is clicked", () => {
    renderItem();

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(itemStore.deleteItem).toHaveBeenCalledWith(item.id);
  });
});
