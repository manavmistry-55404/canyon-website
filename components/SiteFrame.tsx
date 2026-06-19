import { Footer } from "./Footer";
import { Header } from "./Header";
import { MotionProvider } from "./MotionProvider";

export function SiteFrame({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-shell">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <MotionProvider />
    </div>
  );
}
