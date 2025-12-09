// app/signup/page.tsx
'use client'
import React from "react";
import SignupForm from "./SignupForm";
import { useRouter } from "next/navigation"; // veya testte sadece onSubmit handling

const SignupPage = () => {
  const router = { push: (p: string) => {} }; // test izolasyonu için, veya gerçek router

  return (
    <div>
      <SignupForm
        onSubmit={(data) => {
          // gerçek projede router.push('/dashboard') veya authContext.setUser
          router.push("/dashboard");
        }}
      />
    </div>
  );
};

export default SignupPage;
