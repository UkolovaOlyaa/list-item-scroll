import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "../components/App";

jest.mock("../components/Main", () => ({
  Main: () => <div data-testid="main-component">Main Component</div>,
}));

describe("App", () => {
  test("renders correctly", () => {
    render(<App />);

    const titleElement = screen.getByText(/GitHub Repository List/i);
    expect(titleElement).toBeInTheDocument();

    const mainElement = screen.getByTestId("main-component");
    expect(mainElement).toBeInTheDocument();
  });
});
