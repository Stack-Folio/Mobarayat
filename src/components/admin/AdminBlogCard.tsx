"use client";
import Image from "next/image";
import Link from "next/link";
import DeleteArtModal from "../ui/DeleteArtModal";
import { useState } from "react";

const AdminBlogCard = ({
  name,
  num,
  img,
  id,
  token,
}: {
  name: string;
  num: number;
  img: string;
  id: string;
  token: string;
}) => {
  const [modal, setModal] = useState(false);
  const deleteBtn = async () => {
    setModal(true);
  };

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] border p-2 w-full max-w-xs rounded-lg overflow-hidden">
      {modal && <DeleteArtModal setModal={setModal} token={token} id={id} />}
      <div className="">
        <Image
          src={img}
          alt="img"
          width={400}
          height={400}
          className="w-full rounded-lg"
        />
      </div>
      <div className="p-4 text-center">
        <span className="block font-bold text-2xl">{num + 1}</span>
        <h2 className="font-bold mt-5">{name}</h2>
        <div className="flex gap-2">
          <Link
            href={`/admin/edit-article/${id}`}
            className="mt-6 px-3 py-2 w-full rounded-lg text-white text-xs tracking-wider font-semibold border-none outline-none bg-primary hover:bg-dark transition-colors"
          >
            تعديل المقالة
          </Link>
          <button
            onClick={deleteBtn}
            className="mt-6 px-3 py-2 w-full rounded-lg text-white text-xs tracking-wider font-semibold border-none outline-none bg-red-600 hover:bg-dark transition-colors"
          >
            حذف المقالة
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCard;
