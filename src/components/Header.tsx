import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (section: string) => {
    // Si estamos en la página de ubicanos, solo "ubicanos" debe estar activo
    if (isOnUbicanosPage) {
      return section === 'ubicanos';
    }
    // Si estamos en la página principal, usar el activeSection del scroll
    return activeSection === section;
  };

  const scrollToSection = (sectionId: string) => {
    // Si estamos en la página de ubicanos, navegar a la página principal primero
    if (isOnUbicanosPage) {
      navigate('/', { replace: true });
      // Usar setTimeout para asegurar que la navegación se complete antes del scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 80;
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // Altura del header fijo
        const elementPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const isOnUbicanosPage = location.pathname === '/ubicanos';

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-20 sm:w-24 h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {isOnUbicanosPage ? (
              <>
                <Link 
                  to="/" 
                  className={`transition-colors flex items-center h-full ${isActive('inicio') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Inicio
                </Link>
                <Link 
                  to="/#nosotros" 
                  className={`transition-colors flex items-center h-full ${isActive('nosotros') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Nosotros
                </Link>
                <Link 
                  to="/#servicios" 
                  className={`transition-colors flex items-center h-full ${isActive('servicios') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Servicios
                </Link>
                <Link 
                  to="/ubicanos" 
                  className={`transition-colors flex items-center h-full ${isActive('ubicanos') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Ubícanos
                </Link>
                <Link 
                  to="/#contactanos" 
                  className={`transition-colors flex items-center h-full ${isActive('contactanos') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Contáctanos
                </Link>
              </>
            ) : (
              <>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className={`transition-colors flex items-center h-full ${isActive('inicio') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Inicio
                </button>
                <button 
                  onClick={() => scrollToSection('nosotros')}
                  className={`transition-colors flex items-center h-full ${isActive('nosotros') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Nosotros
                </button>
                <button 
                  onClick={() => scrollToSection('servicios')}
                  className={`transition-colors flex items-center h-full ${isActive('servicios') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Servicios
                </button>
                <Link 
                  to="/ubicanos"
                  className={`transition-colors flex items-center h-full ${isActive('ubicanos') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Ubícanos
                </Link>
                <button 
                  onClick={() => scrollToSection('contactanos')}
                  className={`transition-colors flex items-center h-full ${isActive('contactanos') ? 'text-[#cf1dc9] font-medium border-b-2 border-[#cf1dc9] pb-1' : 'text-gray-700 hover:text-[#cf1dc9]'}`}
                >
                  Contáctanos
                </button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-1">
              {isOnUbicanosPage ? (
                <>
                  <Link 
                    to="/" 
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('inicio') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Inicio
                  </Link>
                  <Link 
                    to="/#nosotros" 
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('nosotros') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Nosotros
                  </Link>
                  <Link 
                    to="/#servicios" 
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('servicios') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Servicios
                  </Link>
                  <Link 
                    to="/ubicanos" 
                    className={`py-3 px-4 transition-colors rounded-lg ${isActive('ubicanos') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ubícanos
                  </Link>
                  <Link 
                    to="/#contactanos" 
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('contactanos') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contáctanos
                  </Link>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => scrollToSection('inicio')}
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('inicio') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                  >
                    Inicio
                  </button>
                  <button 
                    onClick={() => scrollToSection('nosotros')}
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('nosotros') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                  >
                    Nosotros
                  </button>
                  <button 
                    onClick={() => scrollToSection('servicios')}
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('servicios') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                  >
                    Servicios
                  </button>
                  <Link 
                    to="/ubicanos"
                    className={`py-3 px-4 transition-colors rounded-lg ${isActive('ubicanos') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ubícanos
                  </Link>
                  <button 
                    onClick={() => scrollToSection('contactanos')}
                    className={`py-3 px-4 text-left transition-colors rounded-lg ${isActive('contactanos') ? 'text-[#cf1dc9] font-medium bg-[#cf1dc9]/10' : 'text-gray-700 hover:text-[#cf1dc9] hover:bg-gray-50'}`}
                  >
                    Contáctanos
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;