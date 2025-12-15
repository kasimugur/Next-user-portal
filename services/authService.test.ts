import { login, signup } from "./authService";

describe("auth service test", () => {

  test("login başarılı sonuç döner", async () => {
    const res = await login({ email: "test@test.com", password: "123456" });
    expect(res.success).toBe(true);
  });

  test("signup fail (409) response döner", async () => {
    const res = await signup({
      email: "exists@test.com",
      password: "123",
      passwordConfirm: "123"
    });
    expect(res.success).toBe(false);
  });

})
