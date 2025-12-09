import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import LoginForm from "./LoginForm";
import LoginPage from "./page";

describe("Login form test", () => {

  test("Email boşsa hata verir", async () => {
    const user = userEvent.setup();
    const fn = jest.fn();

    render(<LoginForm onSubmit={fn} />);

    await user.click(screen.getByText("Giriş yap"));

    expect(screen.getByRole("alert")).toHaveTextContent("Email gerekli");
  });

  test("Geçersiz email formatında hata verir", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    await user.type(screen.getByPlaceholderText("Email"), "kasim");
    await user.click(screen.getByText("Giriş yap"));

    expect(screen.getByRole("alert")).toHaveTextContent("Geçerli bir email değil");
  });

  test("Password boşsa hata verir", async () => {
    const user = userEvent.setup();
    render(<LoginForm onSubmit={jest.fn()} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.click(screen.getByText("Giriş yap"));

    expect(screen.getByRole("alert")).toHaveTextContent("Şifre gerekli");
  });

  test("Doğru bilgilerle login → dashboard", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "123456");

    await act(async () => {
      await user.click(screen.getByText("Giriş yap"));
    });

    await waitFor(() => {
      expect(screen.getByText(/Hoş geldin test@test.com/i)).toBeInTheDocument();
    });
  });

  test("Yanlış bilgiler → hata mesajı", async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    await user.type(screen.getByPlaceholderText("Email"), "x@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "wrongpassword");

    await act(async () => {
      await user.click(screen.getByText("Giriş yap"));
    });

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert).toHaveTextContent("Invalid credentials");
    });
  });

});
