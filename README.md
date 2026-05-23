# HELLGATE PROJECT — Website

Underground rave & techno events website for Istanbul and Ankara. Built with Next.js (frontend) and Express.js (backend), integrated with Stripe for ticket and merch payments.

---

## Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Frontend  | Next.js 14, React 18          |
| Styling   | CSS (styled-jsx + globals)    |
| Backend   | Express.js (Node.js ESM)      |
| Payments  | Stripe (Checkout Sessions)    |
| Icons     | react-icons                   |
| Fonts     | Bebas Neue, Space Grotesk     |

---

## Project Structure

```
HellGate Project/
├── web/                        # Next.js frontend
│   ├── pages/
│   │   ├── index.js            # Home page
│   │   ├── events/             # Events list + detail
│   │   ├── lineup.js           # Artist lineup
│   │   ├── gallery.js          # Photo gallery
│   │   ├── tickets.js          # Ticket tiers
│   │   ├── merch.js            # Merchandise + cart
│   │   ├── faq.js              # FAQ + house rules
│   │   ├── contact.js          # Contact form
│   │   ├── checkout/           # Stripe checkout flow
│   │   └── api/                # Next.js API routes → proxies to backend
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── AgeGate.js
│   ├── context/
│   │   ├── CartContext.js
│   │   └── ToastContext.js
│   ├── hooks/
│   │   └── useInView.js        # Scroll-reveal intersection observer
│   ├── public/
│   │   ├── hero.png            # Hero background image
│   │   ├── logo.png            # Site logo
│   │   ├── tshirt.jpg          # Merch product image
│   │   └── gallery/            # Gallery photos (add yours here)
│   └── styles/
│       └── globals.css         # Design system + global styles
│
└── backend/                    # Express.js API server
    ├── server.js               # Main server (Stripe, contact, lineup, FAQ)
    ├── .env                    # Backend secrets (not committed)
    └── package.json
```

---

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Stripe account (test or live)

### 1. Clone / open the project

```bash
cd "HellGate Project"
```

### 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # then fill in your keys
npm run dev            # starts on http://localhost:5000
```

**`backend/.env`**

```env
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=http://localhost:3000
CONTACT_EMAIL=contact@hellgateproject.com
```

### 3. Frontend setup

```bash
cd web
npm install
cp .env.local.example .env.local   # then fill in your keys
npm run dev                         # starts on http://localhost:3000
```

**`web/.env.local`**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## Running in Development

Open two terminals:

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd web && npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Building for Production

```bash
cd web && npm run build && npm start
```

---

## Adding Gallery Photos

Place your images inside `web/public/gallery/` and reference them in `web/pages/gallery.js`:

```js
const IMAGES = [
  { src: "/gallery/photo01.jpg", caption: "Gate:01 — Main Floor", category: "Gate:01", span: "tall" },
  { src: "/gallery/photo02.jpg", caption: "Gate:01 — DJ Set", category: "Gate:01", span: "normal" },
  // ...
];
```

Supported `span` values: `"normal"` | `"tall"` | `"wide"`

Supported `category` values: `"Gate:01"` | `"Backstage"` | `"Crowd"`

---

## Stripe Webhook (local testing)

```bash
# Install Stripe CLI, then:
stripe listen --forward-to localhost:5000/webhook
```

---

## Environment Variables Reference

| Variable                             | Where       | Description                      |
|--------------------------------------|-------------|----------------------------------|
| `STRIPE_SECRET_KEY`                  | backend     | Stripe secret key (sk_...)       |
| `STRIPE_WEBHOOK_SECRET`              | backend     | Stripe webhook signing secret    |
| `PORT`                               | backend     | Express server port (default 5000) |
| `FRONTEND_URL`                       | backend     | Allowed CORS origin              |
| `NEXT_PUBLIC_API_URL`                | frontend    | Backend base URL                 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | frontend    | Stripe publishable key (pk_...)  |

---

## Design System

| Token            | Value                    |
|------------------|--------------------------|
| `--brand`        | `#ff0033`                |
| `--bg`           | `#050505`                |
| `--green`        | `#00ff88`                |
| `--purple`       | `#8800ff`                |
| `--cyan`         | `#00ddff`                |
| Font (display)   | Bebas Neue               |
| Font (body)      | Space Grotesk            |

---

## Pages Overview

| Route                  | Description                            |
|------------------------|----------------------------------------|
| `/`                    | Home — hero, countdown, events, lineup |
| `/events`              | All upcoming & past events             |
| `/events/[id]`         | Single event detail + ticket sidebar   |
| `/lineup`              | Full artist lineup with schedule       |
| `/gallery`             | Masonry photo gallery + lightbox       |
| `/tickets`             | Ticket tiers for next event            |
| `/merch`               | Merchandise + cart sidebar             |
| `/faq`                 | FAQ accordion + house rules            |
| `/contact`             | Contact form                           |
| `/checkout`            | Multi-step checkout (Stripe redirect)  |
| `/checkout/success`    | Post-payment confirmation              |
| `/checkout/cancel`     | Cancelled payment page                 |

---

## Social

- Instagram: [@hellgate.project](https://www.instagram.com/hellgate.project/)
- SoundCloud: [soundcloud.com/hellgate](https://soundcloud.com/hellgate)
- Email: contact@hellgateproject.com

---

*© 2026 Hellgate Project — All rights reserved.*
