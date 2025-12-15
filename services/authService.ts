// services/authService.ts

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  passwordConfirm: string;
}

export async function login(data: LoginData) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function signup(data: SignupData) {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}
