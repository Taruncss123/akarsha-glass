import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="glass-footer">
            <div className="footer-container">
                <div className="footer-col brand-col">
                    <div className="footer-logo">AKARSHA<span>.</span></div>
                    <p>Redefining luxury dining and royal aesthetics with bespoke, masterfully crafted glass artifacts.</p>
                    <div className="social-links">
                        <Link href="#">IG</Link>
                        <Link href="#">IN</Link>
                        <Link href="#">TW</Link>
                    </div>
                </div>

                <div className="footer-col links-col">
                    <h4>Collections</h4>
                    <ul>
                        <li><Link href="#">Premium Bowls</Link></li>
                        <li><Link href="#">Luxury Jugs</Link></li>
                        <li><Link href="#">Borosilicate Series</Link></li>
                        <li><Link href="#">Custom B2B Orders</Link></li>
                    </ul>
                </div>

                <div className="footer-col newsletter-col">
                    <h4>Join the Elite</h4>
                    <p>Subscribe for exclusive updates on new collections and custom B2B offers.</p>
                    <form className="newsletter-form">
                        <input type="email" placeholder="Enter your email address" required />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; 2026 Akarsha Glass. All Rights Reserved. | Designed by Tech Solutions</p>
            </div>
        </footer>
    );
}