import React, { useState } from 'react'


interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("")
  const [password, setPasword] = useState("")
  const [error, setError] = useState("")
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Email gerekli")
    if (!email.includes("@")) return setError("Geçerli bir email değil")
    if (!password) return setError("Şifre gerekli")
    setError("")
    onSubmit({ email, password })
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <p role='alert' >{error}</p>}
        <input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <input type='password' value={password} placeholder='Password' onChange={(e) => setPasword(e.target.value)} />
        <button type='submit'>Giriş yap</button>
      </form>
    </>
  )
}

export default LoginForm