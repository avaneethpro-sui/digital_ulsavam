import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Bid, Booking, Content, User, seedContent } from './seed.js';

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || 'mongodb://admin:admin@127.0.0.1:27017/utsavam?authSource=admin';
const distPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');

app.use(cors());
app.use(express.json());

const sessions = new Map();

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function validPassword(password, storedHash) {
  const [salt, hash] = storedHash.split(':');
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(hash, 'hex'));
}

function publicUser(user) {
  return { id: user._id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role, district: user.district, specialization: user.specialization };
}

function sessionUser(request) {
  const token = request.headers.authorization?.replace('Bearer ', '');
  return token ? sessions.get(token) : null;
}

app.post('/api/auth/register', async (request, response) => {
  try {
    const { fullName, email, phone, password, role = 'user', district, specialization } = request.body;
    if (!fullName || !email || !password || password.length < 6) return response.status(400).json({ error: 'Name, email, and a password of at least 6 characters are required.' });
    if (await User.exists({ email: email.toLowerCase() })) return response.status(409).json({ error: 'An account with this email already exists.' });
    const user = await User.create({ fullName, email, phone, passwordHash: hashPassword(password), role: role === 'collaborator' ? role : 'user', district, specialization });
    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, user._id.toString());
    response.status(201).json({ token, user: publicUser(user) });
  } catch (error) {
    response.status(500).json({ error: 'Could not create the account.', detail: error.message });
  }
});

app.post('/api/auth/login', async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email: email?.toLowerCase() });
  if (!user || !password || !validPassword(password, user.passwordHash)) return response.status(401).json({ error: 'Invalid email or password.' });
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, user._id.toString());
  response.json({ token, user: publicUser(user) });
});

app.get('/api/me', async (request, response) => {
  const id = sessionUser(request);
  if (!id) return response.status(401).json({ error: 'Not signed in.' });
  const user = await User.findById(id);
  response.json({ user: publicUser(user) });
});

app.post('/api/bookings', async (request, response) => {
  const userId = sessionUser(request);
  const { name, phone, email, eventType, date, programs = [], location, notes } = request.body;
  if (!name || !phone || !date) return response.status(400).json({ error: 'Name, phone, and event date are required.' });
  const booking = await Booking.create({ userId, name, phone, email, eventType, date, programs, location, notes });
  response.status(201).json({ booking });
});

app.get('/api/bookings', async (request, response) => {
  const userId = sessionUser(request);
  if (!userId) return response.status(401).json({ error: 'Sign in to view bookings.' });
  response.json({ bookings: await Booking.find({ userId }).sort({ createdAt: -1 }).lean() });
});

app.post('/api/bids', async (request, response) => {
  const { eventId, bidderName, amount } = request.body;
  const numericAmount = Number(amount);
  if (!eventId || !bidderName || !Number.isFinite(numericAmount) || numericAmount <= 0) return response.status(400).json({ error: 'A valid bidder name and amount are required.' });
  const latest = await Bid.findOne({ eventId }).sort({ amount: -1 });
  if (latest && numericAmount <= latest.amount) return response.status(400).json({ error: `Your bid must exceed ${latest.amount.toLocaleString('en-IN')}.` });
  const bid = await Bid.create({ eventId, bidderName, amount: numericAmount, userId: sessionUser(request) });
  response.status(201).json({ bid });
});

app.get('/api/content', async (_request, response) => {
  try {
    const documents = await Content.find().lean();
    response.json(Object.fromEntries(documents.map(({ key, value }) => [key, value])));
  } catch (_error) {
    response.status(503).json({ error: 'Content database is unavailable.' });
  }
});

app.get('/api/health', (_request, response) => response.json({ status: 'ok' }));

app.use(express.static(distPath));
app.get(/.*/, (_request, response) => response.sendFile(path.join(distPath, 'index.html')));

mongoose.connect(mongoUri)
  .then(async () => {
    await seedContent();
    app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
  })
  .catch((error) => {
    console.error('Could not connect to MongoDB:', error.message);
    process.exitCode = 1;
  });