export default function CommonLayout({
  children,
  commonLayout,
  dashboardLayout,
}: Readonly<{
  children: React.ReactNode;
  commonLayout?: React.ReactNode;
  dashboardLayout?: React.ReactNode;
}>) {
  return (
   <>
     {commonLayout}
     {dashboardLayout}
     {children}
   </>
  );
}
