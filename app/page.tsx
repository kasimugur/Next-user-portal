import Image from "next/image";
import LoginForm from "./login/LoginForm";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" text-center justify-center items-center flex">
      <Link href={'/login'} >login</Link>
    </div>
  );
}
