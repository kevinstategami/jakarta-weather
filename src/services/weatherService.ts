
import { WEATHER_API_URL, WEATHER_CONFIG } from '@/common/const/wheater.const';
import { WeatherData } from '@/common/model/weather/weatherData';
import { WeatherResponse } from '@/common/model/weather/weatherResponse';
import axios from 'axios';

export async function getJakartaWeather(): Promise<WeatherData[]> {
  const response = await axios.get<WeatherResponse>(
    WEATHER_API_URL,
    {
      params: {
        latitude: WEATHER_CONFIG.latitude,
        longitude: WEATHER_CONFIG.longitude,
        hourly: 'temperature_2m',
        timezone: WEATHER_CONFIG.timezone,
      },
      timeout: WEATHER_CONFIG.requestTimeout,
    },
  );

  const hourly = response.data?.hourly;

  if (
    !hourly ||
    !Array.isArray(hourly.time) ||
    !Array.isArray(hourly.temperature_2m) ||
    hourly.time.length !== hourly.temperature_2m.length
  ) {
    throw new Error('Format data cuaca tidak valid.');
  }

  return hourly.time.map((time, index) => ({
    time,
    temperature: hourly.temperature_2m[index],
  }));
}
