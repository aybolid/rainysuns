export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface Daily {
  time: string[];
  sunrise: string[];
  sunset: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_mean: number[];
}

export interface Hourly {
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

export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_weather: CurrentWeather;
  daily: Daily;
  hourly: Hourly;
}
