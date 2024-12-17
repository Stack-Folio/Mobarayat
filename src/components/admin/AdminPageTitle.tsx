const AdminPageTitle = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <h1 className="font-bold text-primary text-center text-2xl max-sm:text-xl">
      {children}
    </h1>
  );
};

export default AdminPageTitle;
