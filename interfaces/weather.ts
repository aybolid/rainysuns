interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

interface Daily {
  time: string[];
  sunrise: string[];
  sunset: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_mean: number[];
}

interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  dewpoint_2m: number[];
  surface_pressure: number[];
  visibility: number[];
  apparent_temperature: number[];
  uv_index: number[];
  precipitation_probability: number[];
}

interface HourlyUnits {
  time: string;
  temperature_2m: string;
  relativehumidity_2m: string;
  dewpoint_2m: string;
  surface_pressure: string;
  visibility: string;
  apparent_temperature: string;
  uv_index: string;
  precipitation_probability: string;
}

interface DailyUnits {
  time: string;
  sunrise: string;
  sunset: string;
  weathercode: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  precipitation_probability_mean: string;
}

export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_weather: CurrentWeather;

  daily_units: DailyUnits;
  daily: Daily;

  hourly_units: HourlyUnits;
  hourly: Hourly;
}
