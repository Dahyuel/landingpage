import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Instagram, Linkedin, Facebook } from 'lucide-react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
  icon: React.ComponentType<any>;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#fed7aa', '#fb923c', '#ea580c'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#000000',
  changeMenuColorOnOpen = true,
  accentColor = '#ea580c',
  isFixed = true,
  onMenuOpen,
  onMenuClose,
  onNavigate
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const menuWrapperRef = useRef<HTMLDivElement | null>(null);

  const iconRef = useRef<HTMLSpanElement | null>(null);
  const line1Ref = useRef<HTMLSpanElement | null>(null);
  const line2Ref = useRef<HTMLSpanElement | null>(null);
  const line3Ref = useRef<HTMLSpanElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const buttonFadeTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  // Click outside to close functionality
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && menuWrapperRef.current && !menuWrapperRef.current.contains(event.target as Node)) {
        toggleMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;

      const icon = iconRef.current;
      const line1 = line1Ref.current;
      const line2 = line2Ref.current;
      const line3 = line3Ref.current;

      if (!panel || !icon || !line1 || !line2 || !line3) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      // Completely hide prelayers and panel initially
      gsap.set([...preLayers, panel], { 
        xPercent: position === 'right' ? 100 : -100,
        opacity: 0,
        display: 'none'
      });

      gsap.set([line1, line2, line3], { 
        transformOrigin: '50% 50%',
        rotate: 0 
      });

      // Set initial button state
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, {
          background: 'linear-gradient(to right, #ea580c, #fb923c)'
        });
      }
    });
    return () => ctx.revert();
  }, [position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    // Reset positions for opening animation
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    // First fade out the button
    tl.to(toggleBtnRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out'
    }, 0);

    // Enable display for prelayers and panel before animating
    tl.set([...layers, panel], {
      display: 'block'
    }, 0.15);

    // Then show and animate prelayers
    layers.forEach((layer, i) => {
      tl.to(layer, { 
        opacity: 1, 
        xPercent: 0, 
        duration: 0.4,
        ease: 'power4.out' 
      }, 0.2 + i * 0.05);
    });

    const lastTime = layers.length ? 0.2 + (layers.length - 1) * 0.05 : 0.2;
    const panelInsertTime = lastTime + 0.05;
    const panelDuration = 0.5;

    // Show and animate main panel
    tl.to(
      panel,
      { 
        opacity: 1,
        xPercent: 0, 
        duration: panelDuration, 
        ease: 'power4.out' 
      },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 0.8, ease: 'power4.out', stagger: { each: 0.08, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.5, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.06, from: 'start' } },
          itemsStart + 0.08
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.25;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.4, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out',
            stagger: { each: 0.06, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.03
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const buildCloseTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    const tl = gsap.timeline({ paused: true });

    // First hide the menu content
    tl.to([panel, ...layers], {
      xPercent: position === 'right' ? 100 : -100,
      opacity: 0,
      duration: 0.25,
      ease: 'power3.in'
    }, 0);

    // Then set display to none after animation completes
    tl.set([panel, ...layers], {
      display: 'none'
    }, 0.25);

    // Then fade in the button
    tl.to(toggleBtnRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out'
    }, 0.2);

    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const tl = buildCloseTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        const panel = panelRef.current;
        if (panel) {
          const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
          if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

          const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
          ) as HTMLElement[];
          if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

          const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
          const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
          if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
          if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        }
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildCloseTimeline]);

  const animateIcon = useCallback((opening: boolean) => {
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    
    if (!line1 || !line2 || !line3) return;

    spinTweenRef.current?.kill();

    if (opening) {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(line1, { y: 6, rotate: 45, duration: 0.4 }, 0)
        .to(line2, { opacity: 0, duration: 0.25 }, 0)
        .to(line3, { y: -6, rotate: -45, duration: 0.4 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(line1, { y: 0, rotate: 0, duration: 0.3 }, 0)
        .to(line2, { opacity: 1, duration: 0.25 }, 0)
        .to(line3, { y: 0, rotate: 0, duration: 0.3 }, 0);
    }
  }, []);

  const animateButtonColor = useCallback((opening: boolean) => {
    const btn = toggleBtnRef.current;
    if (!btn) return;
    
    buttonFadeTweenRef.current?.kill();

    if (opening) {
      // When opening: black background, white icon
      gsap.to(btn, {
        background: 'linear-gradient(to right, #000000, #000000)',
        duration: 0.25,
        ease: 'power2.out',
        delay: 0.1
      });
      
      // Make icon lines white
      gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], {
        background: '#ffffff',
        duration: 0.25,
        ease: 'power2.out',
        delay: 0.1
      });
    } else {
      // When closing: orange gradient background, white icon
      gsap.to(btn, {
        background: 'linear-gradient(to right, #ea580c, #fb923c)',
        duration: 0.25,
        ease: 'power2.out',
        delay: 0.1
      });
      
      // Keep icon lines white
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        background: '#ffffff'
      });
    }
  }, []);

  const handleNavigation = useCallback((link: string) => {
    if (onNavigate) {
      onNavigate(link);
    }
    toggleMenu();
  }, [onNavigate]);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateButtonColor(target);
  }, [playOpen, playClose, animateIcon, animateButtonColor, onMenuOpen, onMenuClose]);

  return (
    <div
      ref={menuWrapperRef}
      className={`sm-scope z-50 ${isFixed ? 'fixed top-8' : 'absolute top-8'} ${
        position === 'right' ? 'right-8' : 'left-8'
      }`}
    >
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative z-50'}
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >
        {/* Remove prelayers completely since they're causing the orange flash */}
        <div
          ref={preLayersRef}
          className="sm-prelayers absolute top-0 right-0 bottom-0 pointer-events-none z-[5]"
          aria-hidden="true"
          style={{ display: 'none' }}
        />

        <button
          ref={toggleBtnRef}
          className={`sm-toggle group w-14 h-12 md:w-16 md:h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl border-0 cursor-pointer overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 flex items-center justify-center`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          
          <span
            ref={iconRef}
            className="sm-icon relative w-5 h-4 md:w-6 md:h-5 flex flex-col items-center justify-between"
            aria-hidden="true"
          >
            <span
              ref={line1Ref}
              className="sm-icon-line w-4 h-0.5 md:w-5 md:h-0.5 bg-white rounded-full transition-all duration-300"
            />
            <span
              ref={line2Ref}
              className="sm-icon-line w-4 h-0.5 md:w-5 md:h-0.5 bg-white rounded-full transition-all duration-300"
            />
            <span
              ref={line3Ref}
              className="sm-icon-line w-4 h-0.5 md:w-5 md:h-0.5 bg-white rounded-full transition-all duration-300"
            />
          </span>
        </button>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className={`staggered-menu-panel absolute top-0 h-screen bg-white flex flex-col p-24 overflow-y-auto z-10 backdrop-blur-[12px] font-roboto ${
            position === 'right' ? 'right-0' : 'left-0'
          }`}
          style={{ WebkitBackdropFilter: 'blur(12px)', display: 'none' }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col gap-5">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-2"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => (
                  <li className="sm-panel-itemWrap relative overflow-hidden leading-none" key={it.label + idx}>
                    {it.link.startsWith('http') ? (
                      <a
                        href={it.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-panel-item relative text-gray-900 font-bold text-5xl cursor-pointer leading-none tracking-tight uppercase transition-colors duration-150 ease-linear inline-block no-underline pr-8 hover:text-orange-600"
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                      >
                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                          {it.label}
                        </span>
                      </a>
                    ) : (
                      <button
                        onClick={() => handleNavigation(it.link)}
                        className="sm-panel-item relative text-gray-900 font-bold text-5xl cursor-pointer leading-none tracking-tight uppercase transition-colors duration-150 ease-linear inline-block no-underline pr-8 hover:text-orange-600 border-none bg-transparent text-left"
                        aria-label={it.ariaLabel}
                        data-index={idx + 1}
                      >
                        <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                          {it.label}
                        </span>
                      </button>
                    )}
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative text-gray-900 font-bold text-5xl cursor-pointer leading-none tracking-tight uppercase transition-colors duration-150 ease-linear inline-block no-underline pr-8">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials mt-12 pt-4 flex flex-col gap-3" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-lg font-semibold text-orange-600">Follow Us</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-6 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => {
                    const IconComponent = s.icon;
                    return (
                      <li key={s.label + i} className="sm-socials-item">
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link text-gray-800 no-underline relative inline-block p-3 transition-colors duration-300 ease-linear hover:text-orange-600 bg-gray-100 rounded-xl hover:bg-orange-50"
                          aria-label={s.label}
                        >
                          <IconComponent className="w-6 h-6" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .sm-scope .staggered-menu-wrapper { position: relative; z-index: 50; }
        
        /* Mobile positioning */
        @media (max-width: 768px) {
          .sm-scope {
            top: 1.5rem !important;
            right: 1.5rem !important;
          }
          .sm-scope[data-position="left"] {
            left: 1.5rem !important;
            right: auto !important;
          }
        }
        
        /* Small mobile positioning */
        @media (max-width: 480px) {
          .sm-scope {
            top: 1rem !important;
            right: 1rem !important;
          }
          .sm-scope[data-position="left"] {
            left: 1rem !important;
            right: auto !important;
          }
        }

        .sm-scope .sm-toggle { 
          position: relative; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: linear-gradient(to right, #ea580c, #fb923c); 
          border: none; 
          cursor: pointer; 
          overflow: hidden; 
          transition: all 0.5s ease; 
        }
        .sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; }
        .sm-scope .sm-icon { display: flex; flex-direction: column; align-items: center; justify-content: space-between; }
        .sm-scope .sm-icon-line { background: white; transition: all 0.3s ease; }
        .sm-scope .staggered-menu-panel { position: absolute; top: 0; width: 400px; height: 100vh; background: white; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6rem 2rem 2rem 2rem; overflow-y: auto; z-index: 10; font-family: 'Roboto', sans-serif; }
        .sm-scope .sm-prelayers { display: none !important; }
        .sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
        .sm-scope .sm-socials { margin-top: 3rem; padding-top: 1rem; display: flex; flex-direction: column; gap: 0.75rem; }
        .sm-scope .sm-socials-title { margin: 0; font-size: 1.125rem; font-weight: 600; color: #ea580c; }
        .sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
        .sm-scope .sm-socials-link { display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; }
        .sm-scope .sm-socials-link:hover { color: #ea580c; background: #fef3c7 !important; }
        .sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
        .sm-scope .sm-panel-item { position: relative; color: #111827; font-weight: 700; font-size: 3rem; cursor: pointer; line-height: 1; letter-spacing: -0.025em; text-transform: uppercase; transition: color 0.25s; display: inline-block; text-decoration: none; padding-right: 2rem; border: none; background: transparent; text-align: left; width: 100%; }
        .sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
        .sm-scope .sm-panel-item:hover { color: #ea580c; }
        .sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
        .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 0; font-size: 1rem; font-weight: 400; color: #ea580c; letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
        
        /* Mobile Responsive */
        @media (max-width: 768px) { 
          .sm-scope .staggered-menu-panel { width: 320px; padding: 5rem 1.5rem 1.5rem 1.5rem; } 
          .sm-scope .sm-panel-item { font-size: 2rem; }
        }
        
        @media (max-width: 640px) { 
          .sm-scope .staggered-menu-panel { width: 280px; padding: 4rem 1rem 1rem 1rem; } 
          .sm-scope .sm-panel-item { font-size: 1.75rem; }
          .sm-scope .sm-socials-list { gap: 0.5rem; }
        }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;