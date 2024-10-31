import React from "react";
import { render, screen } from "@testing-library/react";
import { Main } from "../components/Main";
import { itemStore } from "../store/store";

jest.mock("../store/store", () => ({
  itemStore: {
    loadItems: jest.fn(),
    items: [],
    isLoading: true,
  },
}));

jest.mock("../components/ItemList", () => ({
  ItemList: () => <div data-testid="item-list">ItemList Component</div>,
}));

jest.mock("../components/PaginationComponent", () => ({
  PaginationComponent: () => (
    <div data-testid="pagination-component">Pagination Component</div>
  ),
}));

jest.mock("../components/LoadingIndicator", () => ({
  LoadingIndicator: () => <div data-testid="loading-indicator">Loading...</div>,
}));

describe("Main Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("calls itemStore.loadItems on mount", () => {
    render(<Main />);
    expect(itemStore.loadItems).toHaveBeenCalledTimes(1);
  });

  test("renders ItemList and PaginationComponent when items are present", () => {
    itemStore.items = [{ id: 1, name: "Test Item" }];

    render(<Main />);

    expect(screen.getByTestId("item-list")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-component")).toBeInTheDocument();
  });

  test("renders LoadingIndicator when no items are present", () => {
    itemStore.items = [];

    render(<Main />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });

  test("renders LoadingIndicator when items are being loaded", () => {
    render(<Main />);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  });
});
