import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin, Facebook, ChevronLeft, ChevronRight, Calendar, Users, Lightbulb, Award, Rocket, MapPin } from 'lucide-react';
import backgroundImage from '/assets/t.jpg';

function App() {
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [isPartnerPaused, setIsPartnerPaused] = useState(false);
  const [partnerOffset, setPartnerOffset] = useState(0);
  const partnerAnimationRef = useRef<number | null>(null);
  
  const PARTNER_CARD_WIDTH = 200;
  const PARTNER_CARD_COUNT = 14;
  const PARTNER_SLIDER_WIDTH = PARTNER_CARD_WIDTH * PARTNER_CARD_COUNT;
  const PARTNER_SPEED = 0.8;

  const topLogos = [
    { name: 'asu logo', url: '/assets/logo_ain_shams.png' },
    { name: 'cc logo', url: '/assets/cclogo.png' },
    { name: 'cw logo', url: '/assets/cwl2.png' }
  ];

  const strategicPartners = [
    { name: 'Strategic Partner 1', url: '/assets/partners/Strategic/BM logo.png' },
    { name: 'Strategic Partner 2', url: '/assets/partners/Strategic/Gemini logo.png' }
  ];

  const otherPartners = [
    { name: 'Partner 1', url: '/assets/partners/Anton logo.png' },
    { name: 'Partner 2', url: '/assets/partners/Atomica logo.png' },
    { name: 'Partner 3', url: '/assets/partners/BasharSoft Logo.png' },
    { name: 'Partner 4', url: '/assets/partners/Corp logo.png' },
    { name: 'Partner 5', url: '/assets/partners/efe logo.png' },
    { name: 'Partner 6', url: '/assets/partners/Erada finance logo.jpg' },
    { name: 'Partner 7', url: '/assets/partners/Ibag logo.png' },
    { name: 'Partner 8', url: '/assets/partners/Intercom logo.jpg' },
    { name: 'Partner 9', url: '/assets/partners/MTS enterprise logo.png' },
    { name: 'Partner 10', url: '/assets/partners/Nassera group logo.PNG' },
    { name: 'Partner 11', url: '/assets/partners/Noon logo.png' },
    { name: 'Partner 12', url: '/assets/partners/Spirit logo .png' },
    { name: 'Partner 13', url: '/assets/partners/TTC logo.png' },
    { name: 'Partner 14', url: '/assets/partners/Wisely insure logo.png' }
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

  const nextPartnerSet = () => {
    setCurrentPartnerIndex((prev) => (prev + 5) % otherPartners.length);
  };

  const prevPartnerSet = () => {
    setCurrentPartnerIndex((prev) => {
      const newIndex = prev - 5;
      return newIndex < 0 ? otherPartners.length - 5 : newIndex;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="relative bg-gray-50" style={{ zIndex: 2 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="relative mb-6 h-20 sm:h-28">
            {/* Left Logo */}
            <div className="absolute top-1/2 left-4 sm:left-8 -translate-y-1/2">
              <img
                src={topLogos[0].url}
                alt={topLogos[0].name}
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
              />
            </div>

            {/* Right Logo */}
            <div className="absolute top-1/2 right-4 sm:right-8 -translate-y-1/2">
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
        className="absolute left-0 right-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          top: '140px',
          height: '1030px',
          opacity: 0.3,
          zIndex: 0
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        <div className="relative max-w-4xl mx-auto text-center mb-24 px-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-orange-500/30"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-50 px-8 text-orange-600 font-semibold tracking-widest text-sm uppercase">Join Us</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-5xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient">
            Ain Shams University Career Week 2025 4th Edition
          </h1>

          <p className="text-xl md:text-xl text-black leading-relaxed mb-8 font-semibold">
            Powered by Ain Shams University Career Center
            <br /><br />
          </p>
          
          <h2 className="text-4xl md:text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient">
            YOUR GATEWAY TO CAREER SUCCESS
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
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
              className="group relative px-16 py-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full text-white font-bold text-2xl tracking-wide overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <span className="relative flex items-center gap-4">
                <span>Register</span>
                <ChevronRight className="w-7 h-7 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>

        <div className="mb-28">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl tracking-wide text-orange-700 font-bold mb-3 uppercase">Strategic Partners</h2>
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
        </div>

        <div className="mb-28">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">5 Days of Innovation</h2>
            <p className="text-gray-600 text-lg">Experience a journey through groundbreaking sessions and networking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl animate-slideUp" style={{ animationDelay: '0s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Day 1</h3>
                <h4 className="text-orange-500 font-semibold mb-3">Exhibition Day 1</h4>
                <p className="text-gray-600 text-sm leading-relaxed">For Engineering and Computer Science Majors</p>
              </div>
            </div>

            <div className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Day 2</h3>
                <h4 className="text-orange-500 font-semibold mb-3">Exhibition Day 2</h4>
                <p className="text-gray-600 text-sm leading-relaxed">For Business Majors.</p>
              </div>
            </div>

            <div className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Day 3</h3>
                <h4 className="text-orange-500 font-semibold mb-3">Exhibition Day 3</h4>
                <p className="text-gray-600 text-sm leading-relaxed">Art, Education, Alsun & Law Majors .</p>
              </div>
            </div>

            <div className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Day 4</h3>
                <h4 className="text-orange-500 font-semibold mb-3">Recruitment Day 1</h4>
                <p className="text-gray-600 text-sm leading-relaxed">For Engineering and Computer Science Majors.</p>
              </div>
            </div>

            <div className="group relative bg-white backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-orange-500 transition-all duration-500 hover:scale-105 shadow-md hover:shadow-xl animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Day 5</h3>
                <h4 className="text-orange-500 font-semibold mb-3">Recruitment Day 2</h4>
                <p className="text-gray-600 text-sm leading-relaxed">For Business, Alsun, Arts,Education and Law Majors.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-3xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient">
            ASU Career Week 24' Best Shots
          </h2>
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto mt-6"></div>
        </div>

        <div className="mb-28 relative">
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
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16 px-4">
          <h2 className="text-4xl md:text-4xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient">
            Get ready for an exceptional opportunity!
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            This year, we spotlight the <span className="font-semibold text-black">future of recruitment</span> 
            with a unique focus on Disciplinarity — bringing the 
            right talents to the right fields.
          </p>

          <div className="text-left space-y-4 mb-10">
            <h3 className="text-2xl md:text-2xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-gray-900 bg-clip-text text-transparent animate-gradient text-center">Here's what's waiting for you:</h3>
            <ul className="list-disc list-outside pl-6 space-y-3 text-gray-700 text-lg md:text-xl font-medium">
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
        </div>

        {/* Updated Partners Section with Slider Animation */}
        <div className="mb-28">
          <div className="text-center mb-12">
            <h2 className="text-lg tracking-[0.3em] text-orange-600 font-bold mb-3 uppercase">Event Partners</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent mx-auto"></div>
          </div>

          {/* Desktop Slider */}
          <div className="hidden md:block relative" style={{ overflow: 'visible' }}>
            <div
              className="flex gap-8"
              style={{
                width: 'calc(200px * 28)',
                transform: `translateX(${partnerOffset}px)`,
                transition: isPartnerPaused ? 'none' : undefined
              }}
            >
              {/* First set of partners */}
              {otherPartners.map((partner, index) => (
                <div
                  key={index}
                  className="partner-card p-6 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl group flex-shrink-0 w-48 card-hover-effect"
                  onMouseEnter={() => setIsPartnerPaused(true)}
                  onMouseLeave={() => setIsPartnerPaused(false)}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-xl p-4 shadow-lg">
                      <img
                        src={partner.url}
                        alt={partner.name}
                        className="h-16 w-32 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {otherPartners.map((partner, index) => (
                <div
                  key={`duplicate-${index}`}
                  className="partner-card p-6 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl group flex-shrink-0 w-48 card-hover-effect"
                  onMouseEnter={() => setIsPartnerPaused(true)}
                  onMouseLeave={() => setIsPartnerPaused(false)}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="relative bg-white rounded-xl p-4 shadow-lg">
                      <img
                        src={partner.url}
                        alt={partner.name}
                        className="h-16 w-32 object-contain mx-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Grid with Navigation */}
          <div className="md:hidden">
            <div className="relative max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                <button
                  onClick={prevPartnerSet}
                  className="group p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 z-10 flex-shrink-0"
                  aria-label="Previous partners"
                >
                  <ChevronLeft className="w-6 h-6 text-white transition-transform group-hover:-translate-x-1" />
                </button>

                <div className="flex-1 overflow-hidden px-2">
                  <div className="flex justify-center items-center gap-4 sm:gap-6 min-h-[120px] flex-wrap">
                    {Array.from({ length: window.innerWidth < 640 ? 2 : 3 }).map((_, index) => {
                      const partnerIndex = (currentPartnerIndex + index) % otherPartners.length;
                      const partner = otherPartners[partnerIndex];
                      return (
                        <div
                          key={`${currentPartnerIndex}-${index}`}
                          className="flex-shrink-0 animate-fadeIn"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="partner-card p-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl group card-hover-effect">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                              <div className="relative bg-white rounded-xl p-3 shadow-lg">
                                <img
                                  src={partner.url}
                                  alt={partner.name}
                                  className="h-12 w-24 object-contain mx-auto"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={nextPartnerSet}
                  className="group p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-400 z-10 flex-shrink-0"
                  aria-label="Next partners"
                >
                  <ChevronRight className="w-6 h-6 text-white transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="flex justify-center items-center gap-2 mt-6">
                {Array.from({ length: Math.ceil(otherPartners.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPartnerIndex(index * 3)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      Math.floor(currentPartnerIndex / 3) === index
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-8 shadow-lg shadow-orange-500/50'
                        : 'bg-gray-300 w-2 hover:bg-gray-400 hover:w-4'
                    }`}
                    aria-label={`Go to partner set ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative pt-16">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>

          <div className="text-center mb-8">
            <h3 className="text-sm tracking-[0.3em] text-orange-500 font-semibold uppercase mb-2">Connect With Us</h3>
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

          <div className="text-center mt-12 text-gray-400 text-sm">
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
        </div>
      </div>

      <style>{`
        .card-hover-effect {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover-effect:hover {
          transform: scale(1.08) rotate(-2deg) translateZ(0);
          z-index: 10;
        }
      `}</style>
    </div>
  );
}

export default App;
