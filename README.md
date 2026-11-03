# FTG PLATFORM — DEMO + BACKEND

## TODAY'S 10-MINUTE DEMO
The public website is already in demo mode. Upload the folder to GitHub Pages and open `index.html`.

For a REAL phone live demo:
1. Use a YouTube channel that is eligible for mobile live streaming.
2. On your phone open YouTube → Create → Live.
3. Start an unlisted/private test broadcast.
4. Copy the YouTube video/live ID.
5. In the real admin dashboard, put that ID in Live Control and switch LIVE NOW on.
6. The public FTG site embeds that broadcast in the Live section.

Important: the FTG website is the branded viewing destination. Your phone sends the camera feed to YouTube; the FTG website displays that live feed. A browser website cannot magically transmit a phone camera to all viewers without a media streaming backend.

YouTube currently says mobile live streaming requires a verified channel, no recent live-stream restrictions, mobile live streaming enabled, and at least 50 subscribers; first-time activation can take up to 24 hours. Practice Mode is available for eligible mobile creators, so use that if available for today's rehearsal.

## REAL BACKEND
1. Create a Supabase project.
2. Run `schema.sql` in Supabase SQL Editor.
3. Create an admin user in Supabase Auth.
4. Put the project's URL and publishable key into `app.js` and `admin.js`.
5. Change `CONFIG.demoMode` to false.
6. Configure proper RLS policies for admin writes before production.
7. Add Storage buckets for event posters/fighter photos/video thumbnails.
8. Add Stripe Checkout via a server/Edge Function; do not put secret Stripe keys in the browser.

Supabase's browser client uses the project URL + publishable/anon key. Never expose the service_role key in browser code.

## PRODUCTION ROADMAP
- Stripe Checkout + webhook → orders
- Supabase Storage → images/media
- YouTube API/OAuth → channel/video/live management
- Instagram/Meta API → supported social content
- Analytics provider → traffic and conversions
- Admin roles (owner/editor/media)
- Real-time live status
- Event/fighter/media CRUD
- Upload manager
- Press conference scheduling
- Automated social publishing where platform APIs permit it
