import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Linkedin, Facebook, Calendar, Users, Lightbulb, Award, Rocket, MapPin } from 'lucide-react';
import backgroundImage from '/assets/t.jpg';
import StaggeredMenu from './components/StaggeredMenu';

// Simple fade in animation that won't affect layout
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
};

const AnimatedSection = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: '-50px'
  });

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [isPartnerPaused, setIsPartnerPaused] = useState(false);
  const [partnerOffset, setPartnerOffset] = useState(0);
  const partnerAnimationRef = useRef<number | null>(null);
  const partnerSliderRef = useRef<HTMLDivElement>(null);
  
  const PARTNER_CARD_WIDTH = 200;
  const PARTNER_CARD_COUNT = 14;
  const PARTNER_SLIDER_WIDTH = PARTNER_CARD_WIDTH * PARTNER_CARD_COUNT;
  const PARTNER_SPEED = 0.8;

  // Navigation menu items
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
    { label: 'Portal', ariaLabel: 'Go to portal', link: 'https://port.asucareercenter.com' },
    { label: 'Timeline', ariaLabel: 'View event timeline', link: '#timeline' },
    { label: 'Highlights', ariaLabel: 'See event highlights', link: '#highlights' },
    { label: 'Partners', ariaLabel: 'View our partners', link: '#partners' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems = [
    { label: 'LinkedIn', link: 'http://linkedin.com/company/18294977/admin/feed/posts/', icon: Linkedin },
    { label: 'Instagram', link: 'https://www.instagram.com/asucareercenter/', icon: Instagram },
    { label: 'Facebook', link: 'https://www.facebook.com/ASUCCOFFICIAL/', icon: Facebook }
  ];

  const topLogos = [
    { name: 'asu logo', url: 'public/assets/logo_ain_shams.png' },
    { name: 'cc logo', url: 'public/assets/cclogo.png' },
    { name: 'cw logo', url: 'public/assets/cwl2.png' }
  ];

  const strategicPartners = [
    { name: 'Strategic Partner 1', url: 'public/assets/partners/Strategic/BM logo.png' },
    { name: 'Strategic Partner 2', url: 'public/assets/partners/Strategic/Gemini logo.png' }
  ];

  const otherPartners = [
    { name: 'Partner 1', url: 'public/assets/partners/Anton logo.png' },
    { name: 'Partner 2', url: 'public/assets/partners/Atomica logo.png' },
    { name: 'Partner 3', url: 'public/assets/partners/BasharSoft Logo.png' },
    { name: 'Partner 4', url: 'public/assets/partners/Corp logo.png' },
    { name: 'Partner 5', url: 'public/assets/partners/efe logo.png' },
    { name: 'Partner 6', url: 'public/assets/partners/Erada finance logo.jpg' },
    { name: 'Partner 7', url: 'public/assets/partners/Ibag logo.png' },
    { name: 'Partner 8', url: 'public/assets/partners/Intercom logo.jpg' },
    { name: 'Partner 9', url: 'public/assets/partners/MTS enterprise logo.png' },
    { name: 'Partner 10', url: 'public/assets/partners/Nassera group logo.PNG' },
    { name: 'Partner 11', url: 'public/assets/partners/Noon logo.png' },
    { name: 'Partner 12', url: 'public/assets/partners/Spirit logo .png' },
    { name: 'Partner 13', url: 'public/assets/partners/TTC logo.png' },
    { name: 'Partner 14', url: 'public/assets/partners/Wisely insure logo.png' }
  ];

  // Partner slider animation
  useEffect(() => {
    function animatePartners() {
      setPartnerOffset(prev => {
        let next = prev - PARTNER_SPEED;
        if (next <= -PARTNER_SLIDER_WIDTH) {
          next += PARTNER_SLIDER_WIDTH;
        }
        return next;
      });
      partnerAnimationRef.current = requestAnimationFrame(animatePartners);
    }
    
    if (!isPartnerPaused) {
      partnerAnimationRef.current = requestAnimationFrame(animatePartners);
    } else if (partnerAnimationRef.current) {
      cancelAnimationFrame(partnerAnimationRef.current);
      partnerAnimationRef.current = null;
    }
    
    return () => {
      if (partnerAnimationRef.current) {
        cancelAnimationFrame(partnerAnimationRef.current);
        partnerAnimationRef.current = null;
      }
    };
  }, [isPartnerPaused, PARTNER_SLIDER_WIDTH]);

  const handleNavigation = (sectionId: string) => {
    if (sectionId.startsWith('http')) {
      window.open(sectionId, '_blank');
      return;
    }

    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 w-full overflow-x-hidden font-roboto">
      {/* Floating Menu Button */}
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#ffffff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={['#fed7aa', '#fb923c', '#ea580c']}
        accentColor="#ea580c"
        isFixed={true}
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
        onNavigate={handleNavigation}
      />

      {/* Rest of your app content */}
      <div className="relative bg-gray-50 w-full" style={{ zIndex: 2 }}>
        <div className="w-full py-2">
          <div className="relative mb-6 h-20 sm:h-28">
            {/* Left Logo - Moves right on desktop only */}
            <div className="absolute top-1/2 left-4 sm:left-8 lg:left-16 -translate-y-1/2">
              <img
                src={topLogos[0].url}
                alt={topLogos[0].name}
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
              />
            </div>

            {/* Right Logo - Moves left on desktop only */}
            <div className="absolute top-1/2 right-4 sm:right-8 lg:right-16 -translate-y-1/2">
              <img
                src={topLogos[1].url}
                alt={topLogos[1].name}
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
              />
            </div>

            {/* Center Logo - Much Bigger and Centered */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={topLogos[2].url}
                alt={topLogos[2].name}
                className="h-56 w-56 sm:h-64 sm:w-64 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Image Section */}
      <div
        className="absolute left-0 right-0 bg-cover bg-center w-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          top: '140px',
          height: '1030px',
          opacity: 0.3,
          zIndex: 0
        }}
      ></div>

      <div className="relative w-full" style={{ zIndex: 1 }}>
        {/* Home Section */}
        <section id="home" className="px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="relative max-w-4xl mx-auto text-center mb-24 w-full">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-orange-500/30"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-gray-50 px-8 text-orange-600 font-semibold tracking-widest text-sm uppercase font-roboto">Join Us</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-5xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient font-roboto">
              Ain Shams University Career Week 2025 4th Edition
            </h1>

            <p className="text-xl md:text-xl text-black leading-relaxed mb-8 font-semibold font-roboto">
              Powered by Ain Shams University Career Center
              <br /><br />
            </p>
            
            <h2 className="text-4xl md:text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient font-roboto">
              YOUR GATEWAY TO CAREER SUCCESS
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mt-8 font-roboto">
              <div className="flex items-center gap-2 text-black hover:text-orange-500 transition-colors duration-300">
                <div className="w-2 h-2 bg-black rounded-full group-hover:bg-orange-500"></div>
                <Calendar className="w-5 h-5 text-black group-hover:text-orange-500" />
                <span className="text-lg font-semibold">Oct 19-23, 2025</span>
              </div>

              <div className="flex items-center gap-2 text-black hover:text-orange-500 transition-colors duration-300">
                <div className="w-2 h-2 bg-black rounded-full group-hover:bg-orange-500"></div>
                <span className="text-lg font-semibold">2:00 pm - 8:00 pm</span>
              </div>

              <a
                href="https://maps.app.goo.gl/p3ab5YKWvcJYAekY9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-black hover:text-orange-500 transition-colors duration-300"
              >
                <div className="w-2 h-2 bg-black rounded-full group-hover:bg-orange-500"></div>
                <span className="text-lg font-semibold">Ain Shams University</span>
                <MapPin className="w-5 h-5 text-black group-hover:text-orange-500" />
              </a>
            </div>

            <div className="flex justify-center mt-12">
              <a
                href="https://port.asucareercenter.com"
                className="group relative px-16 py-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-bold text-2xl tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 font-roboto"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                <span className="relative flex items-center gap-4">
                  <span>Register</span>
                </span>
              </a>
            </div>
          </AnimatedSection>
        </section>

        {/* Strategic Partners */}
        <AnimatedSection className="mb-28 px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl tracking-wide text-orange-700 font-bold mb-3 uppercase font-roboto">Strategic Partners</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
          </div>
          <div className="flex justify-center items-center gap-16 flex-wrap">
            {strategicPartners.map((partner, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-gradient-to-br from-white to-gray-100 rounded-3xl p-12 transform transition-all duration-500 hover:scale-105 hover:rotate-1 shadow-xl hover:shadow-2xl">
                  <img
                    src={partner.url}
                    alt={partner.name}
                    className="h-40 w-56 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Timeline Section */}
        <section id="timeline" className="px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-28 w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 font-roboto">5 Days of Innovation</h2>
              <p className="text-gray-600 text-lg font-roboto">Experience a journey through groundbreaking sessions and networking</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { icon: Calendar, day: "Day 1", title: "Exhibition Day 1", desc: "For Engineering and Computer Science Majors" },
                { icon: Users, day: "Day 2", title: "Exhibition Day 2", desc: "For Business Majors." },
                { icon: Lightbulb, day: "Day 3", title: "Exhibition Day 3", desc: "Art, Education, Alsun & Law Majors." },
                { icon: Award, day: "Day 4", title: "Recruitment Day 1", desc: "For Engineering and Computer Science Majors." },
                { icon: Rocket, day: "Day 5", title: "Recruitment Day 2", desc: "For Business, Alsun, Arts,Education and Law Majors." }
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 font-roboto">{item.day}</h3>
                    <h4 className="text-orange-500 font-semibold mb-3 font-roboto">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed font-roboto">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Highlights Section */}
        <section id="highlights" className="px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 w-full">
            <h2 className="text-5xl md:text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient font-roboto">
              ASU Career Week 24' Best Shots
            </h2>
            <div className="w-64 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6"></div>
          </AnimatedSection>

          <AnimatedSection className="mb-28 relative w-full">
            <div className="relative w-full max-w-5xl mx-auto perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>

              {/* YouTube Video Embed */}
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/VPiPryKTJnE?autoplay=0&controls=1&modestbranding=1&rel=0"
                  title="Career Week Highlights"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Opportunity Section */}
        <section className="px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16 w-full">
            <h2 className="text-4xl md:text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient font-roboto">
              Get ready for an exceptional opportunity!
            </h2>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-roboto">
              This year, we spotlight the <span className="font-semibold text-black">future of recruitment</span> 
              with a unique focus on Disciplinarity — bringing the 
              right talents to the right fields.
            </p>

            <div className="text-left space-y-4 mb-10 font-roboto">
              <h3 className="text-2xl md:text-2xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient text-center font-roboto">Here's what's waiting for you:</h3>
              <ul className="list-disc list-outside pl-6 space-y-3 text-gray-700 text-lg md:text-xl font-medium font-roboto">
                <li>
                  Over <span className="text-orange-900 font-semibold">3 Career Exhibition Days</span> and 
                  <span className="text-orange-900 font-semibold"> 2 Open Recruitment Days</span>
                </li>
                <li>
                  Meet top employers and industry leaders looking for talents like 
                  <span className="font-bold text-black"> YOU</span>
                </li>
                <li>
                  Explore career paths tailored to your faculty and specialization
                </li>
                <li>
                  Connect directly with recruiters, apply on the spot towards your dream job
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </section>

        {/* Event Partners Section */}
        <section id="partners" className="px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-28 w-full">
            <div className="text-center mb-12">
              <h2 className="text-lg tracking-[0.3em] text-orange-600 font-bold mb-3 uppercase font-roboto">Event Partners</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
            </div>

            {/* Slider for All Screen Sizes */}
            <div 
              ref={partnerSliderRef}
              className="relative w-full overflow-hidden"
              style={{ overflow: 'visible' }}
              onMouseEnter={() => setIsPartnerPaused(true)}
              onMouseLeave={() => setIsPartnerPaused(false)}
              onTouchStart={() => setIsPartnerPaused(true)}
              onTouchEnd={() => setIsPartnerPaused(false)}
            >
              {/* Gradient overlays for better visual effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent" />
              
              <div
                className="flex gap-4 md:gap-6 lg:gap-8"
                style={{
                  width: 'calc(200px * 28)',
                  transform: `translateX(${partnerOffset}px)`,
                  transition: isPartnerPaused ? 'none' : 'transform 0.1s linear'
                }}
              >
                {/* First set of partners */}
                {otherPartners.map((partner, index) => (
                  <div
                    key={index}
                    className="partner-card p-4 md:p-6 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl group flex-shrink-0 w-40 md:w-48 card-hover-effect"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-white rounded-xl p-3 md:p-4 shadow-lg">
                        <img
                          src={partner.url}
                          alt={partner.name}
                          className="h-12 md:h-16 w-24 md:w-32 object-contain mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {otherPartners.map((partner, index) => (
                  <div
                    key={`duplicate-${index}`}
                    className="partner-card p-4 md:p-6 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl group flex-shrink-0 w-40 md:w-48 card-hover-effect"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                      <div className="relative bg-white rounded-xl p-3 md:p-4 shadow-lg">
                        <img
                          src={partner.url}
                          alt={partner.name}
                          className="h-12 md:h-16 w-24 md:w-32 object-contain mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="relative pt-16 w-full">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>

            <div className="text-center mb-8">
              <h3 className="text-sm tracking-[0.3em] text-orange-500 font-semibold uppercase mb-2 font-roboto">Connect With Us</h3>
            </div>

            <div className="flex justify-center items-center gap-6">
              <a
                href="http://linkedin.com/company/18294977/admin/feed/posts/"
                className="group relative p-5 bg-white backdrop-blur-sm rounded-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-xl"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <Linkedin className="relative w-7 h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </a>

              <a
                href="https://www.instagram.com/asucareercenter/"
                className="group relative p-5 bg-white backdrop-blur-sm rounded-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 border border-gray-200 hover:border-purple-500 shadow-md hover:shadow-xl"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-700 to-purple-800 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <Instagram className="relative w-7 h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </a>

              <a
                href="https://www.facebook.com/ASUCCOFFICIAL/"
                className="group relative p-5 bg-white backdrop-blur-sm rounded-2xl transition-all duration-500 hover:scale-110 hover:rotate-3 border border-gray-200 hover:border-blue-500 shadow-md hover:shadow-xl"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <Facebook className="relative w-7 h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>

            <div className="text-center mt-12 text-gray-400 text-sm font-roboto">
              <p>
                Powered by{' '}
                <a 
                  href="https://nilebyte.info" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 font-semibold transition-all duration-200 hover:scale-105 inline-block"
                >
                  Nilebyte
                </a>{' '}
                ©
              </p>
            </div>
          </AnimatedSection>
        </section>
      </div>

      <style>{`
        .card-hover-effect {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover-effect:hover {
          transform: scale(1.08) rotate(-2deg) translateZ(0);
          z-index: 10;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
          .card-hover-effect:active {
            transform: scale(1.05) rotate(-1deg) translateZ(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;