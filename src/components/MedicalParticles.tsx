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
    const particleCount = 25; // Aumentamos para mejor cobertura

    // Limpiar partículas existentes
    container.innerHTML = '';
    particlesRef.current = [];

    // Función para obtener la altura total del documento
    const getDocumentHeight = () => {
      const body = document.body;
      const html = document.documentElement;
      
      return Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
        window.innerHeight
      );
    };

    // Función para obtener el scroll actual
    const getScrollTop = () => {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    };

    // Crear partículas iniciales
    const createParticles = () => {
      const documentHeight = getDocumentHeight();
      
      for (let i = 0; i < particleCount; i++) {
        const particle: Particle = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * documentHeight,
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
          position: absolute;
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
    };

    // Crear partículas iniciales
    createParticles();

    // Animación de las partículas
    const animate = () => {
      const documentHeight = getDocumentHeight();
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
          particle.y = documentHeight + 100;
          particle.x = Math.random() * window.innerWidth;
        }
        
        // Mantener partículas dentro del ancho de pantalla
        if (particle.x < -100) particle.x = window.innerWidth + 100;
        if (particle.x > window.innerWidth + 100) particle.x = -100;
        
        // Aplicar posición
        particle.element.style.left = `${particle.x}px`;
        particle.element.style.top = `${particle.y}px`;
        
        // Calcular visibilidad basada en el viewport actual
        const particleScreenY = particle.y - scrollTop;
        const isInViewport = particleScreenY >= -100 && particleScreenY <= viewportHeight + 100;
        
        // Animación de opacidad sutil (efecto respiración) solo si está en viewport
        if (isInViewport) {
          const baseOpacity = particle.opacity;
          const breathingEffect = Math.sin(time * 2 + particle.oscillationOffset + index * 0.3) * 0.1;
          const newOpacity = baseOpacity + breathingEffect;
          particle.element.style.opacity = Math.max(0.05, Math.min(0.35, newOpacity)).toString();
          particle.element.style.display = 'block';
        } else {
          // Ocultar partículas que están muy lejos del viewport para optimizar
          particle.element.style.display = 'none';
        }
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar animación
    animate();

    // Manejar redimensionamiento y cambios en el contenido
    const handleResize = () => {
      const documentHeight = getDocumentHeight();
      
      // Actualizar el tamaño del contenedor
      container.style.height = `${documentHeight}px`;
      container.style.minHeight = `${documentHeight}px`;
      
      particlesRef.current.forEach(particle => {
        if (particle.x > window.innerWidth) {
          particle.x = Math.random() * window.innerWidth;
        }
        if (particle.y > documentHeight + 200) {
          particle.y = Math.random() * documentHeight;
        }
      });
    };

    // Observer para detectar cambios en el tamaño del documento
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(handleResize, 100);
    });
    
    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    // Verificar periódicamente si el documento cambió de tamaño
    const checkInterval = setInterval(() => {
      const currentHeight = getDocumentHeight();
      const containerHeight = parseInt(container.style.height) || 0;
      
      if (Math.abs(currentHeight - containerHeight) > 50) {
        handleResize();
      }
    }, 2000);

    // Inicializar el tamaño del contenedor
    handleResize();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      resizeObserver.disconnect();
      clearInterval(checkInterval);
      if (container) {
        container.innerHTML = '';
      }
      particlesRef.current = [];
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden w-full"
      style={{ 
        zIndex: 1,
        top: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        minHeight: '100vh',
        height: '100%'
      }}
      aria-hidden="true"
    />
  );
};

export default MedicalParticles;