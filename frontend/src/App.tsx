import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type Variants,
} from 'framer-motion';

const navigation = [
  { label: 'About', href: '#introduction' },
  { label: 'For doctors', href: '#doctors' },
  { label: 'Knowledge', href: '#knowledge' },
  { label: 'How it works', href: '#how-it-works' },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? 'arrow-icon arrow-icon--diagonal' : 'arrow-icon'}
      viewBox="0 0 20 20"
      fill="none"
    >
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function LeafMark() {
  return (
    <svg aria-hidden="true" className="leaf-mark" viewBox="0 0 42 42" fill="none">
      <path
        d="M33.7 7.1C20.1 6.6 9.8 10.1 8 20.5c-1.4 8.3 7.1 12.8 13.4 8.1C27 24.5 29.3 15.7 33.7 7.1Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M8.7 33.6c4.1-7.2 9.2-12.5 17.4-18.1" stroke="currentColor" strokeWidth="1.4" />
      <path d="M17.4 25.7c-2.2-3.1-2.7-6.1-2.6-8.6m8.1 1.3c3.1.2 5.4 1 7.1 2.3" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

function DrawnLeaf() {
  return (
    <svg
      aria-hidden="true"
      className="drawn-leaf"
      data-scroll-draw
      viewBox="0 0 100 100"
      fill="none"
    >
      <path
        pathLength="1"
        d="M78 14C47 13 22 25 18 49c-3 20 17 31 32 20 15-11 20-32 28-55Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        pathLength="1"
        d="M19 81c13-20 26-34 48-50"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        pathLength="1"
        d="M37 60c-5-8-7-15-6-23m20 5c8 1 14 3 19 7"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function ScrollSequence({
  items,
  label,
  direction = 'up',
  showProgress = true,
}: {
  items: ReactNode[];
  label: string;
  direction?: 'up' | 'left';
  showProgress?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextIndex = Math.min(items.length - 1, Math.floor(progress * items.length));
    setActiveIndex(nextIndex);
  });

  const offset = direction === 'left' ? -70 : 0;

  return (
    <div
      ref={containerRef}
      className="scroll-sequence"
      style={{ height: `${items.length * 82}svh` }}
    >
      <div className="scroll-sequence-stage" role="list" aria-label={label}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeIndex}
            className="scroll-sequence-item"
            role="listitem"
            initial={shouldReduceMotion ? false : { opacity: 0, x: offset, y: direction === 'up' ? 48 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, x: direction === 'left' ? 55 : 0, y: direction === 'up' ? -36 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.48, ease: [0.22, 0.72, 0.24, 1] }}
          >
            {items[activeIndex]}
          </motion.div>
        </AnimatePresence>
        {showProgress && (
          <div className="sequence-progress" aria-hidden="true">
            {items.map((_, index) => (
              <span className={index === activeIndex ? 'is-active' : ''} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const mosaicContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const mosaicTileVariants: Variants = {
  hidden: (direction: 'left' | 'top' | 'right' | 'bottom') => ({
    opacity: 0,
    x: direction === 'left' ? -54 : direction === 'right' ? 54 : 0,
    y: direction === 'top' ? -48 : direction === 'bottom' ? 48 : 0,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.72, ease: [0.2, 0.75, 0.25, 1] },
  },
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return undefined;

    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    const hero = document.querySelector<HTMLElement>('.hero');
    const drawings = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-draw]'));
    const principles = document.querySelector<HTMLElement>('.principles');
    document.documentElement.classList.add('motion-ready');
    let frame = 0;

    const updateParallax = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        layers.forEach((layer) => {
          const speed = Number(layer.dataset.parallax ?? 0);
          const center = layer.getBoundingClientRect().top + layer.offsetHeight / 2;
          const offset = (viewportCenter - center) * speed;
          layer.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
          const horizontalSpeed = Number(layer.dataset.parallaxX ?? 0);
          const horizontalOffset = (viewportCenter - center) * horizontalSpeed;
          layer.style.setProperty('--parallax-x', `${horizontalOffset.toFixed(1)}px`);
        });

        if (hero) {
          const progress = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.72)));
          hero.style.setProperty('--hero-photo-opacity', `${(1 - progress).toFixed(2)}`);
        }

        drawings.forEach((drawing) => {
          const bounds = drawing.getBoundingClientRect();
          const distance = window.innerHeight + bounds.height * 0.7;
          const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / distance));
          drawing.style.setProperty('--draw-progress', progress.toFixed(3));
        });

        if (principles) {
          const bounds = principles.getBoundingClientRect();
          const progress = Math.min(1, Math.max(0, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
          principles.style.setProperty('--gradient-progress', progress.toFixed(3));
          principles.style.setProperty('--gradient-position', `${(100 - progress * 100).toFixed(1)}%`);
          principles.style.setProperty('--gradient-opacity', (0.28 + progress * 0.72).toFixed(3));
          principles.style.setProperty('--gradient-y', `${((1 - progress) * 35).toFixed(1)}px`);
        }
      });
    };

    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('motion-ready');
      window.removeEventListener('scroll', updateParallax);
      window.removeEventListener('resize', updateParallax);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="Mey Veda home" onClick={closeMenu}>
            <LeafMark />
            <span>mey <i>veda</i></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav
            id="primary-navigation"
            className={menuOpen ? 'primary-nav primary-nav--open' : 'primary-nav'}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a href={item.href} key={item.href} onClick={closeMenu}>{item.label}</a>
            ))}
            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Request a demo <ArrowIcon diagonal />
            </a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-art" aria-label="Botanical still life representing traditional knowledge in a contemporary setting" role="img">
            <div className="hero-photo parallax-media" data-parallax="0.04" />
            <div className="hero-art-wash" />
            <div className="hero-art-ring" />
            <div className="hero-art-label"><span>01 / 04</span><span>Knowledge, in context</span></div>
            <div className="hero-art-caption">
              <LeafMark />
              <span>Tradition<br />meets discovery</span>
            </div>
            <div className="hero-stamp" aria-hidden="true">
              <span>MEY VEDA</span>
              <span className="stamp-dot">✳</span>
              <span>ROOTED IN KNOWLEDGE</span>
            </div>
          </div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> A more connected reference experience</p>
              <h1 id="hero-title">
                <span className="hero-title-line">Ayurvedic Knowledge,</span>
                <span className="hero-title-line"><em>More Connected.</em></span>
              </h1>
              <p className="hero-description">
                Explore Ayurvedic formulations, ingredients, and references through a more organized digital experience.
              </p>
              <div className="hero-actions">
                <a className="button button--dark" href="#contact">Request a demo <ArrowIcon /></a>
                <a className="text-link" href="#introduction">Discover Mey Veda <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-note">
                <span className="note-rule" />
                <span>Made for the practice of understanding</span>
              </div>
            </div>
          </div>
          <div className="hero-bottomline">
            <span>For doctors and researchers</span>
            <span>Scroll to explore <span aria-hidden="true">↓</span></span>
          </div>
        </section>

        <section className="challenge section-shell" id="challenge" aria-labelledby="challenge-title">
          <div className="section-kicker"><span>01</span><span>The challenge</span></div>
          <div className="challenge-content">
            <h2 id="challenge-title" data-parallax="-0.08">Finding knowledge<br />should feel <em>simpler.</em></h2>
            <div className="challenge-aside" data-parallax="-0.045">
              <span className="asterisk" aria-hidden="true">✳</span>
              <p>Useful information can live across different sources, making it harder to see how formulations, ingredients, and references relate.</p>
            </div>
          </div>
          <div className="challenge-bottom">
            <span>One question can lead in many directions.</span>
            <span className="challenge-path" aria-hidden="true">
              <i /><i /><i /><i /><i />
            </span>
            <span>Bring the connections into view.</span>
          </div>
        </section>

        <section className="introduction section-shell" id="introduction" aria-labelledby="intro-title">
          <div className="intro-art parallax-media" data-parallax="-0.035" data-parallax-x="-0.055">
            <svg className="intro-orbit intro-orbit--one" viewBox="0 0 350 350" aria-hidden="true">
              <circle data-scroll-draw cx="175" cy="175" r="174" pathLength="1" />
            </svg>
            <svg className="intro-orbit intro-orbit--two" viewBox="0 0 275 275" aria-hidden="true">
              <circle data-scroll-draw cx="137.5" cy="137.5" r="136.5" pathLength="1" />
            </svg>
            <div className="intro-illustration parallax-media" data-parallax="0.06">
              <DrawnLeaf />
              <span className="intro-illustration-label">A living body of knowledge</span>
            </div>
            <span className="intro-index">MV / 01</span>
          </div>
          <div className="intro-copy parallax-media" data-parallax="0.07">
            <div className="section-kicker section-kicker--light"><span>02</span><span>Introducing Mey Veda</span></div>
            <p className="eyebrow eyebrow--light">A considered way to look closer</p>
            <h2 id="intro-title">A clearer way<br />to explore <em>Ayurveda.</em></h2>
            <p className="intro-description">Mey Veda brings Ayurvedic reference knowledge into a more organized digital experience, helping professionals explore formulations, ingredients, and their documented connections.</p>
            <a className="light-link" href="#knowledge">Explore what we bring together <ArrowIcon /></a>
          </div>
          <div className="intro-side-note">Knowledge is not a collection of answers. It is a way to follow the thread.</div>
        </section>

        <section className="doctors section-shell" id="doctors" aria-labelledby="doctors-title">
          <div className="doctors-heading">
            <div className="section-kicker"><span>03</span><span>Value for doctors</span></div>
            <h2 id="doctors-title">Less hunting.<br /><em>More understanding.</em></h2>
            <p>A thoughtful reference experience for the questions that guide professional exploration.</p>
          </div>
          <ScrollSequence
            label="Benefits for doctors"
            direction="up"
            showProgress={false}
            items={[
              <article className="benefit benefit--first" key="benefit-navigation">
                <div className="benefit-number">01</div>
                <div className="benefit-symbol benefit-symbol--lines" aria-hidden="true"><span /><span /><span /></div>
                <div className="benefit-copy">
                  <h3>Find your way through information</h3>
                  <p>Move through reference information with clearer organization and fewer disconnected paths.</p>
                </div>
                <span className="benefit-index">Navigate</span>
              </article>,
              <article className="benefit benefit--second" key="benefit-formulation">
                <div className="benefit-number">02</div>
                <div className="benefit-symbol benefit-symbol--circle" aria-hidden="true"><span /><span /></div>
                <div className="benefit-copy">
                  <h3>Explore what makes a formulation</h3>
                  <p>See formulations alongside ingredient details where information is available.</p>
                </div>
                <span className="benefit-index">Explore</span>
              </article>,
              <article className="benefit benefit--third" key="benefit-connections">
                <div className="benefit-number">03</div>
                <div className="benefit-symbol benefit-symbol--branch" aria-hidden="true"><span /><span /><span /></div>
                <div className="benefit-copy">
                  <h3>Follow the connections</h3>
                  <p>Trace related information and supporting sources where documented connections exist.</p>
                </div>
                <span className="benefit-index">Connect</span>
              </article>,
            ]}
          />
        </section>

        <section className="knowledge section-shell" id="knowledge" aria-labelledby="knowledge-title">
          <div className="knowledge-heading">
            <div className="section-kicker"><span>04</span><span>The knowledge we bring together</span></div>
            <h2 id="knowledge-title">A connected view,<br /><em>not a crowded one.</em></h2>
            <p>Explore related knowledge in context, with collections and connections shown where available.</p>
          </div>
          <motion.div
            className="knowledge-mosaic"
            variants={mosaicContainerVariants}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
          >
            <motion.article className="mosaic-tile mosaic-tile--formulations" variants={mosaicTileVariants} custom="left" whileHover={{ y: -4 }}>
              <span className="tile-number">01</span>
              <div className="tile-formula" aria-hidden="true"><i /><i /><i /><b /></div>
              <div><span className="tile-label">Explore</span><h3>Formulations</h3></div>
              <ArrowIcon diagonal />
            </motion.article>
            <motion.article className="mosaic-tile mosaic-tile--dravya" variants={mosaicTileVariants} custom="top" whileHover={{ y: -4 }}>
              <span className="tile-number">02</span>
              <LeafMark />
              <div><span className="tile-label">Understand</span><h3>Dravya &amp; ingredients</h3></div>
              <ArrowIcon diagonal />
            </motion.article>
            <motion.article className="mosaic-tile mosaic-tile--sources" variants={mosaicTileVariants} custom="right" whileHover={{ y: -4 }}>
              <span className="tile-number">03</span>
              <div className="source-lines" aria-hidden="true"><i /><i /><i /><i /></div>
              <div><span className="tile-label">See the context</span><h3>Source publications</h3></div>
              <ArrowIcon diagonal />
            </motion.article>
            <motion.article className="mosaic-tile mosaic-tile--terms" variants={mosaicTileVariants} custom="right" whileHover={{ y: -4 }}>
              <span className="tile-number">04</span>
              <div className="term-mark" aria-hidden="true">अ</div>
              <div><span className="tile-label">Find the meaning</span><h3>Terminology</h3></div>
              <ArrowIcon diagonal />
            </motion.article>
            <motion.article className="mosaic-tile mosaic-tile--references" variants={mosaicTileVariants} custom="bottom" whileHover={{ y: -4 }}>
              <span className="tile-number">05</span>
              <div className="reference-web" aria-hidden="true"><i /><i /><i /><i /><b /><b /><b /></div>
              <div><span className="tile-label">Follow the thread</span><h3>Connected references</h3></div>
              <ArrowIcon diagonal />
            </motion.article>
          </motion.div>
          <p className="knowledge-footnote"><span aria-hidden="true">*</span> Content and connections are presented where available in Mey Veda.</p>
        </section>

        <section className="process section-shell" id="how-it-works" aria-labelledby="process-title">
          <div className="process-intro">
            <div className="section-kicker"><span>05</span><span>How it works</span></div>
            <h2 id="process-title">Follow a question<br />where it <em>leads.</em></h2>
            <p>A simple path through connected reference information.</p>
          </div>
          <ScrollSequence
            label="How Mey Veda works"
            items={[
              <div className="process-step" key="step-topic">
                <span className="step-count">01</span>
                <span className="step-icon step-icon--topic" aria-hidden="true"><i /></span>
                <h3>Topic</h3>
                <p>Begin with what you want to understand.</p>
              </div>,
              <div className="process-step" key="step-explore">
                <span className="step-count">02</span>
                <span className="step-icon step-icon--explore" aria-hidden="true"><i /><i /><i /></span>
                <h3>Explore information</h3>
                <p>See related formulations and details.</p>
              </div>,
              <div className="process-step" key="step-references">
                <span className="step-count">03</span>
                <span className="step-icon step-icon--follow" aria-hidden="true"><i /><i /><i /></span>
                <h3>Follow references</h3>
                <p>Continue to supporting sources where linked.</p>
              </div>,
              <div className="process-step" key="step-context">
                <span className="step-count">04</span>
                <span className="step-icon step-icon--context" aria-hidden="true"><i /><i /></span>
                <h3>Return with context</h3>
                <p>Bring the thread of information with you.</p>
              </div>,
            ]}
          />
        </section>

        <section className="principles section-shell" id="principles" aria-labelledby="principles-title">
          <div className="principles-top">
            <div className="section-kicker section-kicker--light"><span>06</span><span>A more thoughtful reference experience</span></div>
            <p className="principles-aside">Built around the way professionals make sense of information.</p>
          </div>
          <div className="principles-main" data-parallax="-0.035">
            <h2 id="principles-title">Thoughtful by<br /><em>design.</em></h2>
            <div className="principle-list">
              <article><span>01</span><div><h3>Organized information</h3><p>Move between related knowledge with a clearer sense of structure.</p></div></article>
              <article><span>02</span><div><h3>Visible source context</h3><p>Keep supporting sources in view where documented connections exist.</p></div></article>
              <article><span>03</span><div><h3>Made for professional use</h3><p>Explore reference material through a considered, focused experience.</p></div></article>
            </div>
          </div>
          <div className="principles-seal" aria-hidden="true" data-parallax="-0.06"><LeafMark /><span>Knowledge<br />with context</span></div>
        </section>

        <section className="final-cta section-shell" id="contact" aria-labelledby="contact-title">
          <div className="cta-flower" aria-hidden="true">✳</div>
          <div className="section-kicker"><span>07</span><span>Begin a conversation</span></div>
          <h2 id="contact-title">Bring Ayurvedic knowledge<br />closer to <em>your practice.</em></h2>
          <p>Doctors and researchers are invited to learn more about Mey Veda and its approach to reference knowledge.</p>
          <div className="cta-actions">
            <a className="button button--dark" href="#contact">Request a demo <ArrowIcon /></a>
            <a className="button button--outline" href="#contact">Contact us <ArrowIcon diagonal /></a>
          </div>
          <span className="cta-note">Mey Veda · Knowledge, thoughtfully connected</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand brand--footer" href="#top" aria-label="Mey Veda home">
            <LeafMark /><span>mey <i>veda</i></span>
          </a>
          <p>Ayurvedic knowledge,<br />more connected.</p>
          <nav aria-label="Footer navigation">
            <a href="#introduction">About</a>
            <a href="#doctors">For doctors</a>
            <a href="#knowledge">Knowledge</a>
            <a href="#how-it-works">How it works</a>
          </nav>
          <a className="footer-contact" href="#contact">Start a conversation <ArrowIcon diagonal /></a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mey Veda</span>
          <span>Rooted in knowledge. Made for discovery.</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

export default App;
