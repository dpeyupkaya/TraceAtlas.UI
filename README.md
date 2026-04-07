# TraceAtlas UI

> A modern, fast, and responsive frontend for the TraceAtlas platform.

TraceAtlas UI is a React-based single-page application (SPA) built with Vite and Tailwind CSS. It provides an intuitive interface for users to explore maps, pin locations, share places, and manage their profiles. It is fully PWA (Progressive Web App) ready for a seamless mobile experience.

## 🌍 Live Demo

**Experience the live application here:** [traceatlas.com.tr](https://traceatlas.com.tr)

## ✨ Features

- **🗺️ Interactive Map:** View, add, and share location markers dynamically.
- **🔐 Authentication:** Full login, registration, and email confirmation flows.
- **📱 PWA Ready:** Installable on mobile and desktop with offline caching support.
- **👤 Profile Management:** Save favorite places, manage shared locations, and update security settings.
- **⚡ Blazing Fast:** Powered by Vite for instant HMR and optimized builds.
- **🎨 Modern UI:** Fully responsive design crafted with Tailwind CSS.

## 🧰 Tech Stack

- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit (`store/slices`)
- **API Client:** Axios (configured with interceptors)
- **Deployment:** Vercel (configured via `vercel.json`)

## ⚙️ Quick Start

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### 2. Clone & Install

```bash
git clone https://github.com/dpeyupkaya/TraceAtlas.UI.git
cd TraceAtlas.UI
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure your backend API URL:

```env
VITE_API_BASE_URL=https://localhost:7044
```

### 4. Run Development Server

```bash
npm run dev
```
*The app will be available at `http://localhost:5173`.*

### 5. Build for Production

```bash
npm run build
```

## 📁 Project Structure

A quick glance at the core structure:
- `/public` - PWA manifests, icons, and static assets.
- `/src/api` - Axios configurations and API service integrations.
- `/src/components` - Reusable UI components (auth, map, profile, navbar).
- `/src/pages` - Main route views (Home, Map, Profile, etc.).
- `/src/store` - Redux store and state slices.

## 📄 License

This project is licensed under the MIT License.
```
