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
    equipLabel: 'Equipment & Service',
    equipSub: 'Add each item and choose its service',
    addSki: '+ Add Ski (adult)',
    addSkiChild: '+ Add Child Ski / Snowblade (≤130cm)',
    addSnowboard: '+ Add Snowboard',
    small: 'Small (edge sharpening + waxing)', full: 'Full (small service + base restoration)',
    smallFull: 'Small Service', fullFull: 'Full Service',
    remove: 'Remove',
    submit: 'Confirm Booking ❄',
    discount2: '2 pairs → 5% discount',
    discount3: '3+ pairs → 10% discount',
    expectTitle: 'What to expect',
    expect: ['We confirm within a few hours', 'Pickup within 1–2 business days', 'Service takes 24–48 hours', 'Equipment returned to your door'],
    feeTitle: 'Pricing (HUF)',
    cancel: 'Cancellation: Late cancellation (<24h) or no-show may incur up to 50% of the service fee.',
    demo: '⚠️ DEMO WEBSITE — NOT FOR SERVICE',
    langBtn: '🇭🇺 HU',
    estimatedTotal: 'Estimated total',
    serviceSubtotal: 'Service subtotal',
    noItems: 'Add at least one item above',
  },
  hu: {
    back: '← Vissza a főoldalra',
    eyebrow: 'Szerviz foglalása',
    title: 'Foglalj', titleEm: 'Felvételt',
    sub: 'Töltsd ki az adataidat alább. Telefonon vagy e-mailben megerősítjük a foglalásodat és egyeztetjük a felvételi időablakot.',
    name: 'Teljes név', nameP: 'Kovács János',
    phone: 'Telefonszám', phoneP: '+36 30 123 4567',
    address: 'Felvételi cím', addressP: 'Budapest, Váci út 1, 1133',
    equipLabel: 'Felszerelés és szerviz',
    equipSub: 'Adj hozzá minden tételt és válassz szervizet',
    addSki: '+ Síléc hozzáadása (felnőtt)',
    addSkiChild: '+ Gyermek síléc / Snowblade (≤130cm)',
    addSnowboard: '+ Snowboard hozzáadása',
    small: 'Kis (élezés + waxolás)', full: 'Teljes (kis szerviz + talpfelújítás)',
    smallFull: 'Kis szerviz', fullFull: 'Teljes szerviz',
    remove: 'Törlés',
    submit: 'Foglalás megerősítése ❄',
    discount2: '2 pár → 5% kedvezmény',
    discount3: '3+ pár → 10% kedvezmény',
    expectTitle: 'Mire számíthatsz',
    expect: ['Néhány órán belül megerősítjük', 'Felvétel 1–2 munkanapon belül', 'Szerviz 24–48 órát vesz igénybe', 'Felszerelés visszaszállítva az ajtódhoz'],
    feeTitle: 'Árak (HUF)',
    cancel: 'Lemondás: Késői lemondás (<24 óra) vagy meg nem jelenés esetén a díj 50%-a felszámítható.',
    demo: '⚠️ DEMO WEBOLDAL — NEM VALÓDI SZOLGÁLTATÁS',
    langBtn: '🇬🇧 EN',
    estimatedTotal: 'Becsült összeg',
    serviceSubtotal: 'Szerviz részösszeg',
    noItems: 'Adj hozzá legalább egy tételt',
  }
};

const PRICES = {
  small: { ski: 12500, skiChild: 10000, snowboard: 14000 },
  full:  { ski: 14000, skiChild: 12000, snowboard: 15000 },
};

type EquipType = 'ski' | 'skiChild' | 'snowboard';
type ServiceType = 'small' | 'full';
interface Item { id: number; type: EquipType; service: ServiceType; }

let nextId = 1;

