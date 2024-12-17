"use client";
import Image from "next/image";
import Link from "next/link";
import AuthContainer from "./AuthContainer";
import { FormEvent, useRef, useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal";
import { useTranslations } from "next-intl";
import { login } from "@/utils/fetchData";
import Cookies from "js-cookie";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

const Login = () => {
  const t = useTranslations("Auth.login");
  const inputs = useTranslations("Auth.inputs");
  const tErrors = useTranslations("Errors");
  const [resetPassword, setResetPassword] = useState(false);
  const [message, setMessage] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMessage("");
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await login({ user: data });

    if (res.rs === 400) {
      if (res.msg === "User not found") {
        setMessage(tErrors("userNotFound"));
      } else if (res.msg === "Invalid password") {
        setMessage(tErrors("invalidPass"));
      } else {
        setMessage(tErrors("mainError"));
      }
    } else {
      Cookies.set("token", res.token);
      window.location.href = "/home";
    }
  };

  return (
    <section>
      <AuthContainer>
        <div className="flex flex-col items-center w-full">
          <Image
            className="max-w-[400px] w-full"
            src={"/auth.png"}
            alt="img"
            width={500}
            height={500}
          />
          <form
            action=""
            className="w-full space-y-3 mt-5"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full"
              name="email"
              onChange={handleChange}
              placeholder={inputs("email")}
            />
            <div className=" relative">
              <input
                type="password"
                name="password"
                ref={ref}
                onChange={handleChange}
                className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full"
                placeholder={inputs("password")}
              />
              <EyeSlashIcon
                className="w-5 absolute top-1/2 -translate-y-1/2 end-3 cursor-pointer select-none"
                onClick={() => {
                  if (ref.current) {
                    ref.current.type =
                      ref.current.type === "text" ? "password" : "text";
                  }
                }}
              />
            </div>
            <button
              type="button"
              className="my-2 block"
              onClick={() => setResetPassword(true)}
            >
              {t("forgotPassword")}
            </button>
            {message && <p className="text-red-600">{message}</p>}
            <button
              className="block bg-primary text-center w-full text-white p-3 rounded-lg hover:bg-dark transition-colors"
              type="submit"
            >
              {t("submit")}
            </button>
            <div className="pt-4 text-center">
              {t("dontHaveAccount")}{" "}
              <Link href={"/register"} className="underline text-secondary">
                {t("register")}
              </Link>
            </div>
          </form>
          {resetPassword && (
            <ResetPasswordModal setResetPassword={setResetPassword} />
          )}
        </div>
      </AuthContainer>
    </section>
  );
};

export default Login;
