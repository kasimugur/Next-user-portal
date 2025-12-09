// app/signup/SignupForm.tsx
'use client'
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
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4' >
      <div className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-md'>
        <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <div role="alert">{error}</div>}

          <div>
            <label className=' block text-sm font-medium text-gray-600 mb-1'>
              Email
            </label>
            <input
              className='w-full text-black border border-gray-300  rounded-lg p-2.5  focus:ring-2 focus:border-blue-500 outline-none'
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className=' block text-sm font-medium text-gray-600 mb-1'>
              Password
            </label>
            <input
              className='w-full text-black border border-gray-300  rounded-lg p-2.5  focus:ring-2 focus:border-blue-500 outline-none'
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className=' block text-sm font-medium text-gray-600 mb-1'>
              Password confirm
            </label>
            <input
              className='w-full text-black border border-gray-300  rounded-lg p-2.5  focus:ring-2 focus:border-blue-500 outline-none'
              placeholder="Password confirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition active:scale-[0.98]"
          >Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
