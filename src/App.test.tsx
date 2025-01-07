import React from "react";
import { render, screen } from "@testing-library/react";
import Patient from "./components/Patient";

test("renders learn react link", () => {
  render(<Patient />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
