export const isEmailValid= (email:string)=>{
  return  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};


export const isPasswordStrong = (password: string) => {
  return typeof password === "string" && password.length >= 6;
}