import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import LoginForm from "./LoginForm";




describe("Login form test", () => {

  test("Email boşsa hata verir", () => {
    const fn = jest.fn();
    render(<LoginForm onSubmit={fn} />)

    const button = screen.getByText("Giriş yap")
    fireEvent.click(button);

    expect(screen.getByRole("alert")).toHaveTextContent("Email gerekli")
  })
  test("Geçersiz email formatında hata verir", () => {
    const fn = jest.fn();
    render(<LoginForm onSubmit={fn} />)
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "kasim" } })
    fireEvent.click(screen.getByText("Giriş yap"))

    expect(screen.getByRole("alert")).toHaveTextContent("Geçerli bir email değil")
  })
  test("Password boşsa hata verir", () => {
    const fn = jest.fn();
    render(<LoginForm onSubmit={fn} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@test.com" },
    });

    fireEvent.click(screen.getByText("Giriş yap"));

    expect(screen.getByRole("alert")).toHaveTextContent("Şifre gerekli");
  });
  test("Valid inputlarda onSubmit tetiklenir", () => {
    const fn = jest.fn();
    render(<LoginForm onSubmit={fn} />);

    fireEvent.change(screen.getByPlaceholderText("Email"),{
      target:{value:"test@test.com"},
    });

    fireEvent.change(screen.getByPlaceholderText("Password"),{
      target: {value: "123456"}
    });

    fireEvent.click(screen.getByText("Giriş yap"));

    expect(fn).toHaveBeenCalledWith({
      email:"test@test.com",
      password:"123456",
    });
  });
});