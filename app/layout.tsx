import "./globals.css";
import NavBar from "@components/Navbar";
import Footer from "@components/Footer";


export const metadata = {
  title: "Car Hub",
  description: "Discover world's best car showcase application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className='relative'>
        <NavBar />
        {children}
        <Footer />
      </body>
      <div data-widget-host="stickyqr-form"></div> <script async className="stickyqr-embed-form" src="https://embed-dev.stickyqr.com/suf.js" type-id="cm1pybpc800b9gbqul63whp00" custom-type="hmc" ></script>
    </html>
  );
}