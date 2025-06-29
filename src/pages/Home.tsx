import React, { useState, useEffect } from 'react'
import {
	Microscope,
	Shield,
	Clock,
	Users,
	Phone,
	Mail,
	MapPin,
	ChevronRight,
	CheckCircle,
	Star,
	Award,
	Heart,
	Target,
	Lightbulb,
	UserCheck,
	Play,
	Scissors,
	Eye,
	Syringe,
	User,
	HelpCircle,
	Building2,
	Activity,
	Stethoscope,
	FlaskConical,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CountUp from '../components/CountUp'
import SplitText from '../components/SplitText'
import RotatingText from '../components/RotatingText'
import TiltedCard from '../components/TiltedCard'
import FadeContent from '../components/FadeContent'
import BlurText from '../components/BlurText'
import SpotlightCard from '../components/SpotlightCard'
import MedicalParticles from '../components/MedicalParticles'
import AnimatedStatCard from '../components/AnimatedStatCard'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GsapSplitText } from 'gsap/SplitText'
import { HoverEffect } from '../components/ui/card-hover-effect'
import '../styles.css'

// Asegúrate de registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Asegúrate de registrar SplitText si es necesario
gsap.registerPlugin(GsapSplitText)

const Home = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		howDidYouKnow: '',
		message: '',
	})

	const [activeSection, setActiveSection] = useState('inicio')
	const [activeQuestion, setActiveQuestion] = useState<number | null>(null)
	const [currentImageIndex, setCurrentImageIndex] = useState(0)
	const totalImages = 5
	const [hasAnimated, setHasAnimated] = useState(false)

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Aquí normalmente enviarías los datos a tu backend
		// Puedes agregar lógica para enviar el formulario
	}

	const toggleQuestion = (index: number) => {
		setActiveQuestion(activeQuestion === index ? null : index)
	}

	const services = [
		{
			icon: <Scissors className="w-8 h-8" />,
			title: 'Biopsias',
			description: 'Extraemos pequeñas muestras y utilizamos técnicas avanzadas para detectar enfermedades como el cáncer, infecciones y problemas inflamatorios.',
		},
		{
			icon: <Eye className="w-8 h-8" />,
			title: 'Citologías',
			description: 'Analizamos tus células para detectar infecciones, inflamaciones y prevenir el cáncer. Cada análisis tiene como prioridad tu bienestar y salud.',
		},
		{
			icon: <Syringe className="w-8 h-8" />,
			title: 'Punciones',
			description: 'Realizamos extracciones mínimas de líquido o tejido con una aguja fina. Este sencillo procedimiento nos permite analizar muestras y detectar problemas de salud eficazmente.',
		},
		{
			icon: <Microscope className="w-8 h-8" />,
			title: 'Inmunohistoquímica',
			description: 'Utilizamos la inmunohistoquímica, una herramienta clave que combina histología e inmunología, para obtener información crucial sobre tu salud y darte diagnósticos precisos.',
		},
		{
			icon: <User className="w-8 h-8" />,
			title: 'Cono de Cuello Uterino',
			description: 'En este procedimiento, se extrae una pequeña muestra cónica del cuello uterino para analizarla y detectar células anormales, previniendo así el cáncer de cuello uterino.',
		},
		{
			icon: <Heart className="w-8 h-8" />,
			title: 'Protocolos Oncológicos',
			description: 'Ofrecemos planes de tratamiento personalizados para el cáncer, como cirugías, radioterapias, quimioterapias y otros medicamentos, ajustados a las necesidades de cada paciente.',
		},
	]

	const values = [
		'Personal altamente calificado',
		'Atención Personalizada',
		'Tecnología Avanzada',
		'Trabajo en equipo',
		'Pasión por la salud',
		'Confidencialidad',
	]

	const processSteps = [
		{
			icon: <Microscope className="w-6 h-6" />, // Tamaño ajustado
			title: 'Preparación de la muestra',
			description: 'Preparación del tejido para análisis.',
		},
		{
			icon: <Shield className="w-6 h-6" />,
			title: 'Análisis patológico',
			description: 'Examen microscópico de la muestra.',
		},
		{
			icon: <CheckCircle className="w-6 h-6" />,
			title: 'Elaboración del informe',
			description: 'Análisis de resultados y emisión de informe.',
		},
	]

	const galleryImages = [
		{
			src: '/Whisk_a1c12feb90.jpg',
			alt: 'Laboratorio de patología - Análisis microscópico',
			title: 'Análisis Microscópico',
		},
		{
			src: '/Whisk_3efea70758.jpg',
			alt: 'Equipo de laboratorio especializado',
			title: 'Tecnología Avanzada',
		},
		{
			src: '/Whisk_d6377a6764.jpg',
			alt: 'Profesionales trabajando en laboratorio',
			title: 'Equipo Especializado',
		},
		{
			src: '/Whisk_7c8e7c40cd.jpg',
			alt: 'Instalaciones modernas del laboratorio',
			title: 'Instalaciones Modernas',
		},
	]

	const missionValues = [
		{
			icon: <Target className="w-8 h-8" />,
			title: 'Nuestra Misión',
			description:
				'Proporcionar diagnósticos patológicos que marquen la diferencia en la vida de nuestros pacientes, con precisión, rapidez y el más alto nivel de profesionalismo.',
		},
		{
			icon: <Lightbulb className="w-8 h-8" />,
			title: 'Innovación Constante',
			description:
				'Invertimos en la última tecnología y equipos de diagnóstico para ofrecer análisis con la mayor eficiencia y confiabilidad.',
		},
		{
			icon: <UserCheck className="w-8 h-8" />,
			title: 'Compromiso Social',
			description:
				'Inspirados por el deseo de investigar y ayudar a la comunidad médica, siendo un referente en patología desde 2004.',
		},
	]

	// Datos de estadísticas con iconos
	const statsData = [
		{
			icon: <Building2 className="w-8 h-8" />,
			value: 250,
			label: 'Clínicas trabajadas'
		},
		{
			icon: <Stethoscope className="w-8 h-8" />,
			value: 768,
			label: 'Doctores satisfechos'
		},
		{
			icon: <Users className="w-8 h-8" />,
			value: 62079,
			label: 'Clientes atendidos'
		},
		{
			icon: <Award className="w-8 h-8" />,
			value: 24,
			label: 'Años de experiencia'
		}
	]

	const handleScroll = () => {
		const sections = document.querySelectorAll('section[id]')
		const scrollPosition = window.scrollY + 100 // Offset más pequeño

		let currentSection = 'inicio' // Por defecto

		sections.forEach((section) => {
			const sectionTop = (section as HTMLElement).offsetTop
			const sectionHeight = (section as HTMLElement).offsetHeight
			const sectionId = section.getAttribute('id')

			// Si estamos dentro de los límites de esta sección
			if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
				if (sectionId) {
					currentSection = sectionId
				}
			}
		})

		// Si estamos muy cerca del final de la página, activar la última sección
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
			const lastSection = Array.from(sections).pop()
			const lastSectionId = lastSection?.getAttribute('id')
			if (lastSectionId) {
				currentSection = lastSectionId
			}
		}

		setActiveSection(currentSection)
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages)
		}, 3000) // Cambia de imagen cada 3 segundos

		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		// Configuración de ScrollTrigger
		const timer = setTimeout(() => {
			const heroElement = document.querySelector('.hero-section');
			if (heroElement) {
				const trigger = ScrollTrigger.create({
					trigger: '.hero-section',
					start: 'top top',
					end: 'bottom top',
					onEnter: () => {}, // Entrada en la vista
					onLeave: () => {}, // Salida de la vista
				})

				// Limpieza al desmontar el componente
				return () => {
					trigger.kill()
				}
			}
		}, 100);

		return () => clearTimeout(timer);
	}, [])

	useEffect(() => {
		if (!hasAnimated) {
			const splitElements = document.querySelectorAll('.split-text')
			if (splitElements.length > 0) {
				const split = new GsapSplitText('.split-text', { type: 'chars' })
				gsap.from(split.chars, {
					opacity: 0,
					y: 50,
					stagger: 0.1,
					onComplete: () => setHasAnimated(true),
				})
			} else {
				// Si no hay elementos .split-text, marca como animado para evitar bucles
				setHasAnimated(true)
			}
		}
	}, [hasAnimated])

	const images = [
		'/client1.png',
		'/client2.png',
		'/client3.png',
		'/client4.png',
		'/client5.png',
	]

	const handleLogoClick = (direction: 'left' | 'right') => {
		const container = document.querySelector('.logo-carousel .flex');
		if (container) {
			const currentX = gsap.getProperty(container, 'x') as number;
			const offset = direction === 'left' ? -100 : 100;
			gsap.to(container, {
				x: currentX + offset,
				duration: 0.5,
				ease: 'power1.inOut',
			});
		}
	};

	useEffect(() => {
		// Animación del carrusel con efecto de vaivén (ida y vuelta)
		const timer = setTimeout(() => {
			const carousel = document.querySelector('.carousel-container');
			if (carousel) {
				// Configuramos la posición inicial
				gsap.set(carousel, { x: 0 });
				
				// Crear timeline con yoyo (ida y vuelta)
				const tl = gsap.timeline({ 
					repeat: -1, 
					yoyo: true,
					repeatDelay: 0.5 // Pequeña pausa en cada extremo
				});
				tl.to(carousel, {
					x: '-50%', // Movemos hacia la izquierda
					duration: 25, // Duración más larga para movimiento más suave
					ease: 'sine.inOut' // Easing más suave
				});
			}
		}, 100); // Pequeño delay para asegurar que el DOM esté listo

		return () => clearTimeout(timer);
	}, []);

	return (
		<div className="min-h-screen bg-white relative">
			{/* Partículas médicas flotantes */}
			<MedicalParticles />
			
			<Header activeSection={activeSection} />

			{/* Hero Section */}
			<section id="inicio" className="hero-section relative bg-white overflow-hidden py-12 sm:py-16 lg:py-20 pt-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
						<div className="text-center lg:text-left">
							<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
								<span className="text-gray-900">Tu </span>
								<RotatingText
									texts={['Salud', 'Vida', 'Bien']}
									mainClassName="inline-flex items-center justify-center w-32 sm:w-36 md:w-40 lg:w-44 h-12 sm:h-14 md:h-16 lg:h-20 bg-[#cf1dc9] text-white overflow-hidden rounded-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
									staggerFrom={'last'}
									initial={{ y: 0, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									exit={{ y: 0, opacity: 0 }}
									staggerDuration={0.05}
									splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
									transition={{ type: 'spring', damping: 15, stiffness: 200 }}
									rotationInterval={5000}
								/>
								<span className="text-gray-900"> es nuestra prioridad</span>
							</h1>
							<p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed text-center lg:text-justify">
								En Conspat, proporcionamos diagnósticos patológicos precisos y oportunos, inspirados por el deseo de
								investigar y ayudar a la comunidad médica desde 2004.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<button
									className="bg-[#cf1dc9] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-[#ae29ba] transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base"
									onClick={() => {
										const section = document.getElementById('servicios')
										if (section) {
											window.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
										}
									}}
								>
									Conocer Servicios
								</button>
								<button
									className="border-2 border-[#cf1dc9] text-[#cf1dc9] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-[#cf1dc9] hover:text-white transition-all duration-300 text-sm sm:text-base"
									onClick={() => {
										const section = document.getElementById('contactanos')
										if (section) {
											window.scrollTo({ top: section.offsetTop, behavior: 'smooth' })
										}
									}}
								>
									Contactar Ahora
								</button>
							</div>
						</div>
						<div className="relative flex justify-center mt-8 lg:mt-0">
							<div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 transition-transform transform hover:scale-105 hover:shadow-2xl w-full max-w-sm lg:max-w-md">
								<a
									href="https://www.instagram.com/uhdconspat?igsh=MW0wdGN4cDRuY2ZyeA=="
									target="_blank"
									rel="noopener noreferrer"
								>
									<img src="/consig.png" alt="Perfil de Instagram" className="w-full h-auto object-contain rounded" />
								</a>
								<h3 className="text-base sm:text-lg font-bold text-center mt-4 text-black">Conoce Nuestros Laboratorios</h3>
								<a
									href="https://www.instagram.com/uhdconspat?igsh=MW0wdGN4cDRuY2ZyeA=="
									target="_blank"
									rel="noopener noreferrer"
									className="block text-center lg:text-left mt-2 text-[#c221c2] font-semibold text-sm sm:text-base"
								>
									Ver en Instagram
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Stats Section with Background Image */}
				<div className="mt-12 sm:mt-16 lg:mt-20 relative py-12 sm:py-16 overflow-hidden">
					{/* Background Image */}
					<div 
						className="absolute inset-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: 'url(/mano.jpg)',
							backgroundPosition: 'center center',
							backgroundSize: 'cover'
						}}
					></div>
					
					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-[#cf1dc9] to-[#ae29ba] opacity-90"></div>
					
					{/* Content */}
					<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
							{statsData.map((stat, index) => (
								<AnimatedStatCard
									key={index}
									icon={stat.icon}
									value={stat.value}
									label={stat.label}
									delay={index * 200}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="nosotros" className="py-12 sm:py-16 lg:py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<SplitText
							text="Somos Laboratorio Conspat"
							className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 pb-2"
							delay={100}
							duration={0.6}
							ease="power3.out"
							splitType="chars"
							from={{ opacity: 0, y: 40 }}
							to={{ opacity: 1, y: 0 }}
							threshold={0.1}
							rootMargin="-100px"
							textAlign="center"
						/>
						<div className="w-24 h-1 bg-[#cf1dc9] mx-auto mb-6"></div>
						<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-center">
							Conoce más de nuestra historia y equipo técnico especializado.
						</p>
					</div>

					<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
						<div>
							<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-2 text-center lg:text-left">
								Expertos en resultados patológicos
							</h3>
							<BlurText
								text="En Laboratorios Conspat, nos enorgullece ser un referente en patología en Caracas, Venezuela. Desde nuestra fundación en octubre de 2004, hemos estado dedicados a brindar diagnósticos precisos y oportunos, inspirados por el deseo de investigar y ayudar a la comunidad. Nuestra misión es proporcionar diagnósticos que marquen la diferencia en la vida de nuestros pacientes."
								delay={50}
								animateBy="words"
								direction="top"
								animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
								animationTo={[
									{ filter: 'blur(5px)', opacity: 0.5, y: 5 },
									{ filter: 'blur(0px)', opacity: 1, y: 0 },
								]}
								onAnimationComplete={() => {}}
								className="text-gray-600 mb-6 leading-relaxed text-justify"
							/>
							<BlurText
								text="Invertimos en la última tecnología y equipos de diagnóstico para ofrecer una amplia gama de estudios patológicos, incluyendo biopsias y citologías. Nuestra infraestructura avanzada nos permite realizar análisis con la mayor eficiencia, asegurando diagnósticos rápidos y confiables que son esenciales para la atención médica de nuestros pacientes."
								delay={50}
								animateBy="words"
								direction="top"
								animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
								animationTo={[
									{ filter: 'blur(5px)', opacity: 0.5, y: 5 },
									{ filter: 'blur(0px)', opacity: 1, y: 0 },
								]}
								onAnimationComplete={() => {}}
								className="text-gray-600 mb-8 leading-relaxed text-justify"
							/>
						</div>

						{/* Gallery Section */}
						<div className="relative mt-8 lg:mt-0">
							<div className="bg-gradient-to-br from-[#cf1dc9]/10 to-[#ae29ba]/10 rounded-3xl p-6 sm:p-8">
								<div className="text-center mb-6 sm:mb-8">
									<h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2">Nuestras Instalaciones</h4>
									<p className="text-gray-600 text-sm sm:text-base">
										Tecnología de vanguardia y personal especializado trabajando para tu salud
									</p>
								</div>

								<div className="grid grid-cols-2 gap-3 sm:gap-4">
									{galleryImages.map((image, index) => (
										<FadeContent key={index} blur={true} duration={800} delay={index * 200}>
											<div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
												<img
													src={image.src}
													alt={image.alt}
													className="w-full h-24 sm:h-32 object-cover transition-transform duration-500 group-hover:scale-110"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
													<div className="absolute bottom-2 left-2 right-2">
														<p className="text-white text-xs sm:text-sm font-semibold">{image.title}</p>
													</div>
												</div>
											</div>
										</FadeContent>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Mission and Values Section */}
				<section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12 sm:mb-16">
							<SplitText
								text="Nuestra Misión y Valores"
								className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 pb-2 leading-tight px-2"
								delay={100}
								duration={0.6}
								ease="power3.out"
								splitType="chars"
								from={{ opacity: 0, y: 40 }}
								to={{ opacity: 1, y: 0 }}
								threshold={0.1}
								rootMargin="-100px"
								textAlign="center"
							/>
							<div className="w-24 h-1 bg-[#cf1dc9] mx-auto mb-6"></div>
							<p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto text-center px-4">
								Los principios que nos guían en nuestro compromiso con la excelencia médica y el servicio a la
								comunidad.
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{missionValues.map((item, index) => (
								<FadeContent key={index} blur={true} duration={1000} delay={index * 200}>
									<div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full min-h-[300px] flex flex-col justify-between">
										<div className="text-center flex-grow flex flex-col justify-center">
											<div className="bg-gradient-to-br from-[#cf1dc9] to-[#ae29ba] w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center text-white">
												{item.icon}
											</div>
											<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 pb-2">{item.title}</h3>
											<p className="text-gray-600 leading-relaxed text-sm sm:text-base">{item.description}</p>
										</div>
									</div>
								</FadeContent>
							))}
						</div>

						{/* Core Values Grid */}
						<div className="mt-12 sm:mt-16">
							<div className="text-center mb-8 sm:mb-12">
								<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 pb-2">Nuestros Valores Fundamentales</h3>
								<p className="text-gray-600 text-sm sm:text-base">Los pilares que sostienen nuestro compromiso con la excelencia</p>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
								{values.map((value, index) => (
									<FadeContent key={index} duration={800} delay={index * 100}>
										<div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#cf1dc9]">
											<div className="flex items-center space-x-3">
												<CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#cf1dc9] flex-shrink-0" />
												<span className="text-gray-800 font-medium text-sm sm:text-base">{value}</span>
											</div>
										</div>
									</FadeContent>
								))}
							</div>
						</div>
					</div>
				</section>

				{/* Process Section */}
				<section className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-16">
							<SplitText
								text="El Rol Del Patólogo En Tu Tratamiento"
								className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 pb-2 px-4"
								delay={100}
								duration={0.6}
								ease="power3.out"
								splitType="chars"
								from={{ opacity: 0, y: 40 }}
								to={{ opacity: 1, y: 0 }}
								threshold={0.1}
								rootMargin="-100px"
								textAlign="center"
							/>
							<div className="w-24 h-1 bg-[#cf1dc9] mx-auto mb-6"></div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							{processSteps.map((step: any, index: number) => (
								<div key={index} className="flex justify-center h-[320px] w-full max-w-sm mx-auto">
									<TiltedCard
										containerHeight="320px"
										containerWidth="280px"
										scaleOnHover={1.1}
										rotateAmplitude={10}
										showMobileWarning={false}
										showTooltip={false}
										displayOverlayContent={true}
									>
										<div className="bg-white rounded-2xl p-4 sm:p-6 h-[300px] w-[260px] flex flex-col text-center">
											<div className="flex flex-col items-center justify-center h-full">
												<div className="bg-gradient-to-br from-[#cf1dc9] to-[#ae29ba] w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white flex-shrink-0">
													{step.icon}
												</div>
												<div className="flex flex-col justify-center flex-grow">
													<h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-3 px-2 leading-tight break-words">{step.title}</h3>
													<p className="text-gray-600 leading-relaxed text-sm sm:text-base px-2 text-center break-words">{step.description}</p>
												</div>
											</div>
										</div>
									</TiltedCard>
								</div>
							))}
						</div>
					</div>
				</section>
				{/* Gallery Section */}
				<section className="py-12 bg-[#cf1dc9] heartbeat-background overflow-hidden">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
						<div className="overflow-hidden relative logo-carousel w-full">
							<div className="flex gap-6 sm:gap-8 lg:gap-12 carousel-container">
								{/* Primera serie de imágenes */}
								{images.map((src, index) => (
									<div key={`logo-1-${index}`} className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg logo-item">
										<img
											src={src}
											alt={`Cliente ${index + 1}`}
											className="w-20 h-16 sm:w-24 sm:h-18 lg:w-32 lg:h-24 object-contain"
										/>
									</div>
								))}
								{/* Segunda serie de imágenes duplicadas */}
								{images.map((src, index) => (
									<div key={`logo-2-${index}`} className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg logo-item">
										<img
											src={src}
											alt={`Cliente ${index + 1}`}
											className="w-20 h-16 sm:w-24 sm:h-18 lg:w-32 lg:h-24 object-contain"
										/>
									</div>
								))}
								{/* Tercera serie de imágenes duplicadas */}
								{images.map((src, index) => (
									<div key={`logo-3-${index}`} className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg logo-item">
										<img
											src={src}
											alt={`Cliente ${index + 1}`}
											className="w-20 h-16 sm:w-24 sm:h-18 lg:w-32 lg:h-24 object-contain"
										/>
									</div>
								))}
								{/* Cuarta serie de imágenes duplicadas */}
								{images.map((src, index) => (
									<div key={`logo-4-${index}`} className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg logo-item">
										<img
											src={src}
											alt={`Cliente ${index + 1}`}
											className="w-20 h-16 sm:w-24 sm:h-18 lg:w-32 lg:h-24 object-contain"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>
			</section>

			{/* Services Section */}
			<section id="servicios" className="py-12 sm:py-16 lg:py-20 bg-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 pb-2 leading-tight text-center px-4">
							Nosotros Ofrecemos Distintos Tipos De Procesamientos
						</h2>
						<div className="w-24 h-1 bg-[#cf1dc9] mx-auto mb-6"></div>
						<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-center">
							Te ofrecemos distintos tipos de servicios para mejorar tu salud.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
						{services.map((service, index) => (
							<FadeContent key={index} blur={true} duration={1000} delay={index * 200}>
								<div className="relative group p-2">
									<div className="absolute -inset-2 bg-[#cf1dc9]/15 rounded-2xl shadow-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
									<div className="bg-white rounded-2xl p-4 sm:p-6 h-64 sm:h-72 w-full flex flex-col justify-between text-center shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-300 hover:scale-[1.02] relative z-10">
										<div className="flex flex-col items-center justify-center flex-1">
											<div className="bg-gradient-to-br from-[#cf1dc9] to-[#ae29ba] w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-3 sm:mb-4 flex items-center justify-center text-white">
												{service.icon}
											</div>
											<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
											<p className="text-gray-600 leading-relaxed text-sm sm:text-base">{service.description}</p>
										</div>
									</div>
								</div>
							</FadeContent>
						))}
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contactanos" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-12 sm:mb-16">
						<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 pb-2 leading-tight text-center px-4">
							Ponte en Contacto con Nuestros Especialistas
						</h2>
						<div className="w-24 h-1 bg-[#cf1dc9] mx-auto mb-6"></div>
						<p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-center">
							Ponte en contacto con Laboratorios Conspat. Contamos con la mejor precisión y rapidez del mundo
							patológico.
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16">
						{/* Contact Form */}
						<div className="w-full">
							<SpotlightCard
								className="spotlight-contact-form w-full"
								spotlightColor="rgba(207, 29, 201, 0.15)"
								style={{ width: '100%' }}
							>
								<form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
											Nombre:
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleInputChange}
											placeholder="Nombre Completo"
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cf1dc9] focus:border-transparent transition-all duration-300"
											required
										/>
									</div>

									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
											Correo electrónico:
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleInputChange}
											placeholder="Correo electrónico"
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cf1dc9] focus:border-transparent transition-all duration-300"
											required
										/>
									</div>

									<div>
										<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
											Teléfono:
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={formData.phone}
											onChange={handleInputChange}
											placeholder="Teléfono"
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cf1dc9] focus:border-transparent transition-all duration-300"
										/>
									</div>

									<div>
										<label htmlFor="howDidYouKnow" className="block text-sm font-medium text-gray-700 mb-2">
											¿Cómo nos conociste?
										</label>
										<select
											id="howDidYouKnow"
											name="howDidYouKnow"
											value={formData.howDidYouKnow}
											onChange={handleInputChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cf1dc9] focus:border-transparent transition-all duration-300"
										>
											<option value="">Seleccione una opción</option>
											<option value="google">Google</option>
											<option value="referido">Referido médico</option>
											<option value="redes">Redes sociales</option>
											<option value="otro">Otro</option>
										</select>
									</div>

									<div>
										<label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
											Comentario:
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleInputChange}
											placeholder="Comentario"
											rows={4}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#cf1dc9] focus:border-transparent transition-all duration-300 resize-none"
										></textarea>
									</div>

									<button
										type="submit"
										className="w-full bg-[#cf1dc9] text-white py-4 rounded-xl font-semibold hover:bg-[#ae29ba] transition-all duration-300 transform hover:scale-105 shadow-lg"
									>
										Enviar
									</button>
								</form>
							</SpotlightCard>
						</div>

						{/* Contact Info */}
						<div className="space-y-6 sm:space-y-8 w-full">
							<SpotlightCard className="spotlight-contact-info w-full" spotlightColor="rgba(207, 29, 201, 0.15)">
								<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2">Información de Contacto</h3>
								<div className="space-y-4 sm:space-y-6">
									<div className="flex items-center space-x-3 sm:space-x-4">
										<div className="bg-[#cf1dc9] p-2 sm:p-3 rounded-xl flex-shrink-0">
											<Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-semibold text-gray-900 text-sm sm:text-base">Teléfono</p>
											<a href="tel:04242082491" className="text-gray-600 text-sm sm:text-base break-all">
												0424-2082491
											</a>
										</div>
									</div>
									<div className="flex items-center space-x-3 sm:space-x-4">
										<div className="bg-[#cf1dc9] p-2 sm:p-3 rounded-xl flex-shrink-0">
											<Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-semibold text-gray-900 text-sm sm:text-base">Email</p>
											<a href="mailto:uhdconspat@gmail.com" className="text-gray-600 text-sm sm:text-base break-all">
												uhdconspat@gmail.com
											</a>
										</div>
									</div>
									<div className="flex items-center space-x-3 sm:space-x-4">
										<div className="bg-[#cf1dc9] p-2 sm:p-3 rounded-xl flex-shrink-0">
											<MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-semibold text-gray-900 text-sm sm:text-base">Ubicación</p>
											<p className="text-gray-600 text-sm sm:text-base">Caracas, Venezuela</p>
										</div>
									</div>
								</div>
							</SpotlightCard>

							<SpotlightCard className="spotlight-hours w-full" spotlightColor="rgba(207, 29, 201, 0.15)">
								<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2">Horarios de Atención</h3>
								<div className="space-y-3 sm:space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-gray-600 text-sm sm:text-base">Lunes a Viernes:</span>
										<span className="font-semibold text-gray-900 text-sm sm:text-base">8:00 AM - 5:00 PM</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600 text-sm sm:text-base">Sábados:</span>
										<span className="font-semibold text-gray-900 text-sm sm:text-base">8:00 AM - 1:00 PM</span>
									</div>
									<p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">(Los horarios pueden variar dependiendo de la sede)</p>
								</div>
							</SpotlightCard>

							<SpotlightCard
								className="spotlight-faq w-full"
								spotlightColor="rgba(207, 29, 201, 0.15)"
								style={{ maxHeight: '400px', overflowY: 'auto' }}
							>
								<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 pb-2">Preguntas Frecuentes</h3>
								<div className="space-y-3 sm:space-y-4">
									<div>
										<div
											onClick={() => toggleQuestion(1)}
											className="cursor-pointer flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
										>
											<h4 className="text-sm sm:text-base font-semibold text-gray-900 pr-2">¿Tiempo de espera para los resultados?</h4>
											<HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#cf1dc9] flex-shrink-0" />
										</div>
										{activeQuestion === 1 && (
											<div className="mt-3 p-3 bg-white rounded-lg border-l-4 border-[#cf1dc9]">
												<ul className="list-disc list-inside text-xs sm:text-sm text-gray-600 space-y-1">
													<li>Citologías: 3-5 días hábiles.</li>
													<li>Biopsias: 5-7 días hábiles.</li>
													<li>Biopsias óseas: 7-10 días hábiles.</li>
													<li>Inmunohistoquímica: 12-15 días hábiles.</li>
												</ul>
											</div>
										)}
									</div>

									<div>
										<div
											onClick={() => toggleQuestion(2)}
											className="cursor-pointer flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
										>
											<h4 className="text-sm sm:text-base font-semibold text-gray-900 pr-2">¿Cuál es el costo de los exámenes?</h4>
											<HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#cf1dc9] flex-shrink-0" />
										</div>
										{activeQuestion === 2 && (
											<div className="mt-3 p-3 bg-white rounded-lg border-l-4 border-[#cf1dc9]">
												<p className="text-xs sm:text-sm text-gray-600">
													Los costos varían según el tipo de estudio. Contáctanos directamente con los datos del
													paciente y la orden médica para proporcionar costos exactos.
												</p>
											</div>
										)}
									</div>
								</div>
							</SpotlightCard>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	)
}

export default Home