const AdminFormsContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <div className="md:max-w-7xl mx-auto">{children}</div>;
};

export default AdminFormsContainer;
