'use client';
import { useState, useEffect, useRef } from 'react';

const t = {
  en: {
    eyebrow: 'Door-to-door ski & snowboard service',
    title1: 'Your gear,', title2: 'serviced &', title3: 'delivered.',
    sub: 'We collect your skis or snowboard, bring them to a certified workshop, and return them to your door — sharp, waxed, and ready to ride.',
    bookBtn: 'BOOK A PICKUP',
    howLabel: 'Process', howTitle: 'How it', howTitleEm: 'works',
    steps: [
      { title: 'Book Online', desc: 'Fill in your details and choose your service. No account needed — takes 60 seconds.' },
      { title: 'We Collect', desc: 'Our team picks up your equipment directly from your home or office.' },
      { title: 'Expert Service', desc: 'Our partner workshop tunes your gear — wax, edge grind, full service.' },
      { title: 'We Deliver', desc: 'Clean, sharp, and perfectly tuned — dropped back at your door.' },
    ],
    pricingLabel: 'Pricing', pricingTitle: "What's", pricingTitleEm: 'included',
    popular: 'Most Popular',
    fee: 'Prices include pickup & delivery',
    waxName: 'Small Service', waxF: ['Edge sharpening + waxing', 'Ski: 12 500 HUF', 'Child ski: 10 000 HUF', 'Snowboard: 14 000 HUF'],
    fullName: 'Full Service', fullF: ['Small service + base restoration', 'Ski: 14 000 HUF', 'Child ski: 12 000 HUF', 'Snowboard: 15 000 HUF'],
    edgeName: 'Multi-Equipment', edgeF: ['2 pairs → 5% discount', '3+ pairs → 10% discount', 'Applies to all services'],
    cancelNote: 'Cancellation policy: Late cancellation (under 24h) or no-show may incur up to 50% of the service fee. We\'ll always reach out first.',
    teamLabel: 'The people behind it', teamTitle: 'Our', teamTitleEm: 'team',
    footerSub: 'Budapest · Hungary',
    footer: '© 2025 SKIEASY-PEASY. All rights reserved.',
    chatTitle: 'Skieasy', chatSub: 'Ask anything about our service',
    chatWelcome: "Hi! I'm Skieasy ❄️ Ask me anything about our service, pricing, or pickup process.",
    chatPlaceholder: 'Ask about pricing, timing…', chatSend: 'Send',
    booked: '✅ Booking received! We\'ll confirm your pickup window shortly.',
    demo: '⚠️ DEMO WEBSITE — NOT FOR SERVICE',
    langBtn: '🇭🇺 HU',
    bubble: 'Talk to me!',
  },
  hu: {
    eyebrow: 'Háztól házig sífelszerelés-szerviz',
    title1: 'A felszerelésed,', title2: 'karbantartva &', title3: 'visszahozva.',
    sub: 'Összegyűjtjük a sílécedet vagy snowboardodat, elvisszük egy szakműhelybe, és visszahozzuk az ajtódhoz — éles, waxolt és menetkész.',
    bookBtn: 'FOGLALJ FELVÉTELT',
    howLabel: 'Folyamat', howTitle: 'Hogyan', howTitleEm: 'működik',
    steps: [
      { title: 'Foglalj Online', desc: 'Töltsd ki az adataidat és válaszd ki a szolgáltatást. Nincs szükség fiókra — 60 másodperc.' },
      { title: 'Felvesszük', desc: 'Csapatunk elveszi a felszerelésed közvetlenül otthonodból vagy irodádból.' },
      { title: 'Szakértői Szerviz', desc: 'Partnerműhelyünk beállítja a felszerelésed — wax, élezés, teljes szerviz.' },
      { title: 'Visszaszállítjuk', desc: 'Tisztán, élesen és tökéletesen beállítva — visszahozzuk az ajtódhoz.' },
    ],
    pricingLabel: 'Árak', pricingTitle: 'Mi', pricingTitleEm: 'van benne',
    popular: 'Legnépszerűbb',
    fee: 'Az árak tartalmazzák a szállítást',
    waxName: 'Kis Szerviz', waxF: ['Élezés + waxolás', 'Síléc: 12 500 HUF', 'Gyermek síléc: 10 000 HUF', 'Snowboard: 14 000 HUF'],
    fullName: 'Teljes Szerviz', fullF: ['Kis szerviz + talpfelújítás', 'Síléc: 14 000 HUF', 'Gyermek síléc: 12 000 HUF', 'Snowboard: 15 000 HUF'],
    edgeName: 'Több Felszerelés', edgeF: ['2 pár → 5% kedvezmény', '3+ pár → 10% kedvezmény', 'Minden szolgáltatásra érvényes'],
    cancelNote: 'Lemondási szabályzat: Késői lemondás (24 órán belül) vagy meg nem jelenés esetén a szolgáltatási díj 50%-a felszámítható. Mindig felvesszük veled a kapcsolatot.',
    teamLabel: 'Az emberek mögötte', teamTitle: 'A mi', teamTitleEm: 'csapatunk',
    footerSub: 'Budapest · Magyarország',
    footer: '© 2025 SKIEASY-PEASY. Minden jog fenntartva.',
    chatTitle: 'Skieasy', chatSub: 'Kérdezz bármit a szolgáltatásunkról',
    chatWelcome: 'Szia! Skieasy vagyok ❄️ Kérdezz bármit a szolgáltatásunkról, árainkról vagy a felvételi folyamatról.',
    chatPlaceholder: 'Kérdezz az árakról, időzítésről…', chatSend: 'Küldés',
    booked: '✅ Foglalás megérkezett! Hamarosan megerősítjük a felvételi időpontot.',
    demo: '⚠️ DEMO WEBOLDAL — NEM VALÓDI SZOLGÁLTATÁS',
    langBtn: '🇬🇧 EN',
    bubble: 'Írj nekem!',
  }
};

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBooked, setShowBooked] = useState(false);
  const [lang, setLang] = useState<'en'|'hu'>('en');
  const [showBubble, setShowBubble] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('skieasy-lang');
    if (saved === 'hu') setLang('hu');
  }, []);

  const switchLang = (l: 'en'|'hu') => {
    setLang(l);
    localStorage.setItem('skieasy-lang', l);
  };
  const tx = t[lang];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('booked=1')) {
      setShowBooked(true);
      setTimeout(() => setShowBooked(false), 6000);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide bubble when chat opens
  const handleOpenChat = () => {
    setChatOpen(true);
    setShowBubble(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --snow: #ffffff; --snow2: #f0f7ff; --snow3: #daeaf7; --ice: #b8d9f0;
          --blue: #4a9eca; --blue-dark: #2271a3;
          --text: #1a2e3d; --text-mid: #4a6278; --text-light: #8aaabb;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--snow); color: var(--text); overflow-x: hidden; }

        .demo-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: #f59e0b; color: #1a1a1a; text-align: center; padding: 0.55rem 1rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.04em; animation: flash 2s ease-in-out infinite; }
        @keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

        .snowflakes { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .flake { position: absolute; top: -20px; color: var(--ice); animation: fall linear infinite; opacity: 0.55; user-select: none; }
        @keyframes fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 0.6; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }

        nav { position: fixed; top: 2.2rem; left: 0; right: 0; z-index: 100; padding: 1.2rem 2.5rem; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
        nav.scrolled { background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border-bottom: 1px solid var(--snow3); box-shadow: 0 2px 20px rgba(74,158,202,0.1); }
        .nav-inner { display: flex; align-items: center; gap: 1.5rem; }
        .nav-logo { font-family: 'Playfair Display', serif; font-size: 2rem; font-weight: 900; color: var(--blue-dark); }
        .nav-logo span { color: var(--blue); font-style: italic; }
        .lang-btn { background: var(--snow3); border: 1.5px solid var(--ice); color: var(--blue-dark); font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.08em; padding: 0.35rem 0.8rem; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
        .lang-btn:hover { background: var(--blue-dark); color: white; border-color: var(--blue-dark); }

        .booking-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 998; background: var(--blue-dark); color: white; text-align: center; padding: 0.9rem 1rem; font-weight: 500; font-size: 0.95rem; animation: slideDown 0.4s ease; }
        @keyframes slideDown { from { transform: translateY(-100%); } to { transform: translateY(0); } }

        .hero { min-height: 100vh; position: relative; display: flex; align-items: center; padding: 10rem 2.5rem 5rem; overflow: hidden; background: linear-gradient(160deg, #ffffff 0%, #eaf5ff 45%, #d4ecfa 100%); }
        .hero-circle { position: absolute; border-radius: 50%; pointer-events: none; }
        .hero-circle-1 { width: 600px; height: 600px; top: -100px; right: -100px; background: radial-gradient(circle, rgba(74,158,202,0.1) 0%, transparent 70%); }
        .hero-circle-2 { width: 400px; height: 400px; bottom: -60px; left: -80px; background: radial-gradient(circle, rgba(180,217,240,0.18) 0%, transparent 70%); }
        .hero-content { position: relative; z-index: 2; max-width: 650px; }
        .hero-eyebrow { font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--blue); margin-bottom: 1.2rem; font-weight: 500; display: flex; align-items: center; gap: 0.7rem; }
        .hero-eyebrow::before { content: '❄'; font-size: 1rem; }
        .hero-title { font-family: 'Playfair Display', serif; font-size: clamp(3.2rem, 8vw, 6.5rem); font-weight: 900; line-height: 1.05; color: var(--blue-dark); margin-bottom: 1.5rem; }
        .hero-title em { color: var(--blue); font-style: italic; }
        .hero-sub { font-size: 1.15rem; font-weight: 300; line-height: 1.8; color: var(--text-mid); max-width: 480px; margin-bottom: 2.5rem; }

        .mobile-book-btn { display: none; background: var(--blue-dark); color: white; padding: 1rem 2.4rem; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 1rem; border: none; cursor: pointer; text-decoration: none; border-radius: 50px; box-shadow: 0 6px 20px rgba(34,113,163,0.3); transition: all 0.25s; }
        .mobile-book-btn:hover { background: var(--blue); transform: translateY(-2px); }

        .hero-circle-btn { position: absolute; right: 8%; top: 50%; transform: translateY(-50%); display: flex; flex-direction: column; align-items: center; justify-content: center; width: 220px; height: 220px; border-radius: 50%; background: radial-gradient(circle at 40% 35%, #4a9eca, #2271a3); border: none; box-shadow: 0 10px 40px rgba(34,113,163,0.4); text-decoration: none; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; gap: 0.6rem; z-index: 2; }
        .hero-circle-btn:hover { transform: translateY(-50%) scale(1.05); box-shadow: 0 16px 50px rgba(34,113,163,0.5); }
        .hero-circle-btn-icon { font-size: 3rem; line-height: 1; }
        .hero-circle-btn-label { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; color: white; font-weight: 600; font-family: 'DM Sans', sans-serif; text-align: center; }

        section { padding: 6rem 2.5rem; position: relative; }
        .section-eyebrow { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue); font-weight: 500; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.6rem; }
        .section-eyebrow::before { content: '❄'; }
        .section-title { font-family: 'Playfair Display', serif; font-size: clamp(2.2rem, 4vw, 3.2rem); font-weight: 900; color: var(--blue-dark); line-height: 1.1; margin-bottom: 1rem; }
        .section-title em { color: var(--blue); font-style: italic; }

        .how-section { background: var(--snow2); }
        .how-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.8rem; margin-top: 3rem; }
        .how-step { background: white; border-radius: 20px; padding: 2.2rem 1.8rem; border: 1px solid var(--snow3); position: relative; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 20px rgba(74,158,202,0.06); }
        .how-step:hover { transform: translateY(-6px); box-shadow: 0 14px 36px rgba(74,158,202,0.13); }
        .step-num { font-family: 'Playfair Display', serif; font-size: 4rem; font-weight: 900; color: var(--snow3); line-height: 1; position: absolute; top: 1.2rem; right: 1.5rem; }
        .step-icon { font-size: 2rem; margin-bottom: 1rem; display: block; }
        .step-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; font-weight: 700; color: var(--text); margin-bottom: 0.5rem; }
        .step-desc { font-size: 0.9rem; font-weight: 300; color: var(--text-mid); line-height: 1.65; }

        .pricing-section { background: white; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .price-card { background: var(--snow2); border: 1px solid var(--snow3); border-radius: 20px; padding: 2.2rem 2rem; position: relative; transition: transform 0.3s, box-shadow 0.3s; }
        .price-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(74,158,202,0.12); }
        .price-card.featured { background: var(--blue-dark); border-color: var(--blue-dark); color: white; }
        .price-badge { position: absolute; top: -1px; right: 1.5rem; background: var(--blue); color: white; font-size: 0.65rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.3rem 0.9rem; border-radius: 0 0 8px 8px; }
        .price-name { font-family: 'Playfair Display', serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 0.3rem; }
        .price-amount { font-family: 'Playfair Display', serif; font-size: 3.5rem; font-weight: 900; color: var(--blue-dark); line-height: 1; margin: 0.8rem 0; }
        .price-card.featured .price-amount { color: white; }
        .price-amount sup { font-size: 1.4rem; vertical-align: super; }
        .price-includes { font-size: 0.78rem; color: var(--text-light); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.5rem; }
        .price-card.featured .price-includes { color: rgba(255,255,255,0.5); }
        .price-features { list-style: none; }
        .price-features li { font-size: 0.9rem; font-weight: 300; color: var(--text-mid); padding: 0.5rem 0; border-bottom: 1px solid var(--snow3); display: flex; align-items: center; gap: 0.6rem; }
        .price-card.featured .price-features li { color: rgba(255,255,255,0.8); border-bottom-color: rgba(255,255,255,0.12); }
        .price-features li::before { content: '❄'; color: var(--blue); font-size: 0.65rem; }
        .price-card.featured .price-features li::before { color: rgba(255,255,255,0.45); }
        .cancel-note { margin-top: 2rem; padding: 1.2rem 1.5rem; border: 1px solid var(--snow3); border-left: 3px solid var(--blue); background: var(--snow2); border-radius: 0 12px 12px 0; font-size: 0.85rem; color: var(--text-mid); line-height: 1.6; }
        .cancel-note strong { color: var(--blue-dark); }

        .team-section { background: var(--snow2); }
        .team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
        .team-card { background: white; border: 1px solid var(--snow3); border-radius: 20px; padding: 2rem 1.8rem; text-align: center; transition: transform 0.3s, box-shadow 0.3s; box-shadow: 0 4px 16px rgba(74,158,202,0.06); }
        .team-card:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(74,158,202,0.12); }
        .team-avatar { width: 110px; height: 110px; border-radius: 50%; background: var(--snow3); overflow: hidden; margin: 0 auto 1.2rem; border: 3px solid var(--ice); box-shadow: 0 6px 20px rgba(74,158,202,0.18); }
        .team-name { font-family: 'Playfair Display', serif; font-size: 1.1rem; font-weight: 700; color: var(--text); margin-bottom: 0.2rem; }
        .team-role { font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); font-weight: 500; }

        footer { background: var(--text); padding: 2.5rem 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
        .footer-logo { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 900; color: white; font-style: italic; }
        .footer-logo span { color: var(--ice); }
        .footer-text { font-size: 0.8rem; color: rgba(255,255,255,0.3); font-weight: 300; }

        /* CHAT TRIGGER WRAPPER */
        .chat-wrapper {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 200;
          display: flex; flex-direction: column; align-items: flex-end; gap: 0.6rem;
        }



        /* SPEECH BUBBLE */
        .chat-bubble {
          background: white;
          color: var(--blue-dark);
          font-family: 'DM Sans', sans-serif;
          font-weight: 600; font-size: 0.82rem;
          padding: 0.5rem 1rem;
          border-radius: 20px 20px 4px 20px;
          box-shadow: 0 4px 16px rgba(34,113,163,0.18);
          border: 1.5px solid var(--snow3);
          white-space: nowrap;
          animation: bubblePop 0.4s cubic-bezier(0.34,1.56,0.64,1), bubbleFloat 3s ease-in-out 0.4s infinite;
          cursor: pointer;
        }
        @keyframes bubblePop {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        /* MASCOT BUTTON */
        .chat-trigger {
          width: 80px; height: 80px;
          background: transparent; border: none; cursor: pointer;
          border-radius: 50%; padding: 0;
          box-shadow: 0 6px 24px rgba(34,113,163,0.35);
          animation: pulse 2.5s infinite;
          transition: transform 0.2s;
        }
        .chat-trigger img { width: 80px; height: 80px; object-fit: cover; object-position: center 15%; border-radius: 50%; display: block; pointer-events: none; }
        .chat-trigger:hover { transform: scale(1.1); animation: none; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(34,113,163,0.4); } 70% { box-shadow: 0 0 0 14px rgba(34,113,163,0); } 100% { box-shadow: 0 0 0 0 rgba(34,113,163,0); } }

        .chat-modal { position: fixed; bottom: 7rem; right: 2rem; z-index: 200; width: 340px; background: white; border: 1px solid var(--snow3); border-radius: 20px; box-shadow: 0 20px 60px rgba(74,158,202,0.2); overflow: hidden; }
        .chat-header { background: var(--blue-dark); padding: 1rem 1.2rem; display: flex; justify-content: space-between; align-items: center; }
        .chat-header-left { display: flex; align-items: center; gap: 0.7rem; }
        .chat-header-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; object-position: center 15%; border: 2px solid rgba(255,255,255,0.3); pointer-events: none; }
        .chat-header-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: white; }
        .chat-header-sub { font-size: 0.72rem; color: rgba(255,255,255,0.55); font-weight: 300; margin-top: 0.1rem; }
        .chat-close { background: none; border: none; color: rgba(255,255,255,0.6); cursor: pointer; font-size: 1.1rem; }
        .chat-close:hover { color: white; }
        .chat-messages { height: 220px; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.8rem; background: var(--snow2); }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb { background: var(--snow3); border-radius: 4px; }
        .msg { max-width: 85%; font-size: 0.88rem; line-height: 1.5; padding: 0.7rem 1rem; border-radius: 14px; }
        .msg.assistant { background: white; border: 1px solid var(--snow3); color: var(--text); align-self: flex-start; border-bottom-left-radius: 4px; }
        .msg.user { background: var(--blue-dark); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
        .chat-input-row { display: flex; border-top: 1px solid var(--snow3); }
        .chat-input { flex: 1; padding: 0.9rem 1rem; background: white; border: none; color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.88rem; outline: none; }
        .chat-input::placeholder { color: var(--text-light); }
        .chat-send { background: var(--blue-dark); border: none; cursor: pointer; color: white; font-weight: 500; font-size: 0.85rem; padding: 0 1.2rem; transition: background 0.2s; }
        .chat-send:hover { background: var(--blue); }

        @media (max-width: 768px) {
          .hero-circle-btn { display: none; }
          .mobile-book-btn { display: inline-block; }
          nav { padding: 1rem 1.2rem; top: 2rem; }
          section { padding: 4rem 1.2rem; }
          footer { padding: 2rem 1.2rem; flex-direction: column; text-align: center; }
          .chat-modal { right: 0.8rem; left: 0.8rem; width: auto; }
          .chat-wrapper { right: 1rem; bottom: 1rem; }
        }
      `}</style>

      <Snowflakes />
      <div className="demo-banner">{tx.demo}</div>
      {showBooked && <div className="booking-banner">{tx.booked}</div>}

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <div className="nav-logo">Ski<span>easy</span>-P<span>easy</span></div>
          <button className="lang-btn" onClick={() => switchLang(lang === 'en' ? 'hu' : 'en')}>{tx.langBtn}</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-circle hero-circle-1" />
        <div className="hero-circle hero-circle-2" />
        <div className="hero-content">
          <div className="hero-eyebrow">{tx.eyebrow}</div>
          <h1 className="hero-title">
            {tx.title1}<br />
            <em>{tx.title2}</em><br />
            {tx.title3}
          </h1>
          <p className="hero-sub">{tx.sub}</p>
          <a href="/book" className="mobile-book-btn">{tx.bookBtn}</a>
        </div>
        <a href="/book" className="hero-circle-btn" title={tx.bookBtn}>
          <span className="hero-circle-btn-icon">🏂</span>
          <span className="hero-circle-btn-label">{tx.bookBtn}</span>
        </a>
      </section>

      <section id="how" className="how-section">
        <div className="section-eyebrow">{tx.howLabel}</div>
        <h2 className="section-title">{tx.howTitle} <em>{tx.howTitleEm}</em></h2>
        <div className="how-grid">
          {[{ n: '01', icon: '📲' },{ n: '02', icon: '🚚' },{ n: '03', icon: '🔧' },{ n: '04', icon: '🏠' }].map((s, i) => (
            <div className="how-step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <span className="step-icon">{s.icon}</span>
              <div className="step-title">{tx.steps[i].title}</div>
              <p className="step-desc">{tx.steps[i].desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="section-eyebrow">{tx.pricingLabel}</div>
        <h2 className="section-title">{tx.pricingTitle} <em>{tx.pricingTitleEm}</em></h2>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-name">{tx.waxName}</div>
            <div className="price-includes">{tx.fee}</div>
            <ul className="price-features">{tx.waxF.map((f,i) => <li key={i}>{f}</li>)}</ul>
          </div>
          <div className="price-card featured">
            <div className="price-badge">{tx.popular}</div>
            <div className="price-name">{tx.fullName}</div>
            <div className="price-includes">{tx.fee}</div>
            <ul className="price-features">{tx.fullF.map((f,i) => <li key={i}>{f}</li>)}</ul>
          </div>
          <div className="price-card">
            <div className="price-name">{tx.edgeName}</div>
            <div className="price-includes">{tx.fee}</div>
            <ul className="price-features">{tx.edgeF.map((f,i) => <li key={i}>{f}</li>)}</ul>
          </div>
        </div>
        <div className="cancel-note">{tx.cancelNote}</div>
      </section>

      <section id="team" className="team-section">
        <div className="section-eyebrow">{tx.teamLabel}</div>
        <h2 className="section-title">{tx.teamTitle} <em>{tx.teamTitleEm}</em></h2>
        <div className="team-grid">
          {[
            { img: '/Julia.png',  name: 'Julia Pummer',  role: lang === 'en' ? 'Owner' : 'Tulajdonos',                pos: 'center top' },
            { img: '/Tamara.png', name: 'Tamara Szabó',  role: 'CEO',                                                  pos: 'center 15%' },
            { img: '/Farouk.png', name: 'Farouk Aziz',   role: lang === 'en' ? 'Product Manager' : 'Termékmenedzser', pos: 'center top' },
          ].map((m, i) => (
            <div className="team-card" key={i}>
              <div className="team-avatar">
                <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: m.pos, borderRadius: '50%' }} />
              </div>
              <div className="team-name">{m.name}</div>
              <div className="team-role">{m.role}</div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div>
          <div className="footer-logo">Ski<span>easy</span>-P<span>easy</span></div>
          <div className="footer-text" style={{ marginTop: '0.3rem' }}>{tx.footerSub}</div>
        </div>
        <div className="footer-text">{tx.footer}</div>
      </footer>

      {/* CHAT WRAPPER: bubble + mascot button */}
      <div className="chat-wrapper">

        {showBubble && !chatOpen && (
          <div className="chat-bubble" onClick={handleOpenChat}>{tx.bubble}</div>
        )}
        <button className="chat-trigger" onClick={handleOpenChat} title="Chat with Skieasy">
          <img src="/mascot.png" alt="Skieasy" />
        </button>
      </div>

      {chatOpen && <ChatModal onClose={() => { setChatOpen(false); setShowBubble(true); }} tx={tx} />}
    </>
  );
}

function Snowflakes() {
  const flakes = [
    { id:0,  left:'5%',  size:'0.9rem', dur:'10s', delay:'0s',   sym:'❄' },
    { id:1,  left:'12%', size:'0.7rem', dur:'14s', delay:'2s',   sym:'❅' },
    { id:2,  left:'20%', size:'1.1rem', dur:'9s',  delay:'5s',   sym:'❆' },
    { id:3,  left:'28%', size:'0.8rem', dur:'12s', delay:'1s',   sym:'❄' },
    { id:4,  left:'35%', size:'1.0rem', dur:'11s', delay:'7s',   sym:'❅' },
    { id:5,  left:'42%', size:'0.7rem', dur:'15s', delay:'3s',   sym:'❆' },
    { id:6,  left:'50%', size:'0.9rem', dur:'10s', delay:'6s',   sym:'❄' },
    { id:7,  left:'57%', size:'1.1rem', dur:'13s', delay:'0.5s', sym:'❅' },
    { id:8,  left:'63%', size:'0.75rem',dur:'9s',  delay:'4s',   sym:'❆' },
    { id:9,  left:'70%', size:'1.0rem', dur:'11s', delay:'8s',   sym:'❄' },
    { id:10, left:'77%', size:'0.8rem', dur:'14s', delay:'2.5s', sym:'❅' },
    { id:11, left:'83%', size:'0.9rem', dur:'10s', delay:'6.5s', sym:'❆' },
    { id:12, left:'89%', size:'0.7rem', dur:'12s', delay:'1.5s', sym:'❄' },
    { id:13, left:'94%', size:'1.0rem', dur:'9s',  delay:'4.5s', sym:'❅' },
  ];
  return (
    <div className="snowflakes">
      {flakes.map(f => (
        <div key={f.id} className="flake" style={{ left: f.left, fontSize: f.size, animationDuration: f.dur, animationDelay: f.delay }}>
          {f.sym}
        </div>
      ))}
    </div>
  );
}

function ChatModal({ onClose, tx }: { onClose: () => void; tx: typeof t.en }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: tx.chatWelcome }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next); setInput(''); setLoading(true);
    try {
      const res = await fetch('/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="chat-modal">
      <div className="chat-header">
        <div className="chat-header-left">
          <img src="/mascot.png" alt="Skieasy" className="chat-header-avatar" />
          <div>
            <div className="chat-header-title">{tx.chatTitle}</div>
            <div className="chat-header-sub">{tx.chatSub}</div>
          </div>
        </div>
        <button className="chat-close" onClick={onClose}>✕</button>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => <div key={i} className={`msg ${m.role}`}>{m.content}</div>)}
        {loading && <div className="msg assistant" style={{ color: 'var(--text-light)' }}>Typing…</div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={tx.chatPlaceholder} />
        <button className="chat-send" onClick={send}>{tx.chatSend}</button>
      </div>
    </div>
  );
}