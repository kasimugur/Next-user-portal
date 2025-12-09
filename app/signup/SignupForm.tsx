// app/signup/SignupForm.tsx
import React, { useState } from "react";
import { isEmailValid, isPasswordStrong } from "../../utils/validation";

interface SignupFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return setError("Email gerekli");
    if (!isEmailValid(email)) return setError("Geçerli bir email değil");
    if (!password) return setError("Şifre gerekli");
    if (!isPasswordStrong(password)) return setError("Şifre en az 6 karakter olmalı");
    if (password !== passwordConfirm) return setError("Şifreler eşleşmiyor");

    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Kayıt başarısız");
        return;
      }

      if (onSubmit) onSubmit({ email, password });
    } catch (err) {
      setError("Ağ hatası");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div role="alert">{error}</div>}

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        placeholder="Password confirm"
        type="password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />

      <button type="submit">Kayıt Ol</button>
    </form>
  );
};

export default SignupForm;
