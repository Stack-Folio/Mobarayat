const AuthContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <section className="max-w-xl px-3 mx-auto">{children}</section>;
};

export default AuthContainer;
