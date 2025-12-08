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
    const user = userEvent.setup({ delay: null });
    const fn = jest.fn();
    render(<LoginForm onSubmit={fn} />);
    
    await user.type(screen.getByPlaceholderText("Email"), "kasim");
    await user.click(screen.getByText("Giriş yap"));

    expect(screen.getByRole("alert")).toHaveTextContent("Geçerli bir email değil");
  });

  test("Password boşsa hata verir", async () => {
    const user = userEvent.setup({ delay: null });
    const fn = jest.fn();
    render(<LoginForm onSubmit={fn} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.click(screen.getByText("Giriş yap"));

    expect(screen.getByRole("alert")).toHaveTextContent("Şifre gerekli");
  });

  test("Doğru bilgilerle login → dashboard", async () => {
    const user = userEvent.setup({ delay: null });
    
    const { container } = render(<LoginPage />);

    // Email ve password gir
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    
    await user.type(emailInput, "test@test.com");
    await user.type(passwordInput, "123456");

    // Submit butonuna tıkla
    const submitButton = screen.getByText("Giriş yap");
    
    await act(async () => {
      await user.click(submitButton);
    });

    // Biraz bekle ve tekrar kontrol et
    await new Promise(resolve => setTimeout(resolve, 100));

    // Dashboard'u kontrol et
    await waitFor(
      () => {
        // Debug: DOM'u göster
        screen.debug();
        
        // Dashboard text'ini ara
        const dashboardText = screen.queryByText(/Hoş geldin/i);
        expect(dashboardText).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  }, 20000);

  test("Yanlış bilgiler → hata mesajı", async () => {
    const user = userEvent.setup({ delay: null });
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");

    await user.type(emailInput, "x@test.com");
    await user.type(passwordInput, "wrongpassword");
    
    await act(async () => {
      await user.click(screen.getByText("Giriş yap"));
    });

    // Biraz bekle
    await new Promise(resolve => setTimeout(resolve, 100));

    // Hata mesajını bekle
    await waitFor(
      () => {
        screen.debug();
        const alert = screen.queryByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent("Invalid credentials");
      },
      { timeout: 5000 }
    );
  }, 20000);
});