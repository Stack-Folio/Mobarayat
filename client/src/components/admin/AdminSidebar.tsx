"use client";
import {
  ChatBubbleBottomCenterTextIcon,
  ChevronLeftIcon,
  DocumentDuplicateIcon,
  PlusCircleIcon,
  PowerIcon,
  Squares2X2Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AdminSidebar = () => {
  const [active, setActive] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const nameCookies = Cookies.get("name");
    const userData = nameCookies ? JSON.parse(nameCookies) : null;
    setUser(userData);
  }, []);

  if (!active) {
    return (
      <PhoneSidebar
        setActive={setActive}
        nameIcon={user && user.firstName[0]}
      />
    );
  }
  return (
    <nav className="bg-dark h-screen fixed top-0 start-0 min-w-[260px] py-6 px-4 flex flex-col open-smooth z-[9999]">
      <button
        className=" absolute -end-6 shadow-md top-1/2 -translate-y-1/2 bg-white rounded-full p-2"
        onClick={() => setActive(false)}
      >
        <XMarkIcon className="w-8 h-8" />
      </button>
      <div className="flex flex-wrap flex-col justify-center items-center">
        <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center font-bold text-black text-xl">
          <span>{user && user.firstName[0]}</span>
        </div>

        <div className="text-center mt-4">
          <p className="text-base text-white mb-3">{`${
            user && user.firstName
          } ${user && user.lastName}`}</p>
          <p className="text-xs text-gray-300 mt-0.5">{user && user.email}</p>
        </div>
      </div>

      <hr className="mt-4 border-gray-600" />

      <ul className="space-y-3 mt-8">
        <li>
          <Link
            href="/admin"
            onClick={() => setActive(false)}
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <Squares2X2Icon className="w-[18px] h-[18px] me-4" />
            <span>لوحة التحكم</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/new-blog"
            onClick={() => setActive(false)}
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <PlusCircleIcon className="w-[18px] h-[18px] me-4" />
            <span>أضافة مقالة جديدة</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/all-blogs"
            onClick={() => setActive(false)}
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <DocumentDuplicateIcon className="w-[18px] h-[18px] me-4" />
            <span>جميع المقالات</span>
          </Link>
        </li>
        <li>
          <Link
            href="/admin/translator"
            onClick={() => setActive(false)}
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <ChatBubbleBottomCenterTextIcon className="w-[18px] h-[18px] me-4" />
            <span>تعديل كلمة</span>
          </Link>
        </li>
      </ul>

      <ul className="space-y-3 mt-auto">
        <li>
          <a
            href="/"
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <UserCircleIcon className="w-[18px] h-[18px] me-4" />
            <span>الصفحة الرئيسية</span>
          </a>
        </li>
        <li>
          <a
            href="/api/logout"
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <PowerIcon className="w-[18px] h-[18px] me-4" />
            <span>تسجيل الخروج</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export const PhoneSidebar = ({
  setActive,
  nameIcon,
}: {
  setActive: Dispatch<SetStateAction<boolean>>;
  nameIcon: string;
}) => {
  return (
    <nav className="bg-dark min-w-[55px] h-screen fixed top-0 start-0 py-6 px-0 flex flex-col">
      <button
        className=" absolute -end-3 shadow-md top-1/2 -translate-y-1/2 bg-white rounded-full p-2"
        onClick={() => setActive(true)}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <div className="flex flex-wrap flex-col justify-center items-center">
        <div className="bg-gray-300 w-9 h-9 rounded-full flex items-center justify-center font-bold text-black text-xl">
          <span>{nameIcon}</span>
        </div>
      </div>

      <hr className="mt-4 border-gray-600" />

      <ul className="space-y-3 mt-8">
        <li>
          <Link
            href="/admin"
            className="text-gray-300 hover:text-white text-sm flex items-center justify-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <Squares2X2Icon className="w-[22px] h-[22px]" />
          </Link>
        </li>
        <li>
          <Link
            href="/admin/new-blog"
            className="text-gray-300 hover:text-white text-sm flex items-center justify-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <PlusCircleIcon className="w-[22px] h-[22px]" />
          </Link>
        </li>
        <li>
          <Link
            href="/admin/all-blogs"
            className="text-gray-300 hover:text-white text-sm flex items-center justify-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <DocumentDuplicateIcon className="w-[22px] h-[22px]" />
          </Link>
        </li>
        <li>
          <Link
            href="/admin/translator"
            className="text-gray-300 hover:text-white text-sm flex items-center justify-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <ChatBubbleBottomCenterTextIcon className="w-[22px] h-[22px]" />
          </Link>
        </li>
      </ul>

      <ul className="space-y-3 mt-auto">
        <li>
          <a
            href="/"
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all"
          >
            <UserCircleIcon className="w-[22px] h-[22px]" />
          </a>
        </li>
        <li>
          <a
            href="/api/logout"
            className="text-gray-300 hover:text-white text-sm flex items-center hover:bg-primary rounded px-4 py-3 transition-all justify-center"
          >
            <PowerIcon className="w-[22px] h-[22px]" />
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default AdminSidebar;
