import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import CountUp from './CountUp';

interface AnimatedStatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  delay?: number;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({ 
  icon, 
  value, 
  label, 
  delay = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated && iconRef.current) {
      setHasAnimated(true);
      
      // Animación del icono
      const tl = gsap.timeline({ delay: delay / 1000 });
      
      // Animación inicial: escala y rotación
      tl.fromTo(iconRef.current, 
        { 
          scale: 0, 
          rotation: -180, 
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)" 
        }
      )
      // Efecto de "pulso" al final
      .to(iconRef.current, {
        scale: 1.2,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(iconRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      })
      // Animación continua sutil
      .to(iconRef.current, {
        y: -5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }, [isInView, hasAnimated, delay]);

  return (
    <motion.div
      ref={cardRef}
      className="transform hover:scale-105 transition-transform duration-300 group"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {/* Icono animado */}
      <div 
        ref={iconRef}
        className="text-white/90 mb-2 flex justify-center group-hover:text-white transition-colors duration-300"
      >
        <div className="text-3xl sm:text-4xl">
          {icon}
        </div>
      </div>
      
      {/* Contador */}
      <div className="relative">
        <CountUp
          from={0}
          to={value}
          separator=","
          direction="up"
          duration={1.5}
          delay={delay / 1000 + 0.3}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 block"
          startWhen={isInView}
        />
        
        {/* Efecto de brillo en el número */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%', opacity: 0 }}
          animate={isInView ? { x: '100%', opacity: [0, 1, 0] } : {}}
          transition={{ 
            duration: 1.5, 
            delay: delay / 1000 + 1.8,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Label */}
      <motion.div 
        className="text-white/90 text-sm sm:text-base group-hover:text-white transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: delay / 1000 + 0.8 }}
      >
        {label}
      </motion.div>
      
      {/* Efecto de partículas al hacer hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        whileHover={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)"
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default AnimatedStatCard;