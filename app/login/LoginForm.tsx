'use client'
import { isEmailValid, isPasswordStrong } from '@/utils/validation';
import React, { useState } from 'react'
import { flushSync } from 'react-dom';

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
        flushSync(() => setError(data.message)); // ← flushSync ekle
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
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4' >
      <div className='w-full max-w-sm bg-white p-6 rounded-2xl shadow-md'>
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form className='space-y-4' onSubmit={handleSubmit}>
          {error && <div role="alert">{error}</div>}
          <div>
            <label className=' block text-sm font-medium text-gray-600 mb-1'>
              Email
            </label>
            <input
              className='w-full text-black border border-gray-300  rounded-lg p-2.5  focus:ring-2 focus:border-blue-500 outline-none'
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className=' block text-sm font-medium text-gray-600 mb-1'>
              Password
            </label>

            <input
              className='w-full text-black  border border-gray-300  rounded-lg p-2.5  focus:ring-2 focus:border-blue-500 outline-none'
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition active:scale-[0.98]"
          >
            Giriş yap
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm