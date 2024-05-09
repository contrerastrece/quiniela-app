import { Footer, Header } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="min-h-[calc(100vh_-_7rem)]">{children}</div>
      <Footer />
    </div>
  );
}
