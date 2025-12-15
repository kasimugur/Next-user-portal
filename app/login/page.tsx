'use client'
import { useState } from "react";
import LoginForm from "./LoginForm";
import Dashboard from "../Dashboard";
import { flushSync } from "react-dom";
const LoginPage = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  if (user) {
    return <Dashboard email={user.email} />;
  }

  return (
    <LoginForm
      onSubmit={(data) => {
        flushSync(() => {
          setUser({ email: data.email });
        });
      }}
    />
  );
};

export default LoginPage;