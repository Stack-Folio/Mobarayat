const Container = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <section className="max-w-7xl px-3 mx-auto">{children}</section>;
};

export default Container;
