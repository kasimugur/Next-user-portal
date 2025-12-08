import { isEmailValid, isPasswordStrong } from '@/utils/validation';
import React, { useState } from 'react'


interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return setError("Email gerekli")
    if (!isEmailValid(email)) return setError("Geçerli bir email değil")
    if (!isPasswordStrong(password)) return setError("Şifre gerekli")

    setError("")

    try {
      // MSW tarafından yakalanabilir fetch çağrısı
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log('📦 Response data:', data);

      if (!data.success) {
        console.log('❌ Setting error:', data.message);
        setError(data.message);
        return;
      }

      // Başarılı login
      console.log('🎉 Calling onSubmit');
      onSubmit({ email, password });
    } catch (err) {
      setError("Bir hata oluştu");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div role="alert">{error}</div>}
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Giriş yap</button>
      </form>
    </>
  )
}

export default LoginForm