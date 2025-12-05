import { isEmailValid, isPasswordStrong } from "./validation";


describe("email and password validation",()=>{


test("Geçerli email formatını doğrular", () => {
  expect(isEmailValid("test@test.com")).toBe(true);
  expect(isEmailValid("kasim@ugur.dev")).toBe(true);
});

test("Geçersiz email formatlarını reddeder", () => {
  expect(isEmailValid("kasim")).toBe(false);
  expect(isEmailValid("kasim@")).toBe(false);
  expect(isEmailValid("kasim.com")).toBe(false);
});

test("Şifre en az 6 karakter olmalı", () => {
  expect(isPasswordStrong("123456")).toBe(true);
  expect(isPasswordStrong("abcdef")).toBe(true);
  expect(isPasswordStrong("123")).toBe(false);
});

})

