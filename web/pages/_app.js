import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AgeGate from "../components/AgeGate";
import { CartProvider } from "../context/CartContext";
import { ToastProvider } from "../context/ToastContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <ToastProvider>
        <AgeGate />
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </ToastProvider>
    </CartProvider>
  );
}
