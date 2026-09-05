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
| [ulsav managment.css](ulsav%20managment.css) | Shared styles for dashboard and form pages |

## Run Locally

This project does not require a build tool or package installation. Open [Ulsav.html](Ulsav.html) directly in a browser, or serve the folder with a local static server:

```powershell
python -m http.server 8000
```

Then visit <http://localhost:8000/Ulsav.html>.

## Notes

- The project is currently a front-end prototype made with HTML, CSS, and browser JavaScript.
- Forms, authentication, bookings, bids, and dashboards use demo client-side behavior; no production backend or database is configured.
- Some pages load fonts and icons from external CDNs, so an internet connection improves the local preview.

## License

See [LICENSE](LICENSE) for the project license.