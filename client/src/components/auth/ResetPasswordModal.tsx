import {
  forgetPassword,
  login,
  resetPassword,
  verifyCode,
} from "@/utils/fetchData";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import Cookies from "js-cookie";

const ResetPasswordModal = ({
  setResetPassword,
}: {
  setResetPassword: Dispatch<SetStateAction<boolean>>;
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [data, setData] = useState({
    email: "",
    code: "",
    newPassword: "",
  });

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-8 relative">
        <XMarkIcon
          className="w-6 cursor-pointer shrink-0 fill-gray-800 hover:text-red-500 float-right"
          onClick={() => setResetPassword(false)}
        />
        <Image
          className="mx-auto mt-8"
          src={"/logo.png"}
          alt="img"
          width={300}
          height={300}
        />
        <div>
          {activeStep === 1 && (
            <Step1
              setActiveStep={setActiveStep}
              setData={setData}
              data={data}
            />
          )}
          {activeStep === 2 && (
            <Step2
              setActiveStep={setActiveStep}
              setData={setData}
              data={data}
            />
          )}
          {activeStep === 3 && <Step3 setData={setData} data={data} />}
          <div className="flex mt-10 gap-3 justify-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`${
                  activeStep === i + 1 ? "bg-primary" : "bg-dark"
                }  w-2 h-2 rounded-full`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Step1 = ({
  setData,
  data,
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setData: Dispatch<
    SetStateAction<{ email: string; code: string; newPassword: string }>
  >;
  data: { email: string; code: string; newPassword: string };
}) => {
  const [message, setMessage] = useState("");
  const tErrors = useTranslations("Errors");
  const t = useTranslations("Auth.forgotPassword");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const res = await forgetPassword({ email: data.email });
    if (res.rs === 400) {
      setMessage(tErrors("userNotFound"));
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      <p className="text-dark mt-2">{t("enterEmailText")}</p>
      <input
        type="email"
        className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full mt-5"
        name="email"
        onChange={handleChange}
        placeholder={t("email")}
      />
      {message && <p className="text-red-600">{message}</p>}
      <button
        className="block mt-4 bg-primary text-center w-full text-white p-3 rounded-lg hover:bg-dark transition-colors"
        type="submit"
      >
        {t("send")}
      </button>
    </form>
  );
};
export const Step2 = ({
  setData,
  data,
  setActiveStep,
}: {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setData: Dispatch<
    SetStateAction<{ email: string; code: string; newPassword: string }>
  >;
  data: { email: string; code: string; newPassword: string };
}) => {
  const [message, setMessage] = useState("");
  const tErrors = useTranslations("Errors");
  const t = useTranslations("Auth.forgotPassword");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await verifyCode({ data });
    if (res.rs === 400) {
      setMessage(tErrors("invalidCode"));
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      <p className="text-dark mt-2">
        {t("checkEmail")}
        <span>{data.email}</span>
      </p>
      <input
        type="text"
        name="code"
        onChange={handleChange}
        className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full mt-5"
        placeholder={t("code")}
      />
      {message && <p className="text-red-600">{message}</p>}
      <button
        className="block mt-4 bg-primary text-center w-full text-white p-3 rounded-lg hover:bg-dark transition-colors"
        type="submit"
      >
        {t("continue")}
      </button>
    </form>
  );
};
export const Step3 = ({
  setData,
  data,
}: {
  setData: Dispatch<
    SetStateAction<{ email: string; code: string; newPassword: string }>
  >;
  data: { email: string; code: string; newPassword: string };
}) => {
  const [message, setMessage] = useState("");
  const tErrors = useTranslations("Errors");
  const t = useTranslations("Auth.forgotPassword");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await resetPassword({ data });
    if (res.rs === 400) {
      setMessage(res.msg);
    } else {
      const loginData = {
        email: data.email,
        password: data.newPassword,
      };
      const reLogin = await login({ user: loginData });
      if (reLogin.rs === 400) {
        setMessage(tErrors("mainError"));
      } else {
        Cookies.set("token", reLogin.token);
        window.location.href = "/home";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8">
      <p className="text-dark mt-2">{t("changePassword")}</p>
      <input
        type="password"
        onChange={handleChange}
        name="newPassword"
        className="rounded-xl outline-none bg-transparent placeholder:text-gray-400 border border-gray-400 px-3 p-2 w-full mt-5"
        placeholder={t("newPassword")}
      />
      {message && <p className="text-red-600">{message}</p>}
      <button
        className="block mt-4 bg-primary text-center w-full text-white p-3 rounded-lg hover:bg-dark transition-colors"
        type="submit"
      >
        {t("submit")}
      </button>
    </form>
  );
};
export default ResetPasswordModal;
