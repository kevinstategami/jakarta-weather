# Jakarta Weather

Aplikasi dashboard prakiraan cuaca Jakarta menggunakan Vue 3, Ionic Vue, TypeScript, dan Open-Meteo API.

## Requirements

- Node.js 20 atau lebih baru
- npm

## Installation

Clone repository lalu masuk ke folder project:

```bash
git clone https://github.com/kevinstategami/jakarta-weather.git
cd jakarta-weather
```

Install dependency:

```bash
npm install
```

## Environment Configuration

Buat file `.env` di root project jika ingin mengatur URL API secara manual:

```env
VITE_WEATHER_API_URL=https://api.open-meteo.com/v1/forecast
```

Jika variable tersebut tidak dibuat, aplikasi akan menggunakan URL Open-Meteo default.

## Run Development Server

```bash
npm run dev
```

Buka URL yang ditampilkan Vite, biasanya:

```text
http://localhost:5173
```

## Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Menjalankan development server |
| `npm run build` | Type-check dan membuat production build |
| `npm run preview` | Menjalankan preview production build |

## Production Build

Buat production build:

```bash
npm run build
```

Preview hasil build secara lokal:

```bash
npm run preview
```

## Project Structure

```text
src/
├── common/
│   ├── const/       # Konfigurasi aplikasi
│   ├── model/       # Type dan interface data
│   └── utils/       # Utility bersama, termasuk format tanggal
├── components/
│   └── weather/     # Komponen WeatherOverview, WeatherTable, dan TemperatureBadge
├── services/        # Integrasi Open-Meteo API
├── views/           # Halaman aplikasi
└── router/          # Konfigurasi routing
```

## Data Source

Data cuaca diambil dari [Open-Meteo API](https://open-meteo.com/). Lokasi default aplikasi adalah Jakarta, Indonesia dengan timezone `Asia/Jakarta`.
