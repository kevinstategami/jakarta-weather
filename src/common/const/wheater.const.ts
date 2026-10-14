export const WEATHER_API_URL =
  import.meta.env.VITE_WEATHER_API_URL ??
  'https://api.open-meteo.com/v1/forecast';

export const WEATHER_CONFIG = {
  latitude: -6.2,
  longitude: 106.8,
  timezone: 'Asia/Jakarta',
  pageSize: 10,
  requestTimeout: 10000,
} as const;
