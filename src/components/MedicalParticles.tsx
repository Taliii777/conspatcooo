import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'cross' | 'molecule' | 'dna' | 'heart';
  element?: HTMLElement;
}

const MedicalParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 12; // Número reducido para ser sutil

    // Limpiar partículas existentes
    container.innerHTML = '';
    particlesRef.current = [];

    // Crear partículas iniciales
    for (let i = 0; i < particleCount; i++) {
      const particle: Particle = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 16 + 12,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.25 + 0.1,
        type: ['cross', 'molecule', 'dna', 'heart'][Math.floor(Math.random() * 4)] as Particle['type']
      };

      // Crear elemento DOM
      const element = document.createElement('div');
      element.className = `medical-particle particle-${particle.type}`;
      element.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 1;
        font-size: ${particle.size}px;
        opacity: ${particle.opacity};
        color: #cf1dc9;
        left: ${particle.x}px;
        top: ${particle.y}px;
        user-select: none;
        will-change: transform, opacity;
        transition: opacity 0.3s ease;
      `;
      
      // Contenido según el tipo
      switch (particle.type) {
        case 'cross':
          element.innerHTML = '✚';
          break;
        case 'molecule':
          element.innerHTML = '⚛';
          break;
        case 'dna':
          element.innerHTML = '🧬';
          break;
        case 'heart':
          element.innerHTML = '♡';
          break;
      }
      
      particle.element = element;
      container.appendChild(element);
      particlesRef.current.push(particle);
    }

    // Animación de las partículas
    const animate = () => {
      particlesRef.current.forEach((particle, index) => {
        if (!particle.element) return;

        // Movimiento vertical lento hacia arriba
        particle.y -= particle.speed;
        
        // Movimiento horizontal sutil (oscilación)
        particle.x += Math.sin(Date.now() * 0.001 + index * 0.5) * 0.8;
        
        // Reiniciar partícula cuando sale de la pantalla por arriba
        if (particle.y < -100) {
          particle.y = window.innerHeight + 100;
          particle.x = Math.random() * window.innerWidth;
        }
        
        // Mantener partículas dentro del ancho de pantalla
        if (particle.x < -100) particle.x = window.innerWidth + 100;
        if (particle.x > window.innerWidth + 100) particle.x = -100;
        
        // Aplicar posición
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // Animación de opacidad sutil (efecto respiración)
        const baseOpacity = particle.opacity;
        const breathingEffect = Math.sin(Date.now() * 0.002 + index * 0.3) * 0.1;
        const newOpacity = baseOpacity + breathingEffect;
        particle.element.style.opacity = Math.max(0.05, Math.min(0.35, newOpacity)).toString();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animación
    animate();

    // Manejar redimensionamiento de ventana
    const handleResize = () => {
      particlesRef.current.forEach(particle => {
        if (particle.x > window.innerWidth) {
          particle.x = Math.random() * window.innerWidth;
        }
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.innerHTML = '';
      }
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
};

export default MedicalParticles;