import React, { useLayoutEffect } from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, Building2, Users, Car } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SpotlightCard from '../components/SpotlightCard';
import MedicalParticles from '../components/MedicalParticles';

const Ubicanos = () => {
  const locations = [
    {
      id: 1,
      name: "Centro Policlínico Caracas",
      address: "Edificio Centro Caracas, piso 2 consultorio 2D, diagonal al Hospital de Clínicas Caracas en San Bernardino",
      phone: "0424-2082491",
      whatsapp: "0424-2082491",
      email: "uhdconspat@gmail.com",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "8:00 AM - 1:00 PM",
        sunday: "Cerrado"
      },
      services: [
        "Biopsias convencionales",
        "Citologías cervicales",
        "Inmunohistoquímica",
        "Estudios intraoperatorios"
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31383.861052920114!2d-66.91804928966778!3d10.502033850738526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a593153a3fdd7%3A0xaaf9f4fa3540b05!2sCentro%20M%C3%A9dico%20de%20Caracas%20(Centro%20M%C3%A9dico%20San%20Bernardino)!5e0!3m2!1ses-419!2sve!4v1749248645266!5m2!1ses-419!2sve",
      features: [
        { icon: <Car className="w-5 h-5" />, text: "Estacionamiento disponible" },
        { icon: <Users className="w-5 h-5" />, text: "Personal especializado" },
        { icon: <Building2 className="w-5 h-5" />, text: "Instalaciones modernas" }
      ]
    },
    {
      id: 2,
      name: "Charallave",
      address: "Edificio Multioficinas CONEX, Av. Perimetral, Charallave 1012, Miranda",
      phone: "0414-4861289",
      whatsapp: "0414-4861289",
      email: "uhdconspat@gmail.com",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "Cerrado",
        sunday: "Cerrado"
      },
      services: [
        "Biopsias convencionales",
        "Citologías cervicales",
        "Protocolos oncológicos",
        "Punciones especializadas"
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.5461389040174!2d-66.85548772683936!3d10.217463269258872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2aef20fe1dd8ff%3A0xb2b8f6a1166a3266!2sEdificio%20Conex!5e0!3m2!1ses-419!2sve!4v1749248608034!5m2!1ses-419!2sve",
      features: [
        { icon: <Car className="w-5 h-5" />, text: "Estacionamiento disponible" },
        { icon: <Users className="w-5 h-5" />, text: "Personal especializado" },
        { icon: <Building2 className="w-5 h-5" />, text: "Instalaciones modernas" }
      ]
    },
    {
      id: 3,
      name: "Policlínica Méndez Gimón",
      address: "Planta Baja, Consultorio 1, Av. Andrés Bello Policlínica Mendez Gimon, ala oeste, Caracas 1059, Distrito Capital",
      phone: "0424-1425562",
      whatsapp: "0424-1425562",
      email: "uhdconspat@gmail.com",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "8:00 AM - 1:00 PM",
        sunday: "Cerrado"
      },
      services: [
        "Todos los servicios patológicos",
        "Biopsias especializadas",
        "Inmunohistoquímica",
        "Cono de cuello uterino"
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.954574957969!2d-66.88481932683484!3d10.50424411415906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a5922e62098af%3A0x995b73ca2f77b0c6!2sPoliclinica%20M%C3%A9ndez%20Gim%C3%B3n!5e0!3m2!1ses-419!2sve!4v1749248584093!5m2!1ses-419!2sve",
      features: [
        { icon: <Car className="w-5 h-5" />, text: "Estacionamiento disponible" },
        { icon: <Users className="w-5 h-5" />, text: "Equipo completo de patólogos" },
        { icon: <Building2 className="w-5 h-5" />, text: "Instalaciones especializadas" }
      ]
    },
    {
      id: 4,
      name: "Clínica Sanatrix",
      address: "Piso 1 consultorio 118 A, Edif. Clínica Sanatrix, Av. 4ta. Cruce, con Calle 2, Caracas 1060, Miranda, Chacao",
      phone: "0414-2691682",
      whatsapp: "0414-2691682",
      email: "uhdconspat@gmail.com",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "Cerrado",
        sunday: "Cerrado"
      },
      services: [
        "Biopsias convencionales",
        "Citologías cervicales",
        "Estudios intraoperatorios",
        "Protocolos oncológicos"
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.0873288305843!2d-66.86244902496217!3d10.493781889638344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a5901c141bdd5%3A0x3d019a7b8e4f3ab6!2sCl%C3%ADnica%20Sanatrix!5e0!3m2!1ses-419!2sve!4v1749538992363!5m2!1ses-419!2sve",
      features: [
        { icon: <Car className="w-5 h-5" />, text: "Estacionamiento disponible" },
        { icon: <Users className="w-5 h-5" />, text: "Personal especializado" },
        { icon: <Building2 className="w-5 h-5" />, text: "Instalaciones modernas" }
      ]
    },
    {
      id: 5,
      name: "Maracay",
      address: "Piso 5, Centro Quirúrgico del Norte, Torre Calicanto, C. López Aveledo, Maracay 2101, Aragua",
      phone: "0424-2131746",
      whatsapp: "0424-2131746",
      email: "uhdconspat@gmail.com",
      hours: {
        weekdays: "8:00 AM - 5:00 PM",
        saturday: "Cerrado",
        sunday: "Cerrado"
      },
      services: [
        "Biopsias convencionales",
        "Citologías cervicales",
        "Inmunohistoquímica",
        "Punciones especializadas"
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.071629304573!2d-67.60132522683877!3d10.255806868584628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e803b61beba572d%3A0x2171cb799716e6c!2sCentro%20Quir%C3%BArgico%20del%20Norte!5e0!3m2!1ses-419!2sve!4v1749247038934!5m2!1ses-419!2sve",
      linkUrl: "https://www.google.com/maps/place/Centro+Quir%C3%BArgico+del+Norte/@10.2558069,-67.6013252,15z"
    }
  ];

  // Scroll al tope cuando se monta el componente
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Partículas médicas flotantes */}
      <MedicalParticles />
      
      <Header activeSection="ubicanos" />

      {/* Hero Section with Background Image - Reduced Height */}
      <section className="relative overflow-hidden min-h-[350px] flex items-center justify-center pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(/mar.jpg)',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        {/* Content - Centered */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            Nuestras <span className="text-white">Ubicaciones</span>
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-4 shadow-lg"></div>
          <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            Encuentra la sede de Laboratorios Conspat más cercana a ti. 
            Contamos con instalaciones modernas y personal especializado para brindarte el mejor servicio.
          </p>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 lg:space-y-16">
            {locations.map((location, index) => (
              <div key={location.id} className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                {/* Location Info */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <SpotlightCard className="min-h-[320px] sm:h-80" spotlightColor="rgba(207, 29, 201, 0.15)">
                    <div className="flex items-center mb-4">
                      <div className="bg-[#cf1dc9] p-2 rounded-xl mr-3 sm:mr-4 flex-shrink-0">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{location.name}</h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      {/* Address */}
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <Navigation className="w-4 h-4 sm:w-5 sm:h-5 text-[#cf1dc9] mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm sm:text-base">Dirección</p>
                          <p className="text-gray-600 text-sm sm:text-base">{location.address}</p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-2">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#cf1dc9] flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">Teléfono</p>
                            <a 
                              href={`tel:+58${location.phone.replace(/^0/, '')}`}
                              className="text-gray-600 text-xs sm:text-sm hover:text-[#cf1dc9] transition-colors cursor-pointer"
                            >
                              {location.phone}
                            </a>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#cf1dc9] flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 text-xs sm:text-sm">Email</p>
                            <a 
                              href={`mailto:${location.email}`}
                              className="text-gray-600 text-xs sm:text-sm hover:text-[#cf1dc9] transition-colors cursor-pointer"
                            >
                              {location.email}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <a
                          href={`https://wa.me/58${location.whatsapp.replace(/^0/, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-[#26d466] text-white px-3 sm:px-4 py-2 rounded-xl font-semibold hover:bg-[#1abf5a] transition-all duration-300 text-center text-sm sm:text-base"
                        >
                          <FaWhatsapp className="inline-block w-4 h-4 sm:w-5 sm:h-5 mr-2" /> WhatsApp
                        </a>
                      
                        <a
                          href={`tel:+58${location.phone.replace(/^0/, '')}`}
                          className="flex-1 border-2 border-[#cf1dc9] text-[#cf1dc9] px-3 sm:px-4 py-2 rounded-xl font-semibold hover:bg-[#cf1dc9] hover:text-white transition-all duration-300 text-center text-sm sm:text-base"
                        >
                          Llamar Ahora
                        </a>
                      </div>
                    </div>
                  </SpotlightCard>
                </div>

                {/* Map */}
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} mt-6 lg:mt-0`}>
                  <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-64 sm:h-80">
                    <div className="h-full relative">
                      <iframe
                        src={location.mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-3xl"
                        title={`Mapa de ${location.name}`}
                      ></iframe>
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl">
                        <p className="text-xs sm:text-sm font-semibold text-gray-900">{location.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#cf1dc9] to-[#ae29ba] rounded-3xl p-6 sm:p-8 lg:p-12 text-center text-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              ¿No encuentras la ubicación que buscas?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Contáctanos directamente y te ayudaremos a encontrar la mejor opción para ti. 
              Estamos comprometidos con brindarte el mejor servicio.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="https://wa.me/584242082491"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#cf1dc9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                WhatsApp
              </a>
              <a
                href="tel:+584242082491"
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white hover:text-[#cf1dc9] transition-all duration-300 text-sm sm:text-base"
              >
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ubicanos;