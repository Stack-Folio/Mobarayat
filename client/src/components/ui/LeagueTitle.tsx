const LeagueTitle = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <h2 className="my-5 mt-20 text-center font-bold text-primary border-b-2 pb-3 max-w-xl mx-auto">
      {children}
    </h2>
  );
};

export default LeagueTitle;
