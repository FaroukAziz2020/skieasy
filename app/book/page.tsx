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
    equipLabel: 'Equipment & Quantity',
    skiLabel: 'Ski (adult)', skiChildLabel: "Children's Ski / Snowblade (≤130cm)", snowboardLabel: 'Snowboard',
    service: 'Service Type', serviceP: 'Select a service',
    smallService: 'Small Service (edge sharpening + waxing)',
    fullService: 'Full Service (small service + base restoration)',
    pickupShop: 'Pickup From Shop Only — 2 400 HUF',
    returnShop: 'Deliver To Shop Only — 2 400 HUF',
    shopGroup: '— Shop Services —',
    mainGroup: '— Home Pickup —',
    submit: 'Confirm Booking ❄',
    discountLabel: 'Multi-equipment discount',
    discount2: '2 pairs → 5% discount',
    discount3: '3+ pairs → 10% discount',
    expectTitle: 'What to expect',
    expect: ['We confirm within a few hours', 'Pickup within 1–2 business days', 'Service takes 24–48 hours', 'Equipment returned to your door'],
    feeTitle: 'Pricing (HUF)',
    cancel: 'Cancellation: Late cancellation (<24h) or no-show may incur up to 50% of the service fee.',
    demo: '⚠️ DEMO WEBSITE — NOT FOR SERVICE',
    langBtn: '🇭🇺 HU',
    pairsLabel: 'pairs',
  },
  hu: {
    back: '← Vissza a főoldalra',
    eyebrow: 'Szerviz foglalása',
    title: 'Foglalj', titleEm: 'Felvételt',
    sub: 'Töltsd ki az adataidat alább. Telefonon vagy e-mailben megerősítjük a foglalásodat és egyeztetjük a felvételi időablakot.',
    name: 'Teljes név', nameP: 'Kovács János',
    phone: 'Telefonszám', phoneP: '+36 30 123 4567',
    address: 'Felvételi cím', addressP: 'Budapest, Váci út 1, 1133',
    equipLabel: 'Felszerelés és mennyiség',
    skiLabel: 'Síléc (felnőtt)', skiChildLabel: 'Gyermek síléc / Snowblade (≤130cm)', snowboardLabel: 'Snowboard',
    service: 'Szolgáltatás típusa', serviceP: 'Válassz szolgáltatást',
    smallService: 'Kis szerviz (élezés + waxolás)',
    fullService: 'Teljes szerviz (kis szerviz + talpfelújítás)',
    pickupShop: 'Csak felvétel a boltból — 2 400 HUF',
    returnShop: 'Csak visszaszállítás a boltba — 2 400 HUF',
    shopGroup: '— Bolti Szolgáltatások —',
    mainGroup: '— Háztól házig —',
    submit: 'Foglalás megerősítése ❄',
    discountLabel: 'Több felszerelés kedvezmény',
    discount2: '2 pár → 5% kedvezmény',
    discount3: '3+ pár → 10% kedvezmény',
    expectTitle: 'Mire számíthatsz',
    expect: ['Néhány órán belül megerősítjük', 'Felvétel 1–2 munkanapon belül', 'Szerviz 24–48 órát vesz igénybe', 'Felszerelés visszaszállítva az ajtódhoz'],
    feeTitle: 'Árak (HUF)',
    cancel: 'Lemondás: Késői lemondás (<24 óra) vagy meg nem jelenés esetén a díj 50%-a felszámítható.',
    demo: '⚠️ DEMO WEBOLDAL — NEM VALÓDI SZOLGÁLTATÁS',
    langBtn: '🇬🇧 EN',
    pairsLabel: 'pár',
  }
};

// Prices per equipment type per service
const PRICES = {
  small: { ski: 12500, skiChild: 10000, snowboard: 14000 },
  full:  { ski: 14000, skiChild: 12000, snowboard: 15000 },
};
const DELIVERY = 4000;

