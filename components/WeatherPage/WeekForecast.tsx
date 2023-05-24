'use client';

import { Weather } from '@/interfaces/weather';
import getWeatherIconPath from '@/utils/getWeatherIconPath';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

interface WeekForecastProps {
  weatherData: Weather;
}

export default function WeekForecast({ weatherData }: WeekForecastProps) {
  const dataToDisplay = weatherData.daily.time.map((time, i) => {
    return {
      day: format(parseISO(time), 'dd EE'),
      weathercode: weatherData.daily.weathercode[i],
      rainMean: weatherData.daily.precipitation_probability_mean[i],
      tmax: weatherData.daily.temperature_2m_max[i],
      tmin: weatherData.daily.temperature_2m_min[i],
    };
  });

  const RenderedForecast = (): JSX.Element => {
    const ref =
      React.useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
      applyRubberBandEffect: true,
      decayRate: 0,
      safeDisplacement: 11,
    });

    return (
      <div
        ref={ref}
        {...events}
        className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl custom-scroll select-none overflow-x-scroll grid grid-cols-[repeat(7,minmax(200px,1fr))] justify-start items-center gap-2 glass p-4 rounded-md"
      >
        {dataToDisplay.map(
          ({ day, weathercode, rainMean, tmax, tmin }, idx) => (
            <div
              key={day}
              className="flex flex-col justify-center items-center gap-2"
            >
              <p
                className={`text-xl font-semibold ${
                  idx === 0 ? 'text-pink-400' : ''
                }`}
              >
                {idx === 0 ? 'Today' : day}
              </p>
              <div className="min-w-[180px] flex flex-col justify-center items-center gap-2 glass p-4 rounded-md">
                <Image
                  className="mb-4 my-2 pointer-events-none"
                  height={120}
                  width={120}
                  alt="Weather icon"
                  src={`/weather/day/${getWeatherIconPath(weathercode)}`}
                />
                <div className="text-2xl font-semibold flex justify-center items-center gap-1">
                  <p className="flex justify-center items-start">
                    {tmin}
                    <span className="text-sm">°C</span>
                  </p>
                  <span>-</span>
                  <p className="flex justify-center items-start">
                    {tmax}
                    <span className="text-sm">°C</span>
                  </p>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <Image
                    className="pointer-events-none"
                    src={'/weather/humidity.svg'}
                    alt="Rain"
                    width={30}
                    height={30}
                  />
                  <p>{rainMean}%</p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2">
      <h2 className="heading-2">7 Days Forecast</h2>
      <RenderedForecast />
    </div>
  );
}
