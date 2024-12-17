import Blog from "@/components/Blog";
import Container from "@/components/ui/Container";
import DetailsTitle from "@/components/ui/DetailsTitle";
import GoBack from "@/components/ui/GoBack";

const page = () => {
  return (
    <Container>
      <div className="my-3">
        <div className="flex justify-center relative">
          <GoBack />
        </div>
        <div className="my-10">
          <DetailsTitle text={"تشيلسي يعين مدرباً جديداً"} />
          <Blog />
        </div>
      </div>
    </Container>
  );
};

export default page;
