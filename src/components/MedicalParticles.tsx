import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'cross' | 'molecule' | 'dna' | 'heart';
}

const MedicalParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 15; // Número reducido para ser sutil

    // Crear partículas iniciales
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      type: ['cross', 'molecule', 'dna', 'heart'][Math.floor(Math.random() * 4)] as Particle['type']
    }));

    // Crear elementos DOM para las partículas
    particlesRef.current.forEach((particle, index) => {
      const element = document.createElement('div');
      element.className = `particle particle-${particle.type}`;
      element.style.position = 'fixed';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '1';
      element.style.fontSize = `${particle.size}px`;
      element.style.opacity = particle.opacity.toString();
      element.style.color = '#cf1dc9';
      element.style.left = `${particle.x}px`;
      element.style.top = `${particle.y}px`;
      
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
      
      container.appendChild(element);
    });

    // Animación de las partículas
    const animate = () => {
      const elements = container.querySelectorAll('.particle');
      
      particlesRef.current.forEach((particle, index) => {
        const element = elements[index] as HTMLElement;
        if (!element) return;

        // Movimiento vertical lento
        particle.y -= particle.speed;
        
        // Movimiento horizontal sutil (oscilación)
        particle.x += Math.sin(Date.now() * 0.001 + index) * 0.5;
        
        // Reiniciar partícula cuando sale de la pantalla
        if (particle.y < -50) {
          particle.y = window.innerHeight + 50;
          particle.x = Math.random() * window.innerWidth;
        }
        
        // Mantener partículas dentro del ancho de pantalla
        if (particle.x < -50) particle.x = window.innerWidth + 50;
        if (particle.x > window.innerWidth + 50) particle.x = -50;
        
        // Aplicar posición
        element.style.left = `${particle.x}px`;
        element.style.top = `${particle.y}px`;
        
        // Animación de opacidad sutil
        const newOpacity = particle.opacity + Math.sin(Date.now() * 0.002 + index) * 0.1;
        element.style.opacity = Math.max(0.05, Math.min(0.4, newOpacity)).toString();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default MedicalParticles;