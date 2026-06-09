'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import AuthModal from '../../components/AuthModal';
import Hero from '../../components/Hero';
import Categories from '../../components/Categories';
import Craftsmanship from '../../components/Craftsmanship';
import GlassShowcase3D from '../../components/GlassShowcase3D';

// Swiper ko dynamic import kiya hai taaki wo hide na ho
const ProductSlider = dynamic(() => import('../../components/ProductSlider'), { ssr: false });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <main style={{ backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <Hero />
      <GlassShowcase3D />
      <Categories />
      <ProductSlider /> 
      <Craftsmanship />
    </main>
  );
}