import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../components/App"


describe("App Component", () => {
  test("should redirect after clicking transactions button", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    )
    const transactionsPageButton = screen.getByRole("button", { name: "Transactions Page" })
    expect(transactionsPageButton).toBeInTheDocument();
    fireEvent.click(transactionsPageButton)
    const title1 = screen.getAllByRole('heading');
    expect(title1[0]).toHaveTextContent("Transactions");
  })

  test("should redirect after clicking totals button", () => {
    render(
      <MemoryRouter initialEntries={["/transactions"]}>
        <App />
      </MemoryRouter>
    )
    const totalsPageButton = screen.getByRole("button", { name: "Totals Page" })
    expect(totalsPageButton).toBeInTheDocument();
    fireEvent.click(totalsPageButton)
    const title1 = screen.getAllByRole('heading');
    expect(title1[0]).toHaveTextContent("Total Points");
  })
})

