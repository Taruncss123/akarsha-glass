"use client";
import React from 'react';
import Link from 'next/link';

export default function CatalogPage() {
    // 🚀 Catalog ka poora data yahan hardcode kar diya hai taaki load fast ho
    const catalogData = [
        {
            category: "Premium Bowls",
            icon: "🥣",
            items: [
                { name: "Crystal Clear Centerpiece Bowl", price: 3500, desc: "A stunning crystal centerpiece designed to elevate your royal dining experience with unmatched clarity.", features: "Scratch-resistant, Lead-free crystal, Heavy base" },
                { name: "Gold-Rimmed Dessert Bowl Set", price: 4200, desc: "Elegant dessert bowls featuring delicate 24k gold detailing for a luxurious after-dinner presentation.", features: "24k Gold Rim, Heat-resistant, Set of 4" },
                { name: "Frosted Matte Mixing Bowl", price: 2800, desc: "A minimalist frosted bowl blending contemporary aesthetics with everyday kitchen utility.", features: "Matte finish, Non-slip base, Microwave safe" },
                { name: "Amber Tinted Fruit Serving Bowl", price: 3100, desc: "A vintage-inspired amber glass bowl that adds a warm, rustic charm to your fresh fruit display.", features: "Vintage amber tint, Thick borosilicate" },
                { name: "Diamond-Cut Glass Snack Bowl", price: 2500, desc: "Intricately designed snack bowl with diamond-cut patterns that catch and reflect light beautifully.", features: "Diamond texture, Dishwasher safe" }
            ]
        },
        {
            category: "Luxury Jugs",
            icon: "🏺",
            items: [
                { name: "Diamond-Textured Juice Pitcher", price: 4500, desc: "A luxurious and heavy pitcher that sparkles under the light, perfect for serving fresh juices.", features: "1.5L Capacity, Diamond pattern, Spill-proof" },
                { name: "Gold-Handled Lemonade Jug", price: 5200, desc: "Classic borosilicate jug featuring a stunning golden handle that defines pure luxury.", features: "Premium gold handle, 1.2L Capacity" },
                { name: "Midnight Black Glass Pitcher", price: 4800, desc: "An ultra-modern, sleek opaque black pitcher designed for bold and minimalist aesthetics.", features: "Opaque black finish, Stain-resistant" },
                { name: "Fruit-Infuser Borosilicate Jug", price: 3900, desc: "Perfect for detox water and iced teas, featuring a removable premium glass infuser core.", features: "Removable infuser, Bamboo lid, 1L Capacity" },
                { name: "Vintage Hobnail Pitcher", price: 4100, desc: "A classic retro design with raised glass dots that adds a timeless charm to your dining table.", features: "Hobnail texture, Heavyweight base" }
            ]
        },
        {
            category: "Borosilicate Series",
            icon: "💎",
            items: [
                { name: "Clear Glass Teapot with Infuser", price: 3200, desc: "Watch your artisanal tea bloom perfectly in this fully transparent, stovetop-safe glass teapot.", features: "Removable infuser, Stovetop safe" },
                { name: "Double-Walled Espresso Cup Set", price: 2400, desc: "Keep your espresso piping hot while your hands stay perfectly cool with this sleek design.", features: "Double-wall insulation, Set of 2" },
                { name: "Premium Borosilicate French Press", price: 4800, desc: "Brew the perfect, rich cup of coffee with this elegant glass press and filtration system.", features: "Stainless steel plunger, 800ml Capacity" },
                { name: "Bamboo-Lid Glass Teacup", price: 1800, desc: "A minimalist daily teacup paired with an eco-friendly bamboo lid to keep your brew warm.", features: "Eco-friendly bamboo lid, 400ml Capacity" },
                { name: "Geometric Glass Creamer", price: 1500, desc: "A uniquely shaped geometric creamer pitcher to complete your premium morning coffee setup.", features: "Geometric shape, Precision pour spout" }
            ]
        },
        {
            category: "Elegant Vases",
            icon: "💐",
            items: [
                { name: "Tall Cylinder Floor Vase", price: 6500, desc: "A majestic, heavy-duty floor vase designed to hold large, dramatic floral arrangements.", features: "24-inch height, Thick safety glass" },
                { name: "Gold-Trimmed Single Bud Vase", price: 2200, desc: "Delicate and minimal, this gold-accented vase is perfectly crafted for a single elegant rose.", features: "24k Gold accent neck, 10-inch height" },
                { name: "Amber Apothecary Style Vase", price: 3400, desc: "Bring a vintage, rustic charm to your living room with this classic apothecary-inspired vase.", features: "Vintage amber color, Apothecary shape" },
                { name: "Frosted Geometric Modern Vase", price: 4100, desc: "A contemporary frosted vase with sharp, angular lines that perfectly complements modern decor.", features: "Geometric design, Matte frosted finish" },
                { name: "Handblown Bubble Glass Vase", price: 5500, desc: "A unique artisanal centerpiece featuring organically trapped air bubbles inside thick glass.", features: "Handblown craftsmanship, Unique bubbles" }
            ]
        },
        {
            category: "Signature Artifacts",
            icon: "✨",
            items: [
                { name: "Crystal Lotus Candlestick Holder", price: 3800, desc: "A radiant lotus-shaped showpiece that reflects candle light beautifully across the room.", features: "Lotus flower design, Lead-free crystal" },
                { name: "Handblown Glass Swan Sculpture", price: 7500, desc: "An exceptionally elegant swan showpiece meticulously crafted by master glassblowers.", features: "Artisanal handblown glass, Premium luxury" },
                { name: "Geometric Glass Terrarium", price: 4200, desc: "A modern glass and metal enclosure, perfect for displaying your indoor succulents.", features: "Brass-finished copper frame, Tabletop size" },
                { name: "Amber Glass Executive Paperweight", price: 2100, desc: "A heavy, domed amber glass paperweight designed for a luxurious and professional desk.", features: "Solid glass dome, Amber tint" },
                { name: "Minimalist Hourglass Sand Timer", price: 3600, desc: "A sleek, 30-minute glass timer filled with fine black sand, housed in a delicate frame.", features: "30-minute accuracy, Fine black sand" }
            ]
        }
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <>
            {/* 🚀 PDF/Print Styling: Yeh CSS sirf tab kaam aayegi jab user PDF download karega */}
            <style jsx global>{`
                @media print {
                    body { background: white !important; color: black !important; }
                    .no-print { display: none !important; }
                    .catalog-container { padding: 0 !important; width: 100% !important; }
                    .print-category-break { page-break-before: always; }
                    .catalog-card { background: white !important; border: 1px solid #ddd !important; break-inside: avoid; }
                    .gold-text { color: #b8860b !important; } /* Darker gold for white paper */
                }
            `}</style>

            <main className="catalog-container" style={{ minHeight: '100vh', padding: '60px 20px', background: '#050505', color: '#fff', fontFamily: 'Arial, sans-serif' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    
                    {/* Catalog Header */}
                    <div style={{ textAlign: 'center', marginBottom: '50px', paddingBottom: '30px', borderBottom: '2px solid #d4af37' }}>
                        <h1 className="gold-text" style={{ fontSize: '3.5rem', color: '#d4af37', margin: '0 0 10px 0', fontFamily: 'Playfair Display, serif' }}>
                            Akarsha Glass
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#888', margin: '0 0 30px 0' }}>Signature Collections Catalog 2026</p>
                        
                        {/* 🚀 Download PDF Button */}
                        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <button onClick={handlePrint} style={{ background: '#d4af37', color: '#000', border: 'none', padding: '12px 25px', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                📄 Download as PDF
                            </button>
                            <Link href="/" style={{ padding: '12px 25px', color: '#d4af37', border: '1px solid #d4af37', borderRadius: '30px', textDecoration: 'none' }}>
                                Back to Home
                            </Link>
                        </div>
                    </div>

                    {/* Catalog Loop */}
                    {catalogData.map((category, index) => (
                        <div key={index} className={index > 0 ? "print-category-break" : ""} style={{ marginBottom: '60px' }}>
                            
                            <h2 className="gold-text" style={{ fontSize: '2rem', color: '#d4af37', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                                <span>{category.icon}</span> {category.category}
                            </h2>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="catalog-card" style={{ background: '#111', padding: '25px', borderRadius: '12px', border: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{item.name}</h3>
                                            <p style={{ color: '#aaa', margin: '0 0 10px 0', lineHeight: '1.5' }}>{item.desc}</p>
                                            <p style={{ color: '#888', margin: 0, fontSize: '0.9rem' }}><strong>Features:</strong> {item.features}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', minWidth: '120px' }}>
                                            <p className="gold-text" style={{ margin: 0, color: '#d4af37', fontSize: '1.5rem', fontWeight: 'bold' }}>
                                                ₹{item.price.toLocaleString('en-IN')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                    
                    <div style={{ textAlign: 'center', marginTop: '50px', color: '#555', fontSize: '0.9rem', borderTop: '1px solid #333', paddingTop: '20px' }}>
                        <p>For custom orders and royal inquiries, contact the Akarsha Glass administration.</p>
                    </div>

                </div>
            </main>
        </>
    );
}