export default function Book() {
  const [lang, setLang] = useState<'en'|'hu'>('en');
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('skieasy-lang');
    if (saved === 'hu') setLang('hu');
  }, []);

  const switchLang = (l: 'en'|'hu') => { setLang(l); localStorage.setItem('skieasy-lang', l); };
  const tx = t[lang];

  const addItem = (type: EquipType) => setItems(prev => [...prev, { id: nextId++, type, service: 'small' }]);
  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const setService = (id: number, service: ServiceType) => setItems(prev => prev.map(i => i.id === id ? { ...i, service } : i));

  const totalPairs = items.length;
  const discountPct = totalPairs >= 3 ? 10 : totalPairs === 2 ? 5 : 0;

  const base = items.reduce((sum, item) => {
    const p = PRICES[item.service];
    return sum + (item.type === 'ski' ? p.ski : item.type === 'skiChild' ? p.skiChild : p.snowboard);
  }, 0);
  const discounted = Math.round(base * (1 - discountPct / 100));

  const typeLabel = (type: EquipType) => type === 'ski' ? (lang === 'en' ? 'Ski (adult)' : 'Síléc (felnőtt)') : type === 'skiChild' ? (lang === 'en' ? "Child's Ski / Snowblade" : 'Gyermek síléc / Snowblade') : 'Snowboard';
  const typeEmoji = (type: EquipType) => type === 'snowboard' ? '🏂' : '🎿';
  const unitPrice = (item: Item) => { const p = PRICES[item.service]; return item.type === 'ski' ? p.ski : item.type === 'skiChild' ? p.skiChild : p.snowboard; };

  // Build summary string for Google Form
  const equipSummary = items.length === 0 ? '' : items.map(i => `${typeLabel(i.type)} (${i.service === 'small' ? 'Small Service' : 'Full Service'})`).join(', ');

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
        .label-sub { font-size: 0.75rem; color: var(--text-light); font-weight: 300; text-transform: none; letter-spacing: 0; margin-bottom: 0.8rem; display: block; margin-top: -0.3rem; }
        input[type="text"], input[type="tel"] { width: 100%; padding: 0.85rem 1rem; background: var(--snow2); border: 1.5px solid var(--snow3); color: var(--text); font-family: 'DM Sans', sans-serif; font-size: 0.95rem; outline: none; border-radius: 10px; transition: border-color 0.2s, background 0.2s; }
        input[type="text"]:focus, input[type="tel"]:focus { border-color: var(--blue); background: white; }
        input::placeholder { color: var(--text-light); }

        /* EQUIPMENT ITEMS */
        .equip-list { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 0.8rem; }
        .equip-item { background: var(--snow2); border: 1.5px solid var(--snow3); border-radius: 12px; padding: 0.8rem 1rem; display: flex; align-items: center; gap: 0.8rem; animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .equip-emoji { font-size: 1.3rem; flex-shrink: 0; }
        .equip-info { flex: 1; min-width: 0; }
        .equip-name { font-size: 0.85rem; font-weight: 500; color: var(--text); margin-bottom: 0.35rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .equip-price { font-size: 0.75rem; color: var(--blue-dark); font-weight: 600; }
        .service-toggle { display: flex; flex-direction: column; gap: 0.3rem; flex-shrink: 0; }
        .svc-btn { padding: 0.3rem 0.7rem; border-radius: 20px; font-size: 0.7rem; font-weight: 600; cursor: pointer; border: 1.5px solid var(--snow3); background: white; color: var(--text-mid); transition: all 0.15s; white-space: nowrap; text-align: center; }
        .svc-btn.active { background: var(--blue-dark); color: white; border-color: var(--blue-dark); }
        .remove-btn { background: none; border: none; color: var(--text-light); cursor: pointer; font-size: 1rem; padding: 0.2rem; flex-shrink: 0; transition: color 0.15s; line-height: 1; }
        .remove-btn:hover { color: #ef4444; }

        /* ADD BUTTONS */
        .add-btns { display: flex; flex-direction: column; gap: 0.4rem; }
        .add-btn { background: white; border: 1.5px dashed var(--ice); color: var(--blue); font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500; padding: 0.6rem 1rem; border-radius: 10px; cursor: pointer; text-align: left; transition: all 0.15s; }
        .add-btn:hover { border-color: var(--blue); background: var(--snow2); }

        /* DISCOUNT */
        .discount-badge { margin-top: 0.8rem; padding: 0.5rem 0.9rem; border-radius: 8px; font-size: 0.82rem; font-weight: 600; text-align: center; }
        .discount-badge.active { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .discount-badge.hint { background: var(--snow2); color: var(--text-light); border: 1px solid var(--snow3); font-weight: 300; font-size: 0.75rem; }

        /* TOTAL */
        .total-box { margin-top: 1rem; padding: 1rem 1.2rem; background: var(--snow2); border: 1.5px solid var(--blue); border-radius: 12px; }
        .total-row { display: flex; justify-content: space-between; font-size: 0.85rem; color: var(--text-mid); padding: 0.22rem 0; }
        .total-row.final { font-size: 1rem; font-weight: 700; color: var(--blue-dark); border-top: 1px solid var(--snow3); margin-top: 0.4rem; padding-top: 0.5rem; }
        .strike { text-decoration: line-through; color: var(--text-light); font-size: 0.78rem; margin-right: 0.3rem; }

        .submit-btn { width: 100%; padding: 1rem; background: var(--blue-dark); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 1rem; color: white; border-radius: 50px; transition: background 0.2s, transform 0.2s; margin-top: 1rem; box-shadow: 0 6px 20px rgba(34,113,163,0.3); }
        .submit-btn:hover { background: var(--blue); transform: translateY(-1px); }
        .submit-btn:disabled { background: var(--text-light); cursor: not-allowed; transform: none; box-shadow: none; }

        .sidebar { display: flex; flex-direction: column; gap: 1.2rem; }
        .info-card { background: white; border: 1px solid var(--snow3); border-radius: 16px; padding: 1.5rem; box-shadow: 0 4px 16px rgba(74,158,202,0.06); overflow: hidden; }
        .info-card-title { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 700; color: var(--blue-dark); margin-bottom: 0.8rem; }
        .info-list { list-style: none; }
        .info-list li { font-size: 0.85rem; font-weight: 300; color: var(--text-mid); padding: 0.45rem 0; border-bottom: 1px solid var(--snow3); display: flex; align-items: center; gap: 0.6rem; }
        .info-list li:last-child { border-bottom: none; }
        .info-list li::before { content: '❄'; color: var(--blue); font-size: 0.65rem; }
        .cancel-note { padding: 1rem 1.2rem; border: 1px solid var(--snow3); border-left: 3px solid var(--blue); background: var(--snow2); border-radius: 0 12px 12px 0; font-size: 0.8rem; color: var(--text-mid); line-height: 1.6; }
        .cancel-note strong { color: var(--blue-dark); }
        .price-list { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
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

            {/* Equipment & Service */}
            <div className="form-group">
              <label>{tx.equipLabel} *</label>
              <span className="label-sub">{tx.equipSub}</span>

              {/* Added items list */}
              {items.length > 0 && (
                <div className="equip-list">
                  {items.map(item => (
                    <div className="equip-item" key={item.id}>
                      <span className="equip-emoji">{typeEmoji(item.type)}</span>
                      <div className="equip-info">
                        <div className="equip-name">{typeLabel(item.type)}</div>
                        <div className="equip-price">{unitPrice(item).toLocaleString()} HUF</div>
                      </div>
                      <div className="service-toggle">
                        <button type="button" className={`svc-btn${item.service === 'small' ? ' active' : ''}`} onClick={() => setService(item.id, 'small')}>{tx.small}</button>
                        <button type="button" className={`svc-btn${item.service === 'full' ? ' active' : ''}`} onClick={() => setService(item.id, 'full')}>{tx.full}</button>
                      </div>
                      <button type="button" className="remove-btn" onClick={() => removeItem(item.id)} title={tx.remove}>✕</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add buttons */}
              <div className="add-btns">
                <button type="button" className="add-btn" onClick={() => addItem('ski')}>{tx.addSki}</button>
                <button type="button" className="add-btn" onClick={() => addItem('skiChild')}>{tx.addSkiChild}</button>
                <button type="button" className="add-btn" onClick={() => addItem('snowboard')}>{tx.addSnowboard}</button>
              </div>

              {/* Discount */}
              {totalPairs >= 2
                ? <div className="discount-badge active">🎉 {discountPct}% {lang === 'en' ? 'discount applied!' : 'kedvezmény érvényes!'}</div>
                : <div className="discount-badge hint">{tx.discount2} · {tx.discount3}</div>
              }
            </div>

            {/* Live total */}
            {items.length > 0 && (
              <div className="total-box">
                {discountPct > 0 ? (
                  <div className="total-row">
                    <span>{tx.serviceSubtotal}</span>
                    <span><span className="strike">{base.toLocaleString()}</span>{discounted.toLocaleString()} HUF</span>
                  </div>
                ) : (
                  <div className="total-row">
                    <span>{tx.serviceSubtotal}</span>
                    <span>{base.toLocaleString()} HUF</span>
                  </div>
                )}
                <div className="total-row final">
                  <span>{tx.estimatedTotal}</span>
                  <span>{discounted.toLocaleString()} HUF</span>
                </div>
              </div>
            )}

            {/* Hidden field for Google Form */}
            <input type="hidden" name="entry.832485945" value={equipSummary} />
            <input type="hidden" name="entry.1172623689" value={equipSummary} />

            <button type="submit" className="submit-btn" disabled={items.length === 0}>
              {items.length === 0 ? tx.noItems : tx.submit}
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