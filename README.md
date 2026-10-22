# For Roshni — Birthday Surprise Website ♡

A responsive React + Vite birthday microsite with romantic Hinglish copy, memory gallery, animated birthday cake, letter reveal, promises section, confetti and mobile styling.

## 1. Run locally

Requirements: Node.js 18+ recommended.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## 2. Add your photos

Put your own photos in `public/photos/` using these exact filenames:

- `cover.jpg` — hero image (ideally a portrait or favourite couple photo)
- `memory-main.jpg` — story section photo
- `photo-1.jpg` — first memory
- `photo-2.jpg` — second memory
- `photo-3.jpg` — third memory

JPG is easiest; if your photos are PNG or WebP, either convert them to JPG or update the matching paths in `src/main.jsx`. Use cropped copies for faster loading. Keep private/intimate photos off a public website unless you are comfortable with anyone who has the link potentially seeing them.

## 3. Personalize it

Open `src/main.jsx` and edit:
- birthday message / love letter copy
- story paragraph
- memory labels and notes
- promises
- nickname (“meri motki”) if you want a different spelling or phrase

The countdown automatically targets the next October 22 based on the visitor's local date. The sound button is intentionally a mood prompt, not an audio player, so it does not unexpectedly autoplay music. You can add a song only if you have permission to use it.

## 4. Build for production

```bash
npm run build
npm run preview
```

The production files are created in `dist/`.

## 5. Free deployment

### Netlify (simple drag-and-drop)
1. Run `npm run build`.
2. Open https://app.netlify.com/drop
3. Drag the generated `dist` folder into the page.
4. Copy the public URL and test it on your phone.

### Vercel (GitHub workflow)
1. Push this project to a GitHub repository.
2. Open https://vercel.com/new and import the repository.
3. Framework preset: Vite. Build command: `npm run build`; output directory: `dist`.
4. Deploy, then open the URL on mobile to test.

Both providers' free tiers and limits can change. You do not need to buy a domain to share the default deployment URL.

## Before sharing
- Add and test the photos.
- Open the site on a phone and test every button.
- Check the published URL in an incognito/private window.
- Avoid adding personal phone numbers, home addresses or other sensitive information.

## Mobile-only behavior

The birthday surprise is designed to display on phone-sized screens. On tablet/desktop-width screens (768px and above), it shows a simple message asking the visitor to open the link on their phone. Test it in a mobile browser or with your browser's device toolbar.


Birthday animation update: repeating animated “Happy Birthday Roshni” ribbons, floating hearts, a birthday wish strip, gentle cake/card motion, twinkling sparkles, and a glowing birthday message in the footer. Still designed as a mobile-first/mobile-only surprise.
