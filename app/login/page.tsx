"use client"
import { useState } from "react";
import LoginForm from "./LoginForm";
import Dashboard from "../Dashboard";

const LoginPage = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  if (user) {
    return <Dashboard email={user.email} />;
  }

  return (
    <LoginForm
      onSubmit={(data) => {
        setUser({ email: data.email });
      }}
    />
  );
};

export default LoginPage;