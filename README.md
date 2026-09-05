# Utsavam Events

Utsavam Events is a static event-management prototype inspired by Kerala's Pooram festival tradition. It brings event discovery, artist profiles, direct booking, live bidding, and management dashboards into one visual experience.

## Features

- Festival-themed landing page for event organizers and clients
- Browse cultural programs and featured offerings
- Book an artist or program directly
- Live bidding arena for available programs
- Artist registration and artist dashboard
- User login and booking views
- Admin dashboard for bookings, artists, and reports
- Responsive layouts with animated interactions

## Project Structure

| File | Purpose |
| --- | --- |
| [Ulsav.html](Ulsav.html) | Main landing page |
| [event.html](event.html) | Programs and booking page |
| [marketplace.html](marketplace.html) | Programs, categories, and bidding marketplace |
| [bidding area.html](bidding%20area.html) | Live bidding arena |
| [booking.html](booking.html) | Individual program booking page |
| [booking&bid.html](booking%26bid.html) | Combined booking and bidding view |
| [register.html](register.html) | Artist or user registration |
| [Ulsav login.html](Ulsav%20login.html) | Login page |
| [ulsav userpage.html](ulsav%20userpage.html) | Artist dashboard |
| [ulsav admin.html](ulsav%20admin.html) | Admin dashboard |
| [admin-data.json](admin-data.json) | MongoDB-ready seed document for admin bookings, artists, and dashboard metrics |
| [ulsav managment.css](ulsav%20managment.css) | Shared styles for dashboard and form pages |

## Run Locally

The landing page is now a React client backed by an Express API and MongoDB. Install Node.js 20+ and Docker Desktop, then run:

```bash
npm install
docker compose up -d mongodb
npm run dev
```

Visit <http://localhost:5173>. The API seeds the landing-page content into MongoDB on startup and serves it from `http://localhost:4000/api/content`. The Mongo Express dashboard is available at <http://localhost:8081>.

## Notes

- The React landing page lives in `src/`; the MongoDB content API lives in `server/`.
- The older HTML pages remain available as prototype screens while they are migrated.
- Forms, authentication, bookings, bids, and dashboards still use demo client-side behavior; only landing-page content is currently database-backed.
- Some pages load fonts and icons from external CDNs, so an internet connection improves the local preview.

## License

See [LICENSE](LICENSE) for the project license.