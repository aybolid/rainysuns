import React from 'react';
import { Weather } from '@/interfaces/weather';
import getWeatherCondition from '@/utils/getWeatherCondition';

interface WeatherMessageProps {
  weatherData: Weather;
}

export default function WeatherMessage({ weatherData }: WeatherMessageProps) {
  const condition = getWeatherCondition(weatherData.daily.weathercode[0]);

  return (
    <p className="text-xl">
      <span className="font-semibold text-pink-400">{condition}</span>{' '}
      {condition.endsWith('s') ? 'are ' : 'is '}
      expected today with temperatures between{' '}
      <span className="font-semibold text-pink-400">
        {weatherData.daily.temperature_2m_min[0]}
      </span>{' '}
      and{' '}
      <span className="font-semibold text-pink-400">
        {weatherData.daily.temperature_2m_max[0]}
      </span>{' '}
      Celsius degrees.{' '}
    </p>
  );
}
