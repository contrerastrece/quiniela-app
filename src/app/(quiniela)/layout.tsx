// import { Footer, Sidebar, TopMenu } from "@/components";

import { Header } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      {/* <TopMenu /> */}
      <Header />

      <div className="px-0">{children}</div>
      {/* <Footer/> */}
    </main>
  );
}
