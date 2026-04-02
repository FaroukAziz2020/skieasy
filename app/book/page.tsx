'use client';
import { useState, useEffect } from 'react';

const t = {
  en: {
    back: '← Back to home',
    eyebrow: 'Schedule a service',
    title: 'Book a', titleEm: 'Pickup',
    sub: "Fill in your details below. We'll confirm your booking via phone or email and arrange a pickup window.",
    name: 'Full Name', nameP: 'János Kovács',
    phone: 'Phone Number', phoneP: '+36 30 123 4567',
    address: 'Pickup Address', addressP: 'Budapest, Váci út 1, 1133',
    equipment: 'Equipment', equipP: 'Select equipment type',
    ski: 'Ski', snowboard: 'Snowboard',
    service: 'Service Type', serviceP: 'Select a service',
    full: 'Full Service (wax + edges) — €35',
    wax: 'Wax Only — €15',
    edge: 'Edge Tuning — €20',
    submit: 'Confirm Booking ❄',
    expectTitle: 'What to expect',
    expect: ['We confirm within a few hours', 'Pickup within 1–2 business days', 'Service takes 24–48 hours', 'Equipment returned to your door'],
    feeTitle: 'Pickup fee',
    feeDesc: "A small pickup & delivery fee is added to all orders. We'll confirm the total when we reach out to schedule your time window.",
    cancel: 'Cancellation: Late cancellation (<24h) or no-show may incur up to 50% of the service fee.',
    demo: '⚠️ DEMO WEBSITE — NOT FOR SERVICE',
    langBtn: '🇭🇺 HU',
  },
  hu: {
    back: '← Vissza a főoldalra',
    eyebrow: 'Szerviz foglalása',
    title: 'Foglalj', titleEm: 'Felvételt',
    sub: 'Töltsd ki az adataidat alább. Telefonon vagy e-mailben megerősítjük a foglalásodat és egyeztetjük a felvételi időablakot.',
    name: 'Teljes név', nameP: 'Kovács János',
    phone: 'Telefonszám', phoneP: '+36 30 123 4567',
    address: 'Felvételi cím', addressP: 'Budapest, Váci út 1, 1133',
    equipment: 'Felszerelés', equipP: 'Válassz felszerelést',
    ski: 'Síléc', snowboard: 'Snowboard',
    service: 'Szolgáltatás típusa', serviceP: 'Válassz szolgáltatást',
    full: 'Teljes szerviz (wax + él) — €35',
    wax: 'Csak wax — €15',
    edge: 'Élezés — €20',
    submit: 'Foglalás megerősítése ❄',
    expectTitle: 'Mire számíthatsz',
    expect: ['Néhány órán belül megerősítjük', 'Felvétel 1–2 munkanapon belül', 'Szerviz 24–48 órát vesz igénybe', 'Felszerelés visszaszállítva az ajtódhoz'],
    feeTitle: 'Felvételi díj',
    feeDesc: 'Minden rendeléshez kis felvételi és szállítási díj adódik. A végösszeget egyeztetjük, amikor felhívunk az időpont egyeztetéséhez.',
    cancel: 'Lemondás: Késői lemondás (<24 óra) vagy meg nem jelenés esetén a díj 50%-a felszámítható.',
    demo: '⚠️ DEMO WEBOLDAL — NEM VALÓDI SZOLGÁLTATÁS',
    langBtn: '🇬🇧 EN',
  }
};

