const ElementContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <section className="max-w-5xl px-3 mx-auto">{children}</section>;
};

export default ElementContainer;
