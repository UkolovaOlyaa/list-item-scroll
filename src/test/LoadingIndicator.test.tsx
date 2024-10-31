import React from "react";
import { render } from "@testing-library/react";
import { LoadingIndicator } from "../components/LoadingIndicator";

describe("LoadingIndicator", () => {
  test("renders a loading spinner", () => {
    const { container } = render(<LoadingIndicator />);

    const spinner = container.querySelector(".ant-spin");
    expect(spinner).toBeInTheDocument();
  });
});
