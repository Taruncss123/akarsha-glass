import Navbar from '../../components/Navbar';

export default function Contact() {
    return (
        <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
            <Navbar />
            <div style={{ paddingTop: '150px', paddingBottom: '100px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h1 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: '#d4af37' }}>Contact Akarsha</h1>
                <p style={{ color: '#aaa', marginTop: '20px' }}>For custom B2B orders and royal villa aesthetics inquiries.</p>
                
                <form style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="text" placeholder="Your Name" required style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                    <input type="email" placeholder="Email Address" required style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '8px' }} />
                    <textarea placeholder="Your Message or Order Details" required style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', borderRadius: '8px', minHeight: '150px' }}></textarea>
                    <button type="submit" style={{ padding: '15px', background: '#d4af37', border: 'none', color: '#000', fontWeight: 'bold', fontSize: '1.1rem', borderRadius: '8px', cursor: 'pointer' }}>Send Inquiry</button>
                </form>
            </div>
        </main>
    );
}