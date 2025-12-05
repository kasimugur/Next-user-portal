export const isEmailValid= (email:string)=>{
  return email.includes("@") && email.includes(".")
}

export const isPasswordStrong = (password: string) => {
  return password.length >= 6;
}