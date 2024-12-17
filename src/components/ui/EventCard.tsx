import Image from "next/image";
import Link from "next/link";

const EventCard = () => {
  return (
    <div className="md:flex gap-4">
      <Image
        src={"/blog.png"}
        alt="blog"
        width={300}
        height={300}
        className="w-full rounded-xl md:max-w-[380px]"
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-primary text-xl mb-4 font-bold my-2">
            تشسلي يعين مدرباً جديداً
          </h1>
          <span className="font-medium text-lg text-gray-400">23/06/2024</span>
        </div>
        <p className="mb-10">
          {" "}
          في ظل الأوضاع المتقبلة في عالم كرة القدم, شهدت الأاندية الكبرى تحولات
          ملحوظة في طواقمها التدريبية. حيث قام تشيسلي بتعيين مدرب جديد في محاولة
          لتحسين الأداء بينما يواجه مانشستر يونايتد تحديات مماثلة مع ...
        </p>
        <Link
          href={"/events/dom"}
          className="border border-primary p-1 px-6 mt-10 rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
        >
          المزيد
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