export default function Book() {
  const [lang, setLang] = useState<'en'|'hu'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('skieasy-lang');
    if (saved === 'hu') setLang('hu');
  }, []);

  const switchLang = (l: 'en'|'hu') => {
    setLang(l);
    localStorage.setItem('skieasy-lang', l);
  };
  const tx = t[lang];

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
        body { font-family: 'DM Sans', sans-serif; background: var(--snow); color: var(--text); }

        .demo-banner {
          position: fixed; top: 0; left: 0; right: 0; z-index: 999;
          background: #f59e0b; color: #1a1a1a;
          text-align: center; padding: 0.55rem 1rem;
          font-size: 0.85rem; font-weight: 600; letter-spacing: 0.04em;
          animation: flash 2s ease-in-out infinite;
        }
        @keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

        .book-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #ffffff 0%, #eaf5ff 45%, #d4ecfa 100%);
          padding: 6rem 1.5rem 5rem;
          display: flex; flex-direction: column; align-items: center;
        }
        .top-bar { align-self: flex-start; max-width: 900px; width: 100%; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; }
        .back-link { color: var(--text-light); font-size: 0.85rem; text-decoration: none; transition: color 0.2s; }
        .back-link:hover { color: var(--blue-dark); }
        .lang-btn { background: var(--snow3); border: 1.5px solid var(--ice); color: var(--blue-dark); font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.08em; padding: 0.35rem 0.8rem; border-radius: 20px; cursor: pointer; transition: all 0.2s; }
        .lang-btn:hover { background: var(--blue-dark); color: white; border-color: var(--blue-dark); }

        .book-header { max-width: 900px; width: 100%; margin-bottom: 3rem; }
        .book-eyebrow { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--blue); font-weight: 500; margin-bottom: 0.8rem; display: flex; align-items: center; gap: 0.6rem; }
        .book-eyebrow::before { content: '❄'; }
        .book-title { font-family: 'Playfair Display', serif; font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 900; line-height: 1.05; color: var(--blue-dark); }
        .book-title em { color: var(--blue); font-style: italic; }
        .book-sub { margin-top: 0.8rem; font-weight: 300; font-size: 1rem; color: var(--text-mid); line-height: 1.7; max-width: 480px; }

        .book-grid { display: grid; grid-template-columns: 1fr 300px; gap: 2.5rem; max-width: 900px; width: 100%; align-items: start; }
        @media (max-width: 768px) { .book-grid { grid-template-columns: 1fr; } .book-page { padding: 5rem 1.2rem 4rem; } }

        .form-card { background: white; border: 1px solid var(--snow3); border-radius: 20px; padding: 2.5rem; box-shadow: 0 8px 30px rgba(74,158,202,0.08); }
        .form-group { margin-bottom: 1.4rem; }
        label { display: block; font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue-dark); font-weight: 500; margin-bottom: 0.5rem; }
        input[type="text"], input[type="tel"], select { width: 100%; padding: 0.85rem 1rem; background: var(--snow2); border: 1.5px solid var(--snow3); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem; outline: none; border-radius: 10px; transition: border-color 0.2s, background 0.2s; -webkit-appearance: none; appearance: none; }
        input[type="text"]:focus, input[type="tel"]:focus, select:focus { border-color: var(--blue); background: white; }
        input::placeholder { color: var(--text-light); }
        select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a9eca' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-color: var(--snow2); }
        select option { background: white; color: var(--text); }
        .submit-btn { width: 100%; padding: 1rem; background: var(--blue-dark); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 1rem; color: white; border-radius: 50px; transition: background 0.2s, transform 0.2s; margin-top: 0.5rem; box-shadow: 0 6px 20px rgba(34,113,163,0.3); }
        .submit-btn:hover { background: var(--blue); transform: translateY(-1px); }

        .sidebar { display: flex; flex-direction: column; gap: 1.2rem; }
        .info-card { background: white; border: 1px solid var(--snow3); border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(74,158,202,0.06); }
        .info-card-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--blue-dark); margin-bottom: 0.8rem; }
        .info-card p { font-size: 0.85rem; font-weight: 300; color: var(--text-mid); line-height: 1.65; }
        .info-list { list-style: none; }
        .info-list li { font-size: 0.85rem; font-weight: 300; color: var(--text-mid); padding: 0.45rem 0; border-bottom: 1px solid var(--snow3); display: flex; align-items: center; gap: 0.6rem; }
        .info-list li:last-child { border-bottom: none; }
        .info-list li::before { content: '❄'; color: var(--blue); font-size: 0.65rem; }
        .cancel-note { padding: 1rem 1.2rem; border: 1px solid var(--snow3); border-left: 3px solid var(--blue); background: var(--snow2); border-radius: 0 12px 12px 0; font-size: 0.8rem; color: var(--text-mid); line-height: 1.6; }
        .cancel-note strong { color: var(--blue-dark); }
      `}</style>

      <div className="demo-banner">{tx.demo}</div>

      <div className="book-page">
        <div className="top-bar">
          <a href="/" className="back-link">{tx.back}</a>
          <button className="lang-btn" onClick={() => switchLang(lang === 'en' ? 'hu' : 'en')}>{tx.langBtn}</button>
        </div>

        <div className="book-header">
          <div className="book-eyebrow">{tx.eyebrow}</div>
          <h1 className="book-title">{tx.title} <em>{tx.titleEm}</em></h1>
          <p className="book-sub">{tx.sub}</p>
        </div>

        <div className="book-grid">
          <iframe name="hidden_iframe" style={{ display: 'none' }} />
          <form
            className="form-card"
            action="https://docs.google.com/forms/d/e/1FAIpQLSc7WngV_SrdYrdFvW0T4Q9uaA11GyrLzC8smITljRm6P52sTQ/formResponse"
            method="POST"
            target="hidden_iframe"
            onSubmit={() => setTimeout(() => window.location.href = '/?booked=1', 500)}
          >
            <div className="form-group">
              <label htmlFor="name">{tx.name} *</label>
              <input type="text" id="name" name="entry.60845147" placeholder={tx.nameP} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{tx.phone} *</label>
              <input type="tel" id="phone" name="entry.996376040" placeholder={tx.phoneP} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">{tx.address} *</label>
              <input type="text" id="address" name="entry.265692932" placeholder={tx.addressP} required />
            </div>
            <div className="form-group">
              <label htmlFor="equipment">{tx.equipment} *</label>
              <select id="equipment" name="entry.832485945" required>
                <option value="">{tx.equipP}</option>
                <option value="Ski">{tx.ski}</option>
                <option value="Snowboard">{tx.snowboard}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="service">{tx.service} *</label>
              <select id="service" name="entry.1172623689" required>
                <option value="">{tx.serviceP}</option>
                <option value="Full Service (wax + edges)">{tx.full}</option>
                <option value="Wax Only">{tx.wax}</option>
                <option value="Edge Tuning">{tx.edge}</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">{tx.submit}</button>
          </form>

          <div className="sidebar">
            <div className="info-card">
              <div className="info-card-title">{tx.expectTitle}</div>
              <ul className="info-list">
                {tx.expect.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
            <div className="info-card">
              <div className="info-card-title">{tx.feeTitle}</div>
              <p>{tx.feeDesc}</p>
            </div>
            <div className="cancel-note">
              <strong>{lang === 'en' ? 'Cancellation:' : 'Lemondás:'}</strong> {tx.cancel.replace(/^[^:]+: /, '')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}