import React from 'react';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

import { Weather } from '@/interfaces/weather';
import { ReverseGeocodingLocation } from '@/interfaces/location';
import getWeatherCondition from '@/utils/getWeatherCondition';
import getWeatherIconPath from '@/utils/getWeatherIconPath';
import stringifyLocation from '@/utils/stringifyLocation';

const WEATHER_URL = process.env.NEXT_PUBLIC_WEATHER_API_URL;
const GEOCODING_URL = process.env.NEXT_PUBLIC_GEOCODING_API_URL;
const GEOCODING_KEY = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

interface WeatherPageProps {
  searchParams: {
    long: string;
    lat: string;
  };
}

export default async function WeatherPage({ searchParams }: WeatherPageProps) {
  const weatherData: Weather = await fetch(
    `${WEATHER_URL}forecast?latitude=${searchParams.lat}&longitude=${searchParams.long}&current_weather=true`
  ).then((res) => res.json());

  const location: ReverseGeocodingLocation = await fetch(
    `${GEOCODING_URL}reverse?lat=${searchParams.lat}&lon=${searchParams.long}&apiKey=${GEOCODING_KEY}`,
    { method: 'GET' }
  )
    .then((res) => res.json())
    .then((data) => data.features[0].properties);

  const weatherCondition = getWeatherCondition(
    weatherData.current_weather.weathercode
  );

  return (
    <>
      <div className="container h-full flex justify-center items-center">
        <section className="w-full flex flex-col justify-center gap-4">
          <h1 className="heading-1">{stringifyLocation(location)}</h1>
          <div className="glass rounded-lg p-6">
            <h3 className="heading-3">
              {format(parseISO(weatherData.current_weather.time), 'PPpp')}
            </h3>
            <div className="w-fit flex justify-center items-center gap-6 glass p-4 rounded-md">
              <Image
                height={120}
                width={120}
                alt="Weather icon"
                src={`/weather/${
                  !!weatherData.current_weather.is_day ? 'day' : 'night'
                }/${getWeatherIconPath(0)}`}
              />
              <div className="flex justify-center items-center flex-col">
                <h2 className="heading-2">{weatherCondition}</h2>
                <p className="text-5xl font-bold">
                  {weatherData.current_weather.temperature} &#8451;
                </p>
              </div>
            </div>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
        </section>
      </div>
    </>
  );
}
