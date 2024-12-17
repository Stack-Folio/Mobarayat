import Container from "@/components/ui/Container";
import EventCard from "@/components/ui/EventCard";
import Searchbar from "@/components/ui/Searchbar";

const page = () => {
  return (
    <div className="my-16">
      <Container>
        <Searchbar />
        <div className="my-10 space-y-8">
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </Container>
    </div>
  );
};

export default page;
