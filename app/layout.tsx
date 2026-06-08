import './globals.css';
import { CartProvider } from '../components/CartContext';
import Preloader from '../components/Preloader';

export const metadata = {
  title: 'Akarsha Glass | Premium Glass Artifacts',
  description: 'Elevating 5-Star Dining & Royal Villas with bespoke hand-crafted glass artifacts.',
  keywords: 'luxury glass, premium bowls, borosilicate glass, Akarsha Glass, royal villa decor',
  authors: [{ name: 'Tech Solutions' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* CartProvider poori app ko manage karega */}
        <CartProvider>
            {children}
        </CartProvider>
      </body>
    </html>
  );
}