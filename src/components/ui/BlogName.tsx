const BlogName = ({ text }: { text: string }) => {
  return (
    <div className="mt-5 flex justify-center items-center">
      <h1 className="text-primary font-bold sm:text-xl text-sm">{text}</h1>
    </div>
  );
};

export default BlogName;
