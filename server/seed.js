import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

export const defaultContent = {
  hero: {
    kicker: 'KERALA · FESTIVAL-GRADE EVENT MANAGEMENT',
    title: 'Where every celebration becomes a pooram',
    description: "We bring the scale, colour and rhythm of Kerala's temple festivals to weddings, corporate gatherings and cultural events."
  },
  about: {
    title: 'Twenty seasons of building the crowd that gathers, the drums that build, and the moment the elephants arrive.',
    paragraphs: [
      'Utsavam Events was founded by a family that has organised temple pooram processions in Thrissur for three generations.',
      'Every project starts the same way: we ask what the single unforgettable moment should be, and build the whole event toward it.'
    ],
    facts: [
      { value: '240+', label: 'Events produced' },
      { value: '18', label: 'Trained melam ensembles' },
      { value: '4', label: 'Districts covered' }
    ]
  },
  services: [
    { title: 'Temple & community poorams', description: 'Full-scale procession management, elephant coordination, melam scheduling, crowd control and fireworks permits.' },
    { title: 'Weddings, Kerala-style', description: 'Sadhya-scale hospitality with a festival heart: nadaswaram processions, lamp-lit mandapams and curated menus.' },
    { title: 'Corporate & launch events', description: 'Bring the drama of a pooram opening to a product reveal or company milestone, staged for a boardroom or stadium.' },
    { title: 'Cultural performances', description: 'Theyyam, Kathakali and percussion ensembles booked and staged with proper ritual sequencing and lighting.' }
  ],
  events: [
    {
      id: 'evt-001', category: 'melam', artist: 'Sreedharan Marar & Ensemble', title: 'Panchari & Pandi Melam',
      description: 'High-energy traditional percussion ensembles featuring top Kerala artists for weddings and inaugurals.', price: 120000, icon: '🥁', rating: 4.9, reviews: 128,
      details: { team: '15 to 60 performing artists', styles: 'Panchari, Pandi, Ilanjithara style', equipment: 'Chenda, Elathalam, Kombu, Kuzhal', location: 'Thrissur, Kerala' }
    },
    {
      id: 'evt-002', category: 'pooram', artist: 'Thrissur Pooram Pageantry', title: 'Caparisoned Elephants',
      description: 'Traditional majestic elephant line-ups with nettipattam, decorative umbrellas and full temple ensemble.', price: 420000, icon: '🐘', rating: 4.8, reviews: 96,
      details: { team: '10 elephants + 30 attendants', styles: 'Traditional temple pageantry', equipment: 'Nettipattam, Venchamaram, Aalavattam', location: 'Thrissur, Kerala' }
    },
    {
      id: 'evt-003', category: 'fireworks', artist: 'Grand Pyrotechnics Co.', title: 'Grand Pyrotechnics',
      description: 'Precision temple-style fireworks with aerial shells, ground spinners and full safety certification.', price: 360000, icon: '🎆', rating: 4.7, reviews: 84,
      details: { team: '12 pyrotechnicians', styles: 'Temple-style fireworks, aerial shells', equipment: 'Mortars, shells, ground spinners', location: 'Palakkad, Kerala' }
    },
    {
      id: 'evt-004', category: 'kudamattam', artist: 'Kudamattam Masters', title: 'Kudamattam Display',
      description: 'Fast-paced, colourful sequined umbrella exchange choreography tailored for grand cultural shows.', price: 240000, icon: '🌸', rating: 4.6, reviews: 62,
      details: { team: '24 performers', styles: 'Traditional parasol exchange', equipment: 'Parasols, Aalavattam, Venchamaram', location: 'Guruvayur, Kerala' }
    },
    {
      id: 'evt-005', category: 'wedding', artist: 'Kerala Celebration Guild', title: 'Wedding Procession',
      description: 'A complete Kerala-style welcome with nadaswaram, lamps, percussion and a procession built around your arrival.', price: 185000, icon: '💍', rating: 4.8, reviews: 43,
      details: { team: '20 performing artists', styles: 'Nadaswaram and chenda', equipment: 'Nadaswaram, chenda, lamps', location: 'Kochi, Kerala' }
    },
    {
      id: 'evt-006', category: 'corporate', artist: 'Utsavam Production House', title: 'Cultural Launch',
      description: 'A precise, high-impact festival opening for product launches, company milestones and civic gatherings.', price: 275000, icon: '🏢', rating: 4.7, reviews: 31,
      details: { team: '12 to 40 artists', styles: 'Curated cultural showcase', equipment: 'Sound, lighting and stage direction', location: 'All Kerala' }
    }
  ],
  signature: {
    title: 'Kudamattam — the moment everything builds to',
    description: 'The exchange of decorated parasols above the elephants, timed to the peak of the melam. We choreograph this same crescendo into every event we produce.'
  },
  gallery: [
    { place: 'THRISSUR', title: 'Vadakkunnathan Pooram', colour: 'vermillion' },
    { place: 'KOCHI', title: 'Menon-Pillai Wedding', colour: 'gold' },
    { place: 'KOZHIKODE', title: 'Beach Fest Launch', colour: 'maroon' },
    { place: 'GURUVAYUR', title: 'Temple Anniversary', colour: 'amber' },
    { place: 'PALAKKAD', title: 'Harvest Procession', colour: 'vermillion' }
  ],
  testimonial: {
    quote: 'They did not decorate our wedding with festival motifs — they staged it like one.',
    author: 'Anjali & Rahul, Kochi wedding, 2025'
  }
};

export async function seedContent() {
  for (const [key, value] of Object.entries(defaultContent)) {
    await Content.updateOne({ key }, { key, value }, { upsert: true });
  }
}

export { Content };

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  phone: String,
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'collaborator', 'admin'], default: 'user' },
  district: String,
  specialization: String
}, { timestamps: true });

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  eventType: String,
  date: String,
  programs: [String],
  location: String,
  notes: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

const bidSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bidderName: { type: String, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Booking = mongoose.model('Booking', bookingSchema);
export const Bid = mongoose.model('Bid', bidSchema);