const AdminContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <section className="p-3">{children}</section>;
};

export default AdminContainer;
