import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  type: 'cross' | 'molecule' | 'dna' | 'heart';
  element?: HTMLElement;
  oscillationOffset: number;
}

const MedicalParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particleCount = 25;

    // Limpiar partículas existentes
    container.innerHTML = '';
    particlesRef.current = [];

    // Función para obtener el scroll actual
    const getScrollTop = () => {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    // Crear partículas iniciales
    const createParticles = () => {
      const viewportHeight = window.innerHeight;
      
      for (let i = 0; i < particleCount; i++) {
        const particle: Particle = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * viewportHeight * 3, // Distribuir en 3 pantallas de altura
          size: Math.random() * 16 + 12,
          speed: Math.random() * 0.8 + 0.3,
          opacity: Math.random() * 0.25 + 0.1,
          type: ['cross', 'molecule', 'dna', 'heart'][Math.floor(Math.random() * 4)] as Particle['type'],
          oscillationOffset: Math.random() * Math.PI * 2
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
        document.body.appendChild(element); // Agregar al body en lugar del contenedor
        particlesRef.current.push(particle);
      }
    };

    // Crear partículas iniciales
    createParticles();

    // Animación de las partículas
    const animate = () => {
      const scrollTop = getScrollTop();
      const viewportHeight = window.innerHeight;
      
      particlesRef.current.forEach((particle, index) => {
        if (!particle.element) return;

        // Movimiento vertical lento hacia arriba
        particle.y -= particle.speed;
        
        // Movimiento horizontal sutil (oscilación) con offset único
        const time = Date.now() * 0.001;
        particle.x += Math.sin(time + particle.oscillationOffset + index * 0.5) * 0.8;
        
        // Reiniciar partícula cuando sale de la pantalla por arriba
        if (particle.y < -100) {
          particle.y = viewportHeight + 100;
          particle.x = Math.random() * window.innerWidth;
        }
        
        // Mantener partículas dentro del ancho de pantalla
        if (particle.x < -100) particle.x = window.innerWidth + 100;
        if (particle.x > window.innerWidth + 100) particle.x = -100;
        
        // Aplicar posición (position fixed se mantiene relativo al viewport)
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // Verificar si está en el viewport
        const isInViewport = particle.y >= -100 && particle.y <= viewportHeight + 100;
        
        // Animación de opacidad sutil (efecto respiración) solo si está en viewport
        if (isInViewport) {
          const baseOpacity = particle.opacity;
          const breathingEffect = Math.sin(time * 2 + particle.oscillationOffset + index * 0.3) * 0.1;
          const newOpacity = baseOpacity + breathingEffect;
          particle.element.style.opacity = Math.max(0.05, Math.min(0.35, newOpacity)).toString();
          particle.element.style.display = 'block';
        } else {
          // Ocultar partículas que están fuera del viewport
          particle.element.style.display = 'none';
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animación
    animate();

    // Manejar redimensionamiento
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
      
      // Remover partículas del DOM
      particlesRef.current.forEach(particle => {
        if (particle.element && particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="pointer-events-none"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};

export default MedicalParticles;