export default function Book() {
  const [lang, setLang] = useState<'en'|'hu'>('en');
  const [selectedService, setSelectedService] = useState('');
  const [skiCount, setSkiCount] = useState(0);
  const [skiChildCount, setSkiChildCount] = useState(0);
  const [snowboardCount, setSnowboardCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('skieasy-lang');
    if (saved === 'hu') setLang('hu');
  }, []);

  const switchLang = (l: 'en'|'hu') => {
    setLang(l);
    localStorage.setItem('skieasy-lang', l);
  };

  const tx = t[lang];

  const totalPairs = skiCount + skiChildCount + snowboardCount;
  const discountPct = totalPairs >= 3 ? 10 : totalPairs === 2 ? 5 : 0;

  const calcTotal = () => {
    if (!selectedService || totalPairs === 0) return null;
    const p = selectedService === 'Small Service' ? PRICES.small : PRICES.full;
    const base = skiCount * p.ski + skiChildCount * p.skiChild + snowboardCount * p.snowboard;
    const discounted = Math.round(base * (1 - discountPct / 100));
    return { base, discounted, delivery: DELIVERY, total: discounted + DELIVERY };
  };

  const totals = calcTotal();

  const equipSummary = [
    skiCount > 0 ? `${skiCount}x Ski` : '',
    skiChildCount > 0 ? `${skiChildCount}x Child Ski` : '',
    snowboardCount > 0 ? `${snowboardCount}x Snowboard` : '',
  ].filter(Boolean).join(', ');

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

        .demo-banner { position: fixed; top: 0; left: 0; right: 0; z-index: 999; background: #f59e0b; color: #1a1a1a; text-align: center; padding: 0.55rem 1rem; font-size: 0.85rem; font-weight: 600; letter-spacing: 0.04em; animation: flash 2s ease-in-out infinite; }
        @keyframes flash { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }

        .book-page { min-height: 100vh; background: linear-gradient(160deg, #ffffff 0%, #eaf5ff 45%, #d4ecfa 100%); padding: 6rem 1.5rem 5rem; display: flex; flex-direction: column; align-items: center; }
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
        input[type="text"], input[type="tel"], input[type="hidden"], select { width: 100%; padding: 0.85rem 1rem; background: var(--snow2); border: 1.5px solid var(--snow3); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem; outline: none; border-radius: 10px; transition: border-color 0.2s, background 0.2s; -webkit-appearance: none; appearance: none; }
        input[type="text"]:focus, input[type="tel"]:focus, select:focus { border-color: var(--blue); background: white; }
        input::placeholder { color: var(--text-light); }
        select { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234a9eca' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; background-color: var(--snow2); }
        select option { background: white; color: var(--text); }

        /* COUNTER ROW */
        .counter-group { margin-bottom: 1rem; }
        .counter-row { display: flex; align-items: center; justify-content: space-between; padding: 0.7rem 1rem; background: var(--snow2); border: 1.5px solid var(--snow3); border-radius: 10px; margin-bottom: 0.5rem; }
        .counter-label { font-size: 0.9rem; color: var(--text); font-weight: 400; }
        .counter-label small { display: block; font-size: 0.72rem; color: var(--text-light); font-weight: 300; }
        .counter-controls { display: flex; align-items: center; gap: 0.6rem; }
        .counter-btn { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid var(--blue); background: white; color: var(--blue-dark); font-size: 1.1rem; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; line-height: 1; }
        .counter-btn:hover { background: var(--blue-dark); color: white; border-color: var(--blue-dark); }
        .counter-val { font-size: 1rem; font-weight: 600; color: var(--blue-dark); min-width: 20px; text-align: center; }

        /* DISCOUNT BADGE */
        .discount-badge { margin-top: 0.6rem; padding: 0.5rem 0.9rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; text-align: center; }
        .discount-badge.active { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .discount-badge.none { background: var(--snow2); color: var(--text-light); border: 1px solid var(--snow3); font-weight: 400; font-size: 0.78rem; }

        /* TOTAL BOX */
        .total-box { margin-top: 1rem; padding: 1rem 1.2rem; background: var(--snow2); border: 1.5px solid var(--blue); border-radius: 12px; }
        .total-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-mid); padding: 0.25rem 0; }
        .total-row.final { font-size: 1rem; font-weight: 700; color: var(--blue-dark); border-top: 1px solid var(--snow3); margin-top: 0.4rem; padding-top: 0.5rem; }
        .total-row .strike { text-decoration: line-through; color: var(--text-light); font-size: 0.8rem; }

        .submit-btn { width: 100%; padding: 1rem; background: var(--blue-dark); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 1rem; color: white; border-radius: 50px; transition: background 0.2s, transform 0.2s; margin-top: 1rem; box-shadow: 0 6px 20px rgba(34,113,163,0.3); }
        .submit-btn:hover { background: var(--blue); transform: translateY(-1px); }
        .submit-btn:disabled { background: var(--text-light); cursor: not-allowed; transform: none; box-shadow: none; }

        .sidebar { display: flex; flex-direction: column; gap: 1.2rem; }
        .info-card { background: white; border: 1px solid var(--snow3); border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(74,158,202,0.06); overflow: hidden; word-break: break-word; }
        .info-card-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--blue-dark); margin-bottom: 0.8rem; }
        .info-card p { font-size: 0.82rem; font-weight: 300; color: var(--text-mid); line-height: 1.6; margin-bottom: 0.8rem; }
        .info-list { list-style: none; }
        .info-list li { font-size: 0.85rem; font-weight: 300; color: var(--text-mid); padding: 0.45rem 0; border-bottom: 1px solid var(--snow3); display: flex; align-items: center; gap: 0.6rem; }
        .info-list li:last-child { border-bottom: none; }
        .info-list li::before { content: '❄'; color: var(--blue); font-size: 0.65rem; }
        .cancel-note { padding: 1rem 1.2rem; border: 1px solid var(--snow3); border-left: 3px solid var(--blue); background: var(--snow2); border-radius: 0 12px 12px 0; font-size: 0.8rem; color: var(--text-mid); line-height: 1.6; }
        .cancel-note strong { color: var(--blue-dark); }

        .price-list { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .price-row { background: var(--snow2); border-radius: 10px; padding: 0.7rem 0.9rem; }
        .price-row-name { font-size: 0.78rem; font-weight: 600; color: var(--text); margin-bottom: 0.35rem; }
        .price-row-cols { display: flex; justify-content: space-between; gap: 0.3rem; }
        .price-col { text-align: center; flex: 1; }
        .price-col-label { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-light); margin-bottom: 0.15rem; }
        .price-col-val { font-size: 0.82rem; font-weight: 600; color: var(--blue-dark); white-space: nowrap; }
        .price-row-single { display: flex; justify-content: space-between; align-items: center; }
        .price-row-single span:last-child { font-size: 0.85rem; font-weight: 700; color: var(--blue-dark); }
        .discount-info { margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid var(--snow3); font-size: 0.78rem; color: var(--text-mid); font-weight: 300; line-height: 1.7; }
        .discount-info span { color: #166534; font-weight: 700; }
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
            {/* Personal details */}
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

            {/* Service type */}
            <div className="form-group">
              <label htmlFor="service">{tx.service} *</label>
              <select id="service" name="entry.1172623689" required onChange={e => setSelectedService(e.target.value)}>
                <option value="">{tx.serviceP}</option>
                <optgroup label={tx.mainGroup}>
                <option value="Small Service">{tx.smallService}</option>
                <option value="Full Service">{tx.fullService}</option>
                </optgroup>
                <optgroup label={tx.shopGroup}>
                  <option value="Pickup From Shop Only">{tx.pickupShop}</option>
                  <option value="Deliver To Shop Only">{tx.returnShop}</option>
                </optgroup>
              </select>
            </div>

            {/* Equipment counters */}
            <div className="form-group">
              <label>{tx.equipLabel} *</label>
              <div className="counter-group">
                {/* Ski adult */}
                <div className="counter-row">
                  <div className="counter-label">{tx.skiLabel}</div>
                  <div className="counter-controls">
                    <button type="button" className="counter-btn" onClick={() => setSkiCount(Math.max(0, skiCount - 1))}>−</button>
                    <span className="counter-val">{skiCount}</span>
                    <button type="button" className="counter-btn" onClick={() => setSkiCount(skiCount + 1)}>+</button>
                  </div>
                </div>
                {/* Children ski */}
                <div className="counter-row">
                  <div className="counter-label">
                    {tx.skiChildLabel}
                    <small>≤ 130 cm</small>
                  </div>
                  <div className="counter-controls">
                    <button type="button" className="counter-btn" onClick={() => setSkiChildCount(Math.max(0, skiChildCount - 1))}>−</button>
                    <span className="counter-val">{skiChildCount}</span>
                    <button type="button" className="counter-btn" onClick={() => setSkiChildCount(skiChildCount + 1)}>+</button>
                  </div>
                </div>
                {/* Snowboard */}
                <div className="counter-row">
                  <div className="counter-label">{tx.snowboardLabel}</div>
                  <div className="counter-controls">
                    <button type="button" className="counter-btn" onClick={() => setSnowboardCount(Math.max(0, snowboardCount - 1))}>−</button>
                    <span className="counter-val">{snowboardCount}</span>
                    <button type="button" className="counter-btn" onClick={() => setSnowboardCount(snowboardCount + 1)}>+</button>
                  </div>
                </div>
              </div>

              {/* Discount badge */}
              {totalPairs >= 2
                ? <div className="discount-badge active">🎉 {discountPct}% {lang === 'en' ? 'discount applied!' : 'kedvezmény érvényes!'}</div>
                : <div className="discount-badge none">{tx.discount2} · {tx.discount3}</div>
              }
            </div>

            {/* Live total */}
            {totals && (
              <div className="total-box">
                {discountPct > 0 && (
                  <div className="total-row">
                    <span>{lang === 'en' ? 'Service subtotal' : 'Szerviz részösszeg'}</span>
                    <span><span className="strike">{totals.base.toLocaleString()} HUF</span> → {totals.discounted.toLocaleString()} HUF</span>
                  </div>
                )}
                {discountPct === 0 && (
                  <div className="total-row">
                    <span>{lang === 'en' ? 'Service subtotal' : 'Szerviz részösszeg'}</span>
                    <span>{totals.base.toLocaleString()} HUF</span>
                  </div>
                )}
                <div className="total-row">
                  <span>{lang === 'en' ? 'Pickup & delivery' : 'Felvétel & szállítás'}</span>
                  <span>{totals.delivery.toLocaleString()} HUF</span>
                </div>
                <div className="total-row final">
                  <span>{lang === 'en' ? 'Estimated total' : 'Becsült összeg'}</span>
                  <span>{totals.total.toLocaleString()} HUF</span>
                </div>
              </div>
            )}

            {/* Hidden fields to pass equipment summary to Google Form */}
            <input type="hidden" name="entry.832485945" value={equipSummary} />

            <button
              type="submit"
              className="submit-btn"
              disabled={totalPairs === 0 || !selectedService}
            >
              {tx.submit}
            </button>
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
              <div className="price-list">
                <div className="price-row">
                  <div className="price-row-name">{lang === 'en' ? 'Small Service' : 'Kis Szerviz'}</div>
                  <div className="price-row-cols">
                    <div className="price-col"><div className="price-col-label">{lang === 'en' ? 'Ski' : 'Síléc'}</div><div className="price-col-val">12 500</div></div>
                    <div className="price-col"><div className="price-col-label">{lang === 'en' ? 'Child' : 'Gyermek'}</div><div className="price-col-val">10 000</div></div>
                    <div className="price-col"><div className="price-col-label">Board</div><div className="price-col-val">14 000</div></div>
                  </div>
                </div>
                <div className="price-row">
                  <div className="price-row-name">{lang === 'en' ? 'Full Service' : 'Teljes Szerviz'}</div>
                  <div className="price-row-cols">
                    <div className="price-col"><div className="price-col-label">{lang === 'en' ? 'Ski' : 'Síléc'}</div><div className="price-col-val">14 000</div></div>
                    <div className="price-col"><div className="price-col-label">{lang === 'en' ? 'Child' : 'Gyermek'}</div><div className="price-col-val">12 000</div></div>
                    <div className="price-col"><div className="price-col-label">Board</div><div className="price-col-val">15 000</div></div>
                  </div>
                </div>
                <div className="price-row">
                  <div className="price-row-single">
                    <span className="price-row-name" style={{marginBottom:0}}>{lang === 'en' ? 'Pickup & delivery' : 'Felvétel & szállítás'}</span>
                    <span>4 000 HUF</span>
                  </div>
                </div>
              </div>
              <div className="discount-info" style={{marginBottom:'0.5rem'}}>
                {lang === 'en' ? 'Shop-only services are 60% of standard delivery price.' : 'A bolti szolgáltatások az alap szállítási díj 60%-a.'}
              </div>
              <div className="discount-info">
                <span>5%</span> {lang === 'en' ? 'off for 2 pairs' : 'kedvezmény 2 pártól'} · <span>10%</span> {lang === 'en' ? 'off for 3+' : 'kedvezmény 3+-tól'}
              </div>
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