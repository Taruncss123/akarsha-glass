"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function GlassShowcase3D() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // 1. Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // alpha: true ensures background is transparent
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // 2. High-End Glass Material (Realistic Refraction)
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color:0xffffff,
            transmission: 1.0,      
            opacity: 0.1,
            metalness: 0.1,
            roughness: 0.02,        
            ior: 1.52,              
            thickness: 2.0,         
            specularIntensity: 1.0,
            clearcoat: 1.0,         
            clearcoatRoughness: 0.1
        });

        // 3. Premium Abstract Geometry (Torus Knot)
        const geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 150, 32);
        const glassObject = new THREE.Mesh(geometry, glassMaterial);
        scene.add(glassObject);

        // 4. Dynamic Lighting (Golden & Blue accents)
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const goldLight = new THREE.PointLight(0xd4af37, 30); 
        goldLight.position.set(5, 5, 5);
        scene.add(goldLight);

        const blueLight = new THREE.PointLight(0x4444ff, 20); 
        blueLight.position.set(-5, -5, 2);
        scene.add(blueLight);
        
        const whiteLight = new THREE.PointLight(0xffffff, 15);
        whiteLight.position.set(0, -5, 5);
        scene.add(whiteLight);

        // 5. Mouse Interaction Setup
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (event) => {
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;
            mouseX = (event.clientX - windowHalfX) * 0.002;
            mouseY = (event.clientY - windowHalfY) * 0.002;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // 6. Smooth Animation Loop
        const clock = new THREE.Clock();
        let animationFrameId;

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;

            glassObject.rotation.y += 0.005 + (targetX - glassObject.rotation.y) * 0.05;
            glassObject.rotation.x += 0.005 + (targetY - glassObject.rotation.x) * 0.05;
            glassObject.position.y = Math.sin(elapsedTime * 1.5) * 0.2;

            renderer.render(scene, camera);
        };
        
        animate();

        // Responsive Resize Handler
        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup Function
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose(); 
            glassMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <section style={{ 
            padding: '80px 20px', 
            // Subtle glowing background behind the glass
            background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, #050505 70%)', 
            textAlign: 'center', 
            position: 'relative', 
            overflow: 'hidden' 
        }}>
            <h2 style={{ fontFamily: 'Playfair Display', fontSize: '3rem', color: '#fff', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
                The <span style={{ color: '#d4af37' }}>Glass</span> Masterpiece
            </h2>
            <p style={{ color: '#aaa', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', position: 'relative', zIndex: 10 }}>
                Interact with our signature borosilicate structure. A seamless blend of durability and elegance.
            </p>
            
            {/* 🚀 3D Canvas Container with Glassmorphism Effect */}
            <div 
                ref={mountRef} 
                style={{ 
                    cursor: 'grab', 
                    width: '100%', 
                    height: '500px', 
                    maxWidth: '1000px', 
                    margin: '0 auto',
                    
                    // Glassmorphism Styles (Transparent Glass Effect)
                    background: 'rgba(255, 255, 255, 0.03)', // Halki si safed transparency
                    backdropFilter: 'blur(20px)',            // Peeche ka hissa blur karega
                    WebkitBackdropFilter: 'blur(20px)',      // Safari browser support ke liye
                    borderRadius: '24px',                    // Smooth curved corners
                    border: '1px solid rgba(255, 255, 255, 0.1)', // Sheeshe ki glowing outline
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.08)', // Gold inner glow aur shadow
                    
                    position: 'relative',
                    zIndex: 5
                }}
            ></div>
        </section>
    );
}