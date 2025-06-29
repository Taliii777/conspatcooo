import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Ubicanos from './pages/Ubicanos';
import { Activity } from 'lucide-react';
import './preloader.css'; // Asegúrate de que la ruta sea correcta

const App = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Iniciar el desvanecimiento
      setTimeout(() => {
        setLoading(false); // Ocultar el preloader después del desvanecimiento
      }, 1000); // Esperar 1 segundo para que se complete el desvanecimiento
    }, 3000); // 3 segundos

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
  }, []);

  return (
    <>
      {loading && (
        <div id="preloader" className={fadeOut ? 'fade-out' : ''}>
          <div id="loader">
            <Activity size={50} color="#9370DB" />
          </div>
        </div>
      )}
      {!loading && (
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ubicanos" element={<Ubicanos />} />
          </Routes>
          {/* Otros componentes */}
        </div>
      )}
    </>
  );
};

export default App;