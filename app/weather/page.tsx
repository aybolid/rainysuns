import React from 'react';
import { redirect } from 'next/navigation';

import { Weather } from '@/interfaces/weather';
import { ReverseGeocodingLocation } from '@/interfaces/location';
import stringifyLocation from '@/utils/stringifyLocation';
import CurrentWeather from '@/components/WeatherPage/CurrentWeather';
import AdditionalInfo from '@/components/WeatherPage/AdditionalInfo';
import WeatherMessage from '@/components/WeatherPage/WeatherMessage';
import DayForecast from '@/components/WeatherPage/DayForecast';
import WeekForecast from '@/components/WeatherPage/WeekForecast';

const WEATHER_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
const GEOCODING_URL = process.env.NEXT_PUBLIC_GEOAPIFY_API_URL;
const GEOCODING_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

const DAILY =
  'sunrise,sunset,weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_mean';
const HOURLY =
  'temperature_2m,relativehumidity_2m,dewpoint_2m,surface_pressure,visibility,apparent_temperature,uv_index,precipitation_probability';

interface WeatherPageProps {
  searchParams: {
    long: string;
    lat: string;
  };
}

export default async function WeatherPage({ searchParams }: WeatherPageProps) {
  const weatherData: Weather = await fetch(
    `${WEATHER_URL}forecast?latitude=${searchParams.lat}&longitude=${searchParams.long}&models=best_match&timezone=auto&current_weather=true&daily=${DAILY}&hourly=${HOURLY}`,
    { method: 'GET', cache: 'no-store' }
  ).then((res) => res.json());

  const location: ReverseGeocodingLocation = await fetch(
    `${GEOCODING_URL}reverse?lat=${searchParams.lat}&lon=${searchParams.long}&apiKey=${GEOCODING_KEY}`,
    { method: 'GET' }
  )
    .then((res) => res.json())
    .then((data) => data.features[0].properties);
  if (location.country === 'Russia') redirect('/stand-with-ukraine');

  return (
    <>
      <div className="container h-full flex justify-center items-center">
        <div className="w-full h-full flex flex-col justify-center items-center gap-10">
          <h1 className="heading-1 mb-6">{stringifyLocation(location)}</h1>
          <section className="w-full grid grid-cols-3 justify-center items-start gap-4">
            <CurrentWeather weatherData={weatherData} />
            <AdditionalInfo weatherData={weatherData} />
          </section>
          <section className="glass p-4 rounded-md">
            <WeatherMessage weatherData={weatherData} />
          </section>
          <section>
            <DayForecast weatherData={weatherData} />
          </section>
          <section>
            <WeekForecast weatherData={weatherData} />
          </section>
          {/* <pre>{JSON.stringify(weatherData.hourly.time.slice(0, 24), null, 2)}</pre> */}
        </div>
      </div>
    </>
  );
}
