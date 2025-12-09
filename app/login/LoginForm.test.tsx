import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import LoginForm from "./LoginForm";
import LoginPage from "./page";

describe("Login form test", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });
  const fn = jest.fn();
  const userClickLogin = () => user.click(screen.getByText("Giriş yap"));
  test("Email boşsa hata verir", async () => {


    render(<LoginForm onSubmit={fn} />);

    await userClickLogin()

    expect(screen.getByRole("alert")).toHaveTextContent("Email gerekli");
  });

  test("Geçersiz email formatında hata verir", async () => {

    render(<LoginForm onSubmit={fn} />);

    await user.type(screen.getByPlaceholderText("Email"), "kasim");
    await userClickLogin()

    expect(screen.getByRole("alert")).toHaveTextContent("Geçerli bir email değil");
  });

  test("Password boşsa hata verir", async () => {

    render(<LoginForm onSubmit={fn} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await userClickLogin()

    expect(screen.getByRole("alert")).toHaveTextContent("Şifre gerekli");
  });

  test("Doğru bilgilerle login → dashboard", async () => {

    render(<LoginForm onSubmit={fn} />);

    await user.type(screen.getByPlaceholderText("Email"), "test@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "123456");

    // await act(async () => {
    await userClickLogin()
    // });

    // onSubmit'in çağrıldığını test et
    await waitFor(() => {
      expect(fn).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "123456"
      });
    });

  });

  test("Yanlış bilgiler → hata mesajı", async () => {

    render(<LoginForm onSubmit={fn} />);

    await user.type(screen.getByPlaceholderText("Email"), "x@test.com");
    await user.type(screen.getByPlaceholderText("Password"), "wrongpassword");

    // await act(async () => {
    await userClickLogin()
    // });

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Invalid credentials");
    });
  });

});
