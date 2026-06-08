import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Craftsmanship from '../../components/Craftsmanship';

export default function RoyalVillas() {
    return (
        <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
            <Navbar />
            <div style={{ paddingTop: '150px', paddingBottom: '50px', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3.5rem', color: '#d4af37' }}>Royal Villas Partnership</h1>
                <p style={{ color: '#aaa', maxWidth: '700px', margin: '20px auto' }}>Elevating the standard of luxury dining. We craft bespoke glass aesthetics specifically tailored to the architecture and theme of your elite estate.</p>
            </div>
            {/* Same craftsmanship component reused here for B2B feel */}
            <Craftsmanship />
            <Footer />
        </main>
    );
}