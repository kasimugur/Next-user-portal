import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import LoginPage from "./page";

describe("Login Page Integration Test", () => {

  test("Başarılı login sonrası Dashboard gösterilir", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "123456");
    await user.click(screen.getByText("Giriş yap"));

    // Dashboard'un h1 elementini bekle
    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(/Hoş geldin test@test.com/i);
    }, { timeout: 3000 });
  });

});