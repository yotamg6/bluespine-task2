import React from "react";
import { render, screen } from "@testing-library/react";
import PatientsContainer from "./PatientsContainer";

test("renders learn react link", () => {
  render(<PatientsContainer />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
