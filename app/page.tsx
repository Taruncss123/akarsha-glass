'use client';
import { useState } from 'react';
import AuthModal from '../components/AuthModal';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import ProductSlider from '../components/ProductSlider'; // Naya Slider import kiya
import Craftsmanship from '../components/Craftsmanship';
import CartSidebar from '../components/CartSidebar';
import GlassShowcase3D from '../components/GlassShowcase3D';


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <CartSidebar />
      <Hero />
      <GlassShowcase3D />
      <Categories />
      <ProductSlider /> 
      <Craftsmanship />
    </main>
  );
}