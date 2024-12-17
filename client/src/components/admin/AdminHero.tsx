import Link from "next/link";

const AdminHero = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-gray-800 text-4xl font-extrabold relative after:absolute after:-bottom-5 after:h-1 after:w-1/2 after:bg-primary after:left-0 after:right-0 after:mx-auto after:rounded-full">
          مباريات اليوم
        </h2>
        <div className="mt-12">
          <p className="text-gray-800 text-base">
            مرحبًا بك في لوحة التحكم. يمكنك من هنا إدارة المقالات بسهولة، إضافة
            مقالات جديدة، أو تعديل المقالات الحالية.{" "}
          </p>
        </div>

        <div className="flex max-sm:flex-col justify-center gap-6 mt-12">
          <Link
            href={"/admin/new-blog"}
            className="min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border text-white border-primary bg-primary hover:bg-transparent hover:text-primary transition-all duration-300"
          >
            أضافة موضوع جديد
          </Link>
          <Link
            href={"/admin/all-blogs"}
            className="text-gray-800 min-w-[140px] rounded px-4 py-2.5 text-sm tracking-wider font-semibold outline-none border border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            تعديل موضوع حالي
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
