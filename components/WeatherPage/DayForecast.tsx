'use client';

import React, { MutableRefObject } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { Weather } from '@/interfaces/weather';
import getCurrentIndex from '@/utils/getCurrentIndex';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';

interface DayForecastProps {
  weatherData: Weather;
}

export default function DayForecast({ weatherData }: DayForecastProps) {
  const { hourly } = weatherData;
  const idx = getCurrentIndex(weatherData);

  const timeFromNow = hourly.time.slice(idx, idx + 24);
  const tempFromNow = hourly.temperature_2m.slice(idx, idx + 24);
  const precipFromNow = hourly.precipitation_probability.slice(idx, idx + 24);

  const dataToDisplay = timeFromNow.map((time, i) => {
    return {
      time:
        format(parseISO(time), 'HH:mm') === '00:00'
          ? format(parseISO(time), 'dd.MM')
          : format(parseISO(time), 'HH:mm'),
      temp: tempFromNow[i],
      precip: precipFromNow[i],
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
        className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-5xl custom-scroll select-none overflow-x-scroll grid grid-cols-[repeat(24,minmax(90px,90px))] justify-start items-center gap-2 glass p-4 rounded-md"
      >
        {dataToDisplay.map(({ time, temp, precip }, idx) => (
          <div
            className="flex flex-col justify-center items-center gap-1"
            key={time}
          >
            <p
              className={
                idx === 0 || !time.includes(':') ? 'text-pink-400' : ''
              }
            >
              {idx === 0 ? 'Now' : time}
            </p>
            <div className="w-[90px] cursor-grab glass p-2 rounded-md flex flex-col justify-center items-center">
              <p className="flex justify-center items-start">
                {temp}
                <span className="text-[8px]">°C</span>
              </p>
              <div className="flex justify-center items-center gap-1">
                <Image
                  className="pointer-events-none"
                  src={'/weather/humidity.svg'}
                  alt="Rain"
                  width={15}
                  height={15}
                />
                <small>{precip}%</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-2">
      <h2 className="heading-2">24 Hours Forecast</h2>
      <RenderedForecast />
      {/* <pre>{JSON.stringify(timeFromNow, null, 2)}</pre> */}
    </div>
  );
}
