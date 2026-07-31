import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartProvider";
import Breadcrumbs from "./components/Breadcrumbs";
import { Toaster } from "sonner";
import { getProducts } from "./utils/data";
import { Inter, Poppins } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Toaster position="top-right" style={{ top: "60px" }} />
            <Header />

            <main className="flex-1 px-4 py-4 sm:px-6 md:px-8 sm:py-6">
              <div className="w-full mx-auto max-w-7xl flex flex-col flex-1">
                <Breadcrumbs products={products} />
                <div className="flex-1 pb-3">{children}</div>
              </div>
            </main>

            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
