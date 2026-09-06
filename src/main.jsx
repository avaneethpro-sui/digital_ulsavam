import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const apiUrl = import.meta.env.VITE_API_URL || '/api/content';
const money = (value) => `₹${Number(value).toLocaleString('en-IN')}`;

function Landing({ content }) {
  return <>
    <header className="nav"><a className="brand" href="#top"><span className="brand-mark">*</span> Utsavam</a><nav><a href="#about">About</a><a href="#services">Services</a><a href="#gallery">Gallery</a><a className="nav-button" href="mailto:hello@utsavamevents.example">Plan an event</a></nav></header>
    <main id="top">
      <section className="hero"><div className="hero-art"><span>*</span><span>+</span><span>*</span></div><div className="hero-content"><p className="kicker">{content.hero.kicker}</p><h1>{content.hero.title}</h1><p className="lead">{content.hero.description}</p><a className="button" href="#services">Explore our craft <span>↓</span></a></div><div className="scroll-cue">SCROLL <i /></div></section>
      <section className="about section" id="about"><div className="section-title"><span className="eyebrow">OUR STORY</span><h2>{content.about.title}</h2></div><div className="about-copy">{content.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<div className="facts">{content.about.facts.map((fact) => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}</div></div></section>
      <section className="services section" id="services"><div className="section-heading"><span className="eyebrow">WHAT WE PRODUCE</span><h2>Gatherings with a pulse.</h2><p>Four kinds of gatherings, each staged with the same discipline we bring to a temple festival.</p></div><div className="service-list">{content.services.map((service, index) => <article className="service" key={service.title}><span className="service-number">0{index + 1}</span><h3>{service.title}</h3><p>{service.description}</p><span className="service-arrow">↗</span></article>)}</div></section>
      <section className="signature"><div className="parasols"><span>◒</span><span>◓</span></div><div><span className="eyebrow">THE SIGNATURE MOMENT</span><h2>{content.signature.title}</h2><p>{content.signature.description}</p></div></section>
      <section className="gallery section" id="gallery"><div className="section-heading"><span className="eyebrow">RECENT PRODUCTIONS</span><h2>Made to be remembered.</h2></div><div className="gallery-grid">{content.gallery.map((item, index) => <article className={`gallery-card ${item.colour}`} key={item.title}><span>{item.place}</span><h3>{item.title}</h3><b>0{index + 1}</b></article>)}</div></section>
      <section className="testimonial"><blockquote>“{content.testimonial.quote}”</blockquote><cite>— {content.testimonial.author}</cite></section>
    </main>
    <footer><div><a className="brand" href="#top"><span className="brand-mark">*</span> Utsavam</a><p>Festival-grade event management, rooted in Thrissur and made for moments that gather people.</p></div><div><span className="eyebrow">CONTACT</span><a href="mailto:hello@utsavamevents.example">hello@utsavamevents.example</a><a href="tel:+914871234567">+91 487 123 4567</a></div></footer>
  </>;
}

function AppNav() {
  return <header className="app-nav"><a className="brand" href="/"><span className="brand-mark">*</span> Utsavam</a><nav><a href="/events">Explore</a><a href="/marketplace">Marketplace</a><a href="/booking">Book an event</a><a className="nav-button" href="/login">Sign in</a></nav></header>;
}

function DarkShell({ children }) { return <div className="app-page dark-page"><AppNav />{children}</div>; }
function Heading({ eyebrow, title, text }) { return <section className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</section>; }

function EventCard({ event }) {
  return <article className="event-card"><div className="event-art">{event.icon}</div><span className="event-category">{event.category}</span><h3>{event.title}</h3><p>{event.description}</p><div className="event-meta"><span>★ {event.rating} ({event.reviews})</span><strong>{money(event.price)}</strong></div><a className="outline-button" href={`/event/${event.id}`}>View program</a></article>;
}

function EventsPage({ events }) {
  const [category, setCategory] = useState('all');
  const categories = ['all', 'pooram', 'melam', 'fireworks', 'kudamattam', 'wedding', 'corporate'];
  const visible = category === 'all' ? events : events.filter((event) => event.category === category);
  return <DarkShell><Heading eyebrow="KERALA FESTIVAL MANAGEMENT" title="Explore programs & book your event" text="Discover festival programs across categories, from grand poorams to intimate weddings."/><main className="catalog"><div className="filter-row">{categories.map((item) => <button className={category === item ? 'filter active' : 'filter'} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><div className="catalog-heading"><div><span className="eyebrow">FEATURED OFFERINGS</span><h2>Select your experience</h2></div><span>{visible.length} programs</span></div><div className="event-grid">{visible.map((event) => <EventCard event={event} key={event.id}/>)}</div></main></DarkShell>;
}

function EventDetail({ event }) {
  if (!event) return <DarkShell><Heading eyebrow="PROGRAM NOT FOUND" title="That offering has moved."/></DarkShell>;
  return <DarkShell><main className="detail"><a className="back-link" href="/events">← Back to programs</a><div className="detail-grid"><div className="detail-art">{event.icon}<span>★ {event.rating} ({event.reviews} reviews)</span></div><div className="detail-copy"><span className="eyebrow">{event.category} · {event.artist}</span><h1>{event.title}</h1><p className="detail-description">{event.description}</p><div className="price-panel"><strong>{money(event.price)}</strong><span>Inclusive of standard performance logistics</span></div><div className="spec-grid">{Object.entries(event.details).map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div><a className="button" href={`/booking?program=${event.id}`}>Reserve & book now <span>→</span></a></div></div><div className="bio-panel"><span className="eyebrow">OVERVIEW</span><h2>Built around the moment people remember.</h2><p>{event.artist} brings trained artists, traditional equipment and careful production to celebrations across Kerala.</p></div></main></DarkShell>;
}

function BookingPage({ events }) {
  const [submitted, setSubmitted] = useState(false);
  const [programs, setPrograms] = useState([]);
  const toggle = (id) => setPrograms((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  return <DarkShell><main className="form-page"><Heading eyebrow="RESERVATION DESK" title="Reserve a program" text="Tell us what you are planning and we will return with availability and a custom quote."/><form className="booking-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-grid"><label>Full name<input required placeholder="Your name"/></label><label>Phone number<input required type="tel" placeholder="+91 98765 43210"/></label><label>Event type<select required><option value="">Select category</option><option>Wedding celebration</option><option>Temple festival</option><option>Corporate cultural event</option></select></label><label>Event date<input required type="date"/></label></div><label>Include programs<div className="check-grid">{events.slice(0, 4).map((event) => <button type="button" className={programs.includes(event.id) ? 'check selected' : 'check'} onClick={() => toggle(event.id)} key={event.id}>{event.icon} {event.title}</button>)}</div></label><label>Location & requirements<textarea rows="4" placeholder="City, venue and anything special we should know"/></label><button className="button submit-button" type="submit">Submit booking request <span>→</span></button>{submitted && <p className="success">Your request is recorded. Our events desk will be in touch shortly.</p>}</form></main></DarkShell>;
}

function Marketplace({ events }) {
  const [bids, setBids] = useState({});
  const auctionEvents = events.filter((event) => ['melam', 'pooram', 'fireworks'].includes(event.category));
  return <DarkShell><Heading eyebrow="LIVE MARKETPLACE" title="Explore, bid & book" text="Discover the artists and experiences shaping Kerala's next celebrations."/><main className="catalog"><div className="catalog-heading"><div><span className="eyebrow">LIVE BIDDING</span><h2>Premium festival programs</h2></div><span>{auctionEvents.length} active auctions</span></div><div className="event-grid">{auctionEvents.map((event) => <article className="event-card" key={event.id}><div className="event-art">{event.icon}</div><span className="event-category">LIVE AUCTION</span><h3>{event.title}</h3><p>{event.description}</p><div className="bid-bar"><span style={{ width: `${55 + (event.rating - 4) * 20}%` }}/></div><div className="event-meta"><span>Current bid</span><strong>{money(event.price + (bids[event.id] || 0))}</strong></div><button className="button bid-button" onClick={() => setBids({ ...bids, [event.id]: (bids[event.id] || 0) + 5000 })}>Raise bid by ₹5,000</button></article>)}</div></main></DarkShell>;
}

function AuthPage({ register = false }) {
  const [submitted, setSubmitted] = useState(false);
  return <div className="auth-page"><div className="auth-promo"><a className="brand" href="/"><span className="brand-mark">*</span> Utsavam</a><div><span className="eyebrow">KERALA · UTSAVAM</span><h1>{register ? 'Bring your art to the gathering.' : 'The next celebration starts here.'}</h1><p>One account for discovering artists, planning events and keeping every detail in rhythm.</p></div></div><form className="auth-card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><a className="back-link" href="/">← Back home</a><span className="eyebrow">{register ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</span><h2>{register ? 'Register your profile' : 'Sign in to Utsavam'}</h2><p className="muted">{register ? 'Join the artists and organisers shaping Kerala’s celebrations.' : 'Manage your bookings and event plans.'}</p>{register && <label>Full name<input required placeholder="Your name"/></label>}<label>Email address<input required type="email" placeholder="you@example.com"/></label><label>Password<input required type="password" placeholder="••••••••"/></label>{register && <label>Account type<select><option>Event organiser</option><option>Artist / collaborator</option></select></label>}<button className="button submit-button" type="submit">{register ? 'Create account' : 'Sign in'} <span>→</span></button>{submitted && <p className="success">Demo action complete. Connect this form to your auth service when ready.</p>}<p className="switch-auth">{register ? 'Already registered?' : 'New to Utsavam?'} <a href={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</a></p></form></div>;
}

function ConnectedBookingPage({ events }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [programs, setPrograms] = useState([]);
  const toggle = (id) => setPrograms((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  async function submitBooking(event) {
    event.preventDefault();
    setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(localStorage.getItem('utsavamToken') ? { Authorization: `Bearer ${localStorage.getItem('utsavamToken')}` } : {}) }, body: JSON.stringify({ ...values, programs }) });
    const result = await response.json();
    if (!response.ok) return setError(result.error || 'Booking could not be submitted.');
    setSubmitted(true);
    event.currentTarget.reset();
    setPrograms([]);
  }
  return <DarkShell><main className="form-page"><Heading eyebrow="RESERVATION DESK" title="Reserve a program" text="Tell us what you are planning and we will return with availability and a custom quote."/><form className="booking-form" onSubmit={submitBooking}><div className="form-grid"><label>Full name<input name="name" required placeholder="Your name"/></label><label>Phone number<input name="phone" required type="tel" placeholder="+91 98765 43210"/></label><label>Email address<input name="email" type="email" placeholder="you@example.com"/></label><label>Event type<select name="eventType" required><option value="">Select category</option><option>Wedding celebration</option><option>Temple festival</option><option>Corporate cultural event</option></select></label><label>Event date<input name="date" required type="date"/></label></div><label>Include programs<div className="check-grid">{events.slice(0, 4).map((event) => <button type="button" className={programs.includes(event.id) ? 'check selected' : 'check'} onClick={() => toggle(event.id)} key={event.id}>{event.icon} {event.title}</button>)}</div></label><label>Location & requirements<textarea name="notes" rows="4" placeholder="City, venue and anything special we should know"/></label><label>Event location<input name="location" placeholder="Thrissur, Kerala"/></label><button className="button submit-button" type="submit">Submit booking request <span>→</span></button>{error && <p className="error-message">{error}</p>}{submitted && <p className="success">Your booking request is saved in MongoDB. Our events desk will be in touch shortly.</p>}</form></main></DarkShell>;
}

function ConnectedMarketplace({ events }) {
  const [bids, setBids] = useState({});
  const [message, setMessage] = useState('');
  const auctionEvents = events.filter((event) => ['melam', 'pooram', 'fireworks'].includes(event.category));
  async function placeBid(eventId, currentAmount) {
    const response = await fetch('/api/bids', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(localStorage.getItem('utsavamToken') ? { Authorization: `Bearer ${localStorage.getItem('utsavamToken')}` } : {}) }, body: JSON.stringify({ eventId, bidderName: localStorage.getItem('utsavamUser') || 'guest-organiser', amount: Number(currentAmount) }) });
    const result = await response.json();
    if (!response.ok) return setMessage(result.error || 'Bid could not be placed.');
    setBids({ ...bids, [eventId]: result.bid.amount });
    setMessage(`Bid of ${money(result.bid.amount)} recorded in MongoDB.`);
  }
  return <DarkShell><Heading eyebrow="LIVE MARKETPLACE" title="Explore, bid & book" text="Discover the artists and experiences shaping Kerala's next celebrations."/><main className="catalog"><div className="catalog-heading"><div><span className="eyebrow">LIVE BIDDING</span><h2>Premium festival programs</h2></div><span>{auctionEvents.length} active auctions</span></div>{message && <p className="success">{message}</p>}<div className="event-grid">{auctionEvents.map((event) => { const amount = bids[event.id] || event.price + 5000; return <article className="event-card" key={event.id}><div className="event-art">{event.icon}</div><span className="event-category">LIVE AUCTION</span><h3>{event.title}</h3><p>{event.description}</p><div className="bid-bar"><span style={{ width: `${55 + (event.rating - 4) * 20}%` }}/></div><div className="event-meta"><span>Current bid</span><strong>{money(bids[event.id] || event.price)}</strong></div><div className="bid-entry"><input type="number" min={amount} defaultValue={amount}/><button className="button bid-button" onClick={(click) => placeBid(event.id, click.currentTarget.previousElementSibling.value)}>Place bid</button></div></article>; })}</div></main></DarkShell>;
}

function ConnectedAuthPage({ register = false }) {
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  async function submitAuth(event) {
    event.preventDefault();
    setError('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    if (register) values.role = values.accountType === 'Artist / collaborator' ? 'collaborator' : 'user';
    const response = await fetch(register ? '/api/auth/register' : '/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    const result = await response.json();
    if (!response.ok) return setError(result.error || 'Authentication failed.');
    localStorage.setItem('utsavamToken', result.token);
    localStorage.setItem('utsavamUser', result.user.fullName);
    setSubmitted(true);
    window.location.href = result.user.role === 'admin' ? '/admin' : '/dashboard';
  }
  return <div className="auth-page"><div className="auth-promo"><a className="brand" href="/"><span className="brand-mark">*</span> Utsavam</a><div><span className="eyebrow">KERALA · UTSAVAM</span><h1>{register ? 'Bring your art to the gathering.' : 'The next celebration starts here.'}</h1><p>One account for discovering artists, planning events and keeping every detail in rhythm.</p></div></div><form className="auth-card" onSubmit={submitAuth}><a className="back-link" href="/">← Back home</a><span className="eyebrow">{register ? 'CREATE ACCOUNT' : 'WELCOME BACK'}</span><h2>{register ? 'Register your profile' : 'Sign in to Utsavam'}</h2><p className="muted">{register ? 'Join the artists and organisers shaping Kerala’s celebrations.' : 'Manage your bookings and event plans.'}</p>{register && <label>Full name<input name="fullName" required placeholder="Your name"/></label>}<label>Email address<input name="email" required type="email" placeholder="you@example.com"/></label><label>Password<input name="password" required minLength="6" type="password" placeholder="••••••••"/></label>{register && <label>Account type<select name="accountType"><option>Event organiser</option><option>Artist / collaborator</option></select></label>}<button className="button submit-button" type="submit">{register ? 'Create account' : 'Sign in'} <span>→</span></button>{error && <p className="error-message">{error}</p>}{submitted && <p className="success">Account saved. Redirecting...</p>}<p className="switch-auth">{register ? 'Already registered?' : 'New to Utsavam?'} <a href={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</a></p></form></div>;
}

function Dashboard({ admin = false }) {
  return <DarkShell><main className="dashboard"><div className="dashboard-top"><div><span className="eyebrow">{admin ? 'ADMIN CONSOLE' : 'YOUR UTSAVAM'}</span><h1>{admin ? 'Keep the whole celebration moving.' : 'Your event plans.'}</h1></div><a className="button" href={admin ? '/events' : '/booking'}>{admin ? 'Browse marketplace' : 'Plan another event'} <span>→</span></a></div><div className="stat-grid"><div><span>Upcoming bookings</span><strong>{admin ? '24' : '02'}</strong></div><div><span>Active requests</span><strong>{admin ? '08' : '01'}</strong></div><div><span>{admin ? 'Registered artists' : 'Saved programs'}</span><strong>{admin ? '148' : '06'}</strong></div></div><section className="table-panel"><div className="catalog-heading"><div><span className="eyebrow">{admin ? 'PLATFORM ACTIVITY' : 'RECENT ACTIVITY'}</span><h2>{admin ? 'Bookings needing attention' : 'Your booking timeline'}</h2></div></div>{['Kudamattam Display · 18 Oct 2026', 'Panchari & Pandi Melam · 04 Nov 2026', 'Corporate Cultural Launch · Draft request'].map((item, index) => <div className="activity-row" key={item}><span className="activity-icon">0{index + 1}</span><strong>{item}</strong><span className={index === 2 ? 'status pending' : 'status'}>{index === 2 ? 'Needs details' : 'Confirmed'}</span></div>)}</section></main></DarkShell>;
}

function Footer() { return <footer><div><a className="brand" href="/"><span className="brand-mark">*</span> Utsavam</a><p>Festival-grade event management, rooted in Thrissur and made for moments that gather people.</p></div><div><span className="eyebrow">CONTACT</span><a href="mailto:hello@utsavamevents.example">hello@utsavamevents.example</a><a href="tel:+914871234567">+91 487 123 4567</a></div></footer>; }

function App() {
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { fetch(apiUrl).then((response) => { if (!response.ok) throw new Error('Content could not be loaded.'); return response.json(); }).then(setContent).catch((loadError) => setError(loadError.message)); }, []);
  if (error) return <main className="state"><h1>Utsavam Events</h1><p>{error} Start MongoDB and the API, then refresh.</p></main>;
  if (!content) return <main className="state"><p>Loading the celebration...</p></main>;
  const path = window.location.pathname;
  if (path === '/events') return <EventsPage events={content.events}/>;
  if (path === '/marketplace') return <ConnectedMarketplace events={content.events}/>;
  if (path === '/booking') return <ConnectedBookingPage events={content.events}/>;
  if (path === '/login') return <ConnectedAuthPage/>;
  if (path === '/register') return <ConnectedAuthPage register/>;
  if (path === '/dashboard') return <Dashboard/>;
  if (path === '/admin') return <Dashboard admin/>;
  if (path.startsWith('/event/')) return <EventDetail event={content.events.find((item) => item.id === path.split('/')[2])}/>;
  return <Landing content={content}/>;
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);