import React from "react";
import { render, screen } from "@testing-library/react";
import { ItemList } from "../components/ItemList";
import { itemStore } from "store/store";

jest.mock("../store/store", () => ({
  itemStore: {
    items: [
      { id: 1, name: "First Item" },
      { id: 2, name: "Second Item" },
      { id: 3, name: "Third Item" },
    ],
  },
}));

describe("ItemList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("renders list of items", () => {
    render(<ItemList />);

    expect(screen.getByRole("list")).toBeInTheDocument();

    expect(screen.getAllByRole("listitem").length).toBe(itemStore.items.length);
  });
});
