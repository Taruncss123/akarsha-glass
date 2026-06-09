import '../app/globals.css';
import { CartProvider } from '../components/CartContext';
import Preloader from '../components/Preloader';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Akarsha Glass | Premium Glass Artifacts',
  description: 'Elevating 5-Star Dining & Royal Villas with bespoke hand-crafted glass artifacts.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <CartProvider>
            <Preloader />
            <Navbar />
            <CartSidebar />
            <main>{children}</main>
            <Footer />
        </CartProvider>
      </body>
    </html>
  );
}