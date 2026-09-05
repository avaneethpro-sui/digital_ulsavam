# Utsavam Events

Utsavam Events is a React event-management application inspired by Kerala's Pooram festival tradition. It brings event discovery, artist profiles, direct booking, live bidding, and management dashboards into one visual experience.

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
| [src/main.jsx](src/main.jsx) | React application and route views |
| [src/styles.css](src/styles.css) | React application styles |
| [server/index.js](server/index.js) | Express API and MongoDB integration |
| [server/seed.js](server/seed.js) | MongoDB schemas and initial content |
| [docker-compose.yml](docker-compose.yml) | App, MongoDB, and Mongo Express services |
| [Dockerfile](Dockerfile) | Production React build and API image |
| [Ulsav.html](Ulsav.html) | Original landing-page reference |
| [event.html](event.html) | Original catalog and booking reference |
| [bidding area.html](bidding%20area.html) | Original live bidding reference |
| [ulsav admin.html](ulsav%20admin.html) | Original admin dashboard reference |

## Run Locally

The recommended startup uses Docker Compose. Install Docker Desktop, then run:

```sh
docker compose up --build -d
```

Visit <http://localhost:5173>. The app container serves the React UI and API on port `5173`; it connects to MongoDB internally and seeds the content automatically on startup. The Mongo Express dashboard is available at <http://localhost:8081> with username `admin` and password `admin`.

To stop the stack:

```sh
docker compose down
```

For local development outside Docker, install Node.js 20+ and run MongoDB first:

```sh
npm install
docker compose up -d mongodb
npm run dev
```

The Vite client runs on <http://localhost:5173> and the local API runs on <http://localhost:4000>. Do not run the Docker app and the local Vite client at the same time because both use port `5173`.

## Notes

- The React application lives in `src/`; the MongoDB-backed API lives in `server/`.
- React routes include `/`, `/events`, `/event/:id`, `/booking`, `/marketplace`, `/login`, `/register`, `/dashboard`, and `/admin`.
- Use the React `/login` and `/register` routes for accounts; the legacy standalone auth pages redirect there so accounts are stored in MongoDB.
- Event content, users, booking requests, and bids are stored in MongoDB. Sessions are currently held in API memory and reset when the app container restarts.
- Some pages load fonts and icons from external CDNs, so an internet connection improves the local preview.

## License

See [LICENSE](LICENSE) for the project license.