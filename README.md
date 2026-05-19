# NextTutor Site - Installation

Install the project dependencies (specifically `vite`):

```bash
npm install
```

## Running the Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The site will be available at `http://localhost:5173/`. You can navigate between the pages naturally:
- Features: `http://localhost:5173/platform.html`
- Pricing: `http://localhost:5173/pricing.html`
- About: `http://localhost:5173/about.html`

## Building for Production

To bundle and optimize the application (minify CSS, hash assets, and package all pages):

```bash
npm run build
```

The compiled output will be generated inside the `dist/` directory, ready to be deployed to static hosting providers.