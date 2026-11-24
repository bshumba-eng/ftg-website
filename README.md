# FTG: Finesse The Game Promotions

The public website and admin area for FTG, built as a static site so it runs on GitHub Pages.

Live site: https://bshumba-eng.github.io/ftg-website/
Admin area: https://bshumba-eng.github.io/ftg-website/admin/

## What is included

**Public site**

| Page | File | What it does |
| --- | --- | --- |
| Home | `index.html` | Fight night banner and countdown, event tiles, "Explore FTG" grid, the card, featured fighters |
| Events | `events.html` | Upcoming events, previous events, filters, "Add to calendar" and ticket checkout |
| Fighters | `fighters.html` | Every fighter, with weight class filter and search |
| Fighter profile | `fighter.html?id=...` | Bio, record, next fight, previous fights, buy tickets and where to watch them train |
| Photos | `photos.html` | Gallery with filters and a full-screen viewer |
| BTS | `bts.html` | Behind the scenes videos: fight prep, locations and event set-ups |
| The Team | `team.html` | Meet the team, behind the team, the event team and Tech It Out |
| Live | `live.html` | Pay-per-view page with a EUR 15 gate and a YouTube player |
| Contact | `contact.html` | Separate Sponsor, Fight and Collab forms |
| App | `app.html` | App preview and a link to the app |
| Social Media | Navigation link | Opens https://www.instagram.com/finessethegame_ftg/ in a new tab. TikTok and the WhatsApp Community show as "Coming soon" |

**Admin area** (`admin/index.html`): Dashboard, Calendar (upcoming, month, whole year, add and edit events), Fighters (view and edit), Payments, Stats, Requests and Logout.

## Run it locally

No build step. From this folder:

```
python -m http.server 8000
```

Then open http://localhost:8000.

## Where to change things

| To change | Edit |
| --- | --- |
| Instagram, TikTok, WhatsApp, app link, ticket prices, PPV price, YouTube stream ID, Stripe link | `assets/js/data.js` (`FTG_CONFIG`) |
| Starting content: events, fighters, team, photos, videos, sponsors | `assets/js/data.js` (`FTG_SEED`) |
| Events and fighters while the site is running | Admin area, Calendar and Fighters |
| Colours and type | `assets/css/site.css` (variables at the top) |

Fighter photos: paste an image link into the fighter's "Photo link" field in the admin area. Until then the site shows generated artwork. Photos and videos on the Photos and BTS pages are set in `FTG_SEED.photos` and `FTG_SEED.videos` (use `src` for an image and `youtubeId` for a video).

## Admin sign in

The username and password are shared privately with the FTG team and are not stored in this repository. Only a salted SHA-256 hash is stored, in `assets/js/admin.js`.

To set a new login, run this in any terminal with Node installed (replace the username and password), then paste the result into `HASH` in `assets/js/admin.js`:

```
node -e "console.log(require('crypto').createHash('sha256').update('ftg-2026:USERNAME:PASSWORD').digest('hex'))"
```

Use a lower-case username.

## Important: this is a demo build

GitHub Pages only serves static files, so this version has no server. That means:

- **Data lives in each visitor's browser** (localStorage). Admin edits, contact form enquiries, test orders and stats are saved on the device used. They are not shared between devices or visitors.
- **The admin login is a demonstration gate**, not real security. Anyone who can read the site's JavaScript can attempt to work around it. Do not store real personal or payment data in this version.
- **Payments are simulated.** No card is requested and no money moves. Set `stripePaymentLink` in `data.js` to send buyers to a real Stripe Payment Link.
- **The live stream gate is client-side.** For real pay-per-view protection, the stream needs to be released by a server after payment is confirmed.
- **All fighters, fights, finances, team members, partners and statistics are fictional placeholders.** Replace them before launch. Names, records and figures do not describe real people.
- Contact forms can also POST to an external form service: set `formEndpoint` in `data.js`.

## Going to production (Supabase)

When FTG approves the design, the demo storage layer (`assets/js/store.js`) is replaced with a real backend:

1. Create a Supabase project and run SQL to create tables for `events`, `fighters`, `requests`, `transactions`, `expenses`, `payouts` and `page_events` (analytics).
2. Use Supabase Auth for the admin login and row level security so only signed-in admins can read requests, payments and stats and edit events and fighters. Visitors may only insert requests and read published events and fighters.
3. Move ticket and PPV payments to Stripe Checkout with a webhook (an Edge Function) that records the order and unlocks access.
4. Store fighter photos and event posters in Supabase Storage.
5. Replace the placeholder stats with real analytics events.

Never put a Supabase `service_role` key or a Stripe secret key in browser code.

## Sponsor

Technology partner: [Tech It Out](https://bshumba-eng.github.io/tech_it_out_and_care_creations/).
