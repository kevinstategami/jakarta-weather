// Struktur data yang dikembalikan Open-Meteo API
export interface WeatherResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
  };
  hourly_units: {
    time: string;
    temperature_2m: string;
  };
}