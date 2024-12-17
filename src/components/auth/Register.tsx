"use client";
import Image from "next/image";
import AuthContainer from "./AuthContainer";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { register } from "@/utils/fetchData";
import SuccessModal from "../ui/SuccessModal";
import ErrorModal from "../ui/ErrorModal";
import { EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const t = useTranslations("Auth.register");
  const tErrors = useTranslations("Errors");
  const inputs = useTranslations("Auth.inputs");
  const [message, setMessage] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const [state, setState] = useState({
    error: false,
    success: false,
  });
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (data.firstName.length <= 1) {
      return setError(tErrors("firstName"));
    }
    if (data.lastName.length <= 1) {
      return setError(tErrors("lastName"));
    }
    if (!emailPattern.test(data.email)) {
      return setError(tErrors("email"));
    }
    if (data.password.length < 6) {
      return setError(tErrors("password"));
    }

    const signup = await register({ user: data });

    if (signup.rs === 400) {
      setMessage(tErrors("emailExist"));
      return setState({ error: true, success: false });
    }

    setState({ error: false, success: true });
  };

  return (
    <section>
      <AuthContainer>
        {state.success && (
          <SuccessModal
            title={"تم إنشاء الحساب"}
            text="تم إنشاءالحساب بنجاح يمكنك الأن تسجيل الدخول إلى حسابك"
            btn="تسجل الدخول"
            href="/login"
          />
        )}
        {state.error && (
          <ErrorModal
            title={"حدث خطأ !"}
            text={message}
            btn="إغلاق"
            setState={setState}
          />
        )}
        <div className="flex flex-col items-center w-full">
          <Image
            className="max-w-[400px]  w-full"
            src={"/auth.png"}
            alt="img"
            width={500}
            height={500}
          />
          <form
            action=""
            className="w-full space-y-3  mt-5"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-5 items-center">
              <input
                type="text"
                name="firstName"
                className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full"
                onChange={handleChange}
                placeholder={inputs("name")}
              />
              <input
                type="text"
                className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full"
                name="lastName"
                onChange={handleChange}
                placeholder={inputs("lastName")}
              />
            </div>
            <input
              type="email"
              className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full"
              name="email"
              onChange={handleChange}
              placeholder={inputs("email")}
            />
            <div className="relative">
              <input
                type="password"
                onChange={handleChange}
                name="password"
                className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full"
                ref={ref}
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
            {error && <p className="text-red-600">*{error}</p>}
            <button
              className="block bg-primary text-center w-full text-white p-3 rounded-lg hover:bg-dark transition-colors"
              type="submit"
            >
              {t("submit")}
            </button>
            <div className="pt-4 text-center">
              {t("alreadyHaveAccount")}{" "}
              <Link href={"/login"} className="underline text-secondary">
                {t("login")}
              </Link>
            </div>
          </form>
        </div>
      </AuthContainer>
    </section>
  );
};

export default Register